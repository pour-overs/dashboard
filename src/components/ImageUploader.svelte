<script>
    export const path = "images";
    export let files = [];

    import { getContext, onMount, createEventDispatcher } from "svelte";

    import { notify } from "@stores/notifications.js";

    const getFirebase = getContext("firebase");

    let form = null;
    let imagesRef = null;
    let fileInput = null;
    let filename = "";
    let file = "";
    let disabled = true;

    let inProgress = false;
    let progress = 0;

    $: hasValidName = filename.length > 3;
    $: hasFile = file !== "" && fileInput.files.length > 0;
    $: isValid = !disabled && hasFile && hasValidName;
    $: isReplacing = files.find(file => file.name === filename);

    let uploadTask = null;


    onMount(() => {
        const { storage } = getFirebase();
        imagesRef = storage.ref().child(path);
        disabled = false;

        return () => (imagesRef = null);
    });

    const uploadFile = async () => {

        const selectedFile = fileInput.files[0];

        if (isReplacing && !confirm("A file with this name exists already. Replace the existing file?")) {
            return;
        }

        inProgress = true;
        disabled = true;

        uploadTask = imagesRef.child(filename).put(selectedFile);

        try {
            uploadTask.on("state_changed", snapshot => progress = (snapshot.bytesTransferred / snapshot.totalBytes));
            await uploadTask;
        }
        catch (error) {
            notify(`Upload failed with code "${error.code}"`);
            console.warn(error)
            reset();
            return;
        }

        const url = await uploadTask.snapshot.ref.getDownloadURL();

        if (isReplacing) {
            files = files.map(file => {
                if (file.name === filename) {
                    file.url = url; // update the promise so the new image can render
                }
                return file;
            });
        }
        else {
            files = [...files, { name: filename, url }].sort();
        }


        notify("Uploaded complete!", 4000);
        form.reset();
        reset();
    };

    const reset = () => {
        inProgress = false;
        disabled = false;
        uploadTask = null;
        filename = "";
        progress = 0;
    }

    const fillFilename = () => {

        if (!hasFile) {
            filename = "";
            return;
        }

        const selectedFile = fileInput.files[0];
        const value = selectedFile.name;
        console.log(selectedFile, filename);

        if (selectedFile.type === "") {
            notify("The file must be an image.");
            file = "";
            return;
        }

        // don't update the filename if the user has typed in a filename already
        if (filename.trim().length > 0 || value.length === 0) {
            return;
        }

        filename = value;
    };

</script>

<style>
    fieldset {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0 0;
        margin: 0 0 1rem 0;
    }

    .text-right {
        text-align: right;
    }

</style>

<form on:submit|preventDefault={uploadFile} bind:this={form}>

    <fieldset>
        <label for="image-upload"> File </label>
        <input
            type="file"
            id="image-upload"
            name="image"
            accept="*image/*"
            bind:this={fileInput}
            bind:value={file}
            {disabled}
            on:change={fillFilename} />
    </fieldset>

    <fieldset>
        <label for="filename"> Filename </label>
        <input
            id="filename"
            type="text"
            name="filename"
            bind:value={filename}
            {disabled} />
    </fieldset>

    <footer class="text-right">
        <button type="submit" class="button" disabled={!isValid}>
            {#if inProgress}
                Uploading... ({progress * 100}%)
            {:else if isReplacing}
                Replace Existing
            {:else}
                Upload
            {/if}
        </button>
    </footer>

</form>
