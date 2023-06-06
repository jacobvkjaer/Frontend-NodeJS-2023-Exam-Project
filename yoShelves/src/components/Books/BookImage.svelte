<script>
    import { ImageLoader } from "carbon-components-svelte";
    export let book;
</script>
<div class="image-container">
    <ImageLoader src={book.image}/>
</div>

<style>
    .image-container {
        padding-bottom: 20px;
    }
</style>