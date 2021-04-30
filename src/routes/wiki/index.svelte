<script>
  import { productionDomain } from "@config/app.config.js";
  import Icon from "@components/Icon.svelte";
  import { listAllWikiPages } from "./_wikis.js";
  import { Deferred } from "@utils";
  import { onMount } from "svelte";
  import CollectionLayout from "@components/layouts/CollectionLayout/index.js";
  import PageTitle from "@components/PageTitle.svelte";
  import Loading from "@components/Loading.svelte";

  let loadingPages = new Deferred();

  onMount(() => {
    loadingPages.settleWith(listAllWikiPages());
  });
</script>

<style>

  ul {
    list-style: none;
    padding: 0 0;
    margin: 0 0;
    height: 100%;
    border: 1px solid var(--border-color);
    border-right: none;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .wiki-page-item {
    display: grid;
    grid-template-columns: 2rem 1fr 2fr auto;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--border-color);
  }

  .wiki-page-item:hover {
    background-color: var(--selectable-bg--hover);
  }

  .wiki-page-actions a {
    padding: 0 1rem;
  }

  .actions {
    margin-bottom: 0.5rem;
  }

  .title {
    text-transform: capitalize;
  }

  .slug {
    color: var(--button-color--disabled);
    padding-left: 1rem;
    font-size: 0.8rem;
    font-family: var(--font-monospace);
  }

  .empty {
    text-align: center;
    padding: 1rem 2rem;
  }

</style>


<PageTitle title="Wiki">
  Wiki
</PageTitle>

<CollectionLayout.Layout sidebar="right">
  <CollectionLayout.Collection>
    {#await loadingPages}
      <Loading text="Loading Wiki Pages" />
    {:then pages}
      <ul>
        {#each pages as page}
          <li class="wiki-page-item">
              <Icon name="article" color="var(--border-color)" size={16} />

              <a class="title" href={`/wiki/${page.id}`}>{page.title}</a>
              <span class="slug">/wiki/{page.slug}</span>

              <div class="wiki-page-actions">
                <a href={`${productionDomain}/wiki/${page.slug}`} target="_blank"  title="Open Page">
                  <Icon name="open_in_new" size={16} color="var(--link-color)" />
                  <!-- View -->
                </a>
                <a href={`/wiki/${page.id}`} title="Edit Page">
                  <Icon name="edit" size={16} color="var(--link-color)" />
                  <!-- Edit -->
                </a>
              </div>
          </li>
        {:else}
          <li class="empty">
            <p>No wiki pages exist yet.</p>
          </li>
        {/each}
      </ul>
    {/await}
  </CollectionLayout.Collection>
  <CollectionLayout.Sidebar>
    <h3 class="actions">Actions</h3>
    <a class="button" href="wiki/create">Create Wiki Page</a>
  </CollectionLayout.Sidebar>
</CollectionLayout.Layout>