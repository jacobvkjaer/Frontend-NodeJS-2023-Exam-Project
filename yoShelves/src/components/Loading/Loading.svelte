<script>
  import { Loading } from 'carbon-components-svelte';
</script>

<Loading />

<style>
  :global(.bx--loading__stroke) {
    stroke: #c46200;
  }

  :global(.bx--loading-overlay) {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
