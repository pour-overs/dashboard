<script>
  import Warning from "@components/Warning.svelte";
  import PageTitle from "@components/PageTitle.svelte";
  import Collapsible from "@components/Collapsible.svelte";
  import FirebaseProvider from "@providers/FirebaseProvider.svelte";
  import ImageUploader from "@components/ImageUploader.svelte";
  import UploadedAssets from "./_UploadedFiles.svelte";

  let files = [];

</script>

<PageTitle>Assets</PageTitle>

<p>Use this page to upload images to be used within a guide.</p>

<FirebaseProvider>

  <Collapsible collapsed={false}>
    <h2 slot="title">Upload New Image</h2>
    <section slot="content">
      <ImageUploader bind:files={files} />
    </section>
  </Collapsible>

  <Collapsible collapsed={false}>
    <h2 slot="title">Uploads</h2>
    <div slot="content">
      <UploadedAssets bind:files={files} />
    </div>
  </Collapsible>

</FirebaseProvider>