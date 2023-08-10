<script>
  import { Row, Column } from 'carbon-components-svelte';
  export let book;
</script>

<Row noGutter>
  <Column class="header-column" sm={16} md={16} lg={16} xlg={16} max={16}>
    <h1>{book?.title || 'Loading...'}</h1>
  </Column>
</Row>

<style>
  :global(
      .header-column.bx--col-sm-16.bx--col-md-16.bx--col-lg-16.bx--col-xlg-16.bx--col-max-16
    ) {
    border-bottom: 1px solid #523a28;
  }
  h1 {
    text-align: center;
    margin: 0 0 0.7em 0;
    color: #cdd1d4;
    font-size: 4em;
  }
</style>
