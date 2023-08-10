<script>
  import { Row, Column } from 'carbon-components-svelte';

  export let currUser;
  export let attribute;
</script>

<Row noGutter>
  <Column class="header-column" sm={6} md={4} lg={5} xlg={4} max={3}>
    <h1>{currUser?.[attribute] || 'Loading...'}</h1>
  </Column>
</Row>

<style>
  h1 {
    text-align: center;
    margin: 0 0 0.7em 0;
    color: #cdd1d4;
    font-size: 4em;
  }
</style>
