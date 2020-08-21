<script context="module">
  export async function preload({ host, path, params, query }, session) {
    const { id } = params;
    const deploy = await loadDeploy(id, this.fetch);
    return { deploy };
  }

  async function loadDeploy(id, fetch) {
    const response = await fetch(`/api/deploys/${id}`, {
      credentials: "include",
      method: "GET"
    });

    if (response.ok) {
      const deploy = await response.json();

      return deploy;
    }

    return null;
  }

</script>

<script>

  import PageTitle from "@components/PageTitle.svelte";
  import DateTime from "@components/DateTime.svelte";
  import FirebaseProvider from "@providers/FirebaseProvider.svelte";
  import DeployStatusListener from "./_DeployStatusListener.svelte";
  import { notify } from "@stores/notifications.js";

  export let deploy;

  console.log(deploy);

  $: createdAt = new Date(deploy.createdAt.date);
  $: lastModified = new Date(deploy.lastModified.date);

  async function updatePage() {
    notify(`"${deploy.label}" is complete`, 5000);
    deploy = await loadDeploy(deploy.id, window.fetch);
  }

  async function completeDeploy() {
    const { id } = deploy;
    const response = await fetch(`/api/deploys/${id}/complete?isComplete=true`, {
      credentials: "include",
      method: "POST"
    });

    if (response.ok) {
      deploy.isComplete = true;
    }
  }

</script>

<PageTitle
  title={`Deploy: ${deploy.label}`}
  useAsBreadcrumb={true}
  crumb={`${deploy.id} as "${deploy.label}"`}>
  {deploy.label}
</PageTitle>


{#if deploy.isComplete}
  <p><strong>Status:</strong> Complete</p>
  <p>
      <strong>Started:</strong> <DateTime date={createdAt} />
      <br />
      <strong>Completed:</strong> <DateTime date={lastModified} />
  </p>
{:else}
  <FirebaseProvider>
    <DeployStatusListener id={deploy.id} on:complete={updatePage} />

    <section>
      <p>This deploy can be completed... but it might not be a good idea.</p>
      <button on:click={completeDeploy}>Complete Deploy</button>
    </section>
  </FirebaseProvider>
{/if}
