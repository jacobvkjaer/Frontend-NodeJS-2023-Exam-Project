<script>
  import { Row, Column } from 'carbon-components-svelte';

  export let header;
</script>

<h1>{header || 'Loading...'}</h1>

<style>
  h1 {
    text-align: center;
    margin: 1em 0 0.9em 0;
    color: #cdd1d4;
    font-size: 4em;
  }
</style>
