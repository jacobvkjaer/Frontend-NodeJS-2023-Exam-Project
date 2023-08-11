<script>
  import { Row, Column } from 'carbon-components-svelte';

  export let classColumn = '';
</script>

<Row>
  <Column class={classColumn} sm={16} md={16} lg={16} xlg={16} max={16}>
    <slot />
  </Column>
</Row>
