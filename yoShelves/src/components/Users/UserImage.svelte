<script>
  import { ImageLoader } from 'carbon-components-svelte';
  import userIcon from '../../assets/icons/user.svg';
</script>

<div class="image-container">
  <div class="image">
    <ImageLoader src={userIcon} />
  </div>
</div>

<style>
  .image-container {
    padding-bottom: 5px;
  }
</style>
