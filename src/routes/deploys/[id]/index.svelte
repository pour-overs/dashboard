<script context="module">
  export async function preload({ host, path, params, query }, session) {
    const { id } = params;
    const response = await this.fetch(`/api/deploys/${id}`, {
      credentials: "include",
      method: "GET"
    });
    if (response.ok) {
      const deploy = await response.json();

      return { deploy };
    }
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

  const startedAt = new Date(deploy.createdAt.date);
  const lastModified = new Date(deploy.lastModified.date);

  function updatePage() {
    console.log("Deploy was completed.");
    notify("Deploy was completed");
  }

</script>

<PageTitle
  title={`Deploy: ${deploy.label}`}
  useAsBreadcrumb={true}
  crumb={`${deploy.id} as "${deploy.label}"`}>
  {deploy.label}
</PageTitle>



<p>Started at <DateTime date={startedAt} /></p>

{#if deploy.isComplete}
  <p><strong>Status:</strong> Complete</p>
  <p>Completed at <DateTime date={lastModified} /></p>
{:else}
  <FirebaseProvider>
    <DeployStatusListener id={deploy.id} on:change={updatePage} />
  </FirebaseProvider>
{/if}
