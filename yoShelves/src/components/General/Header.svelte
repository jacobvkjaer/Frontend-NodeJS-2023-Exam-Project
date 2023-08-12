<script>
  import { Row, Column } from 'carbon-components-svelte';
  import RowCol from '../General/RowAndColumnContainer.svelte';

  //   <Header header={'Books'} />

  // export let classColumn;
  export let header;
</script>

<RowCol classColumn={'header-column'}>
  <h1>{header || 'Loading...'}</h1>
</RowCol>

<style>
  h1 {
    text-align: center;
    margin: 1em 0 0.7em 0;
    color: #cdd1d4;
    font-size: 4em;
  }
</style>
