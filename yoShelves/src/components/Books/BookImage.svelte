<script>
  import { ImageLoader } from 'carbon-components-svelte';
  export let book;
</script>

<div class="image-container">
  <ImageLoader fadeIn="true" src={book?.image} />
</div>

<style>
  .image-container {
    padding-bottom: 20px;
  }
</style>
