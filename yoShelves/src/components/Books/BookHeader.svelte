<script>
  import RowCol from '../General/RowAndColumnContainer.svelte';

  export let book;
</script>

<RowCol classColumn={'header-column'}>
  <h1>{book?.title || 'Loading...'}</h1>
</RowCol>

<style>
  :global(
      .header-column.bx--col-sm-16.bx--col-md-16.bx--col-lg-16.bx--col-xlg-16.bx--col-max-16
    ) {
    border-bottom: 1px solid #523a28;
  }
  h1 {
    text-align: center;
    margin: 1em auto 0.7em auto;
    color: #cdd1d4;
    font-size: 4em;
  }
</style>
