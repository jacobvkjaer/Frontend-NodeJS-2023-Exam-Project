<script>
  import { Row, Column } from 'carbon-components-svelte';

  export let classColumn = '';
  export let classDiv = '';
</script>

<Row noGutter>
  <Column class={classColumn} sm={16} md={16} lg={16} xlg={16} max={16}>
    <div class={classDiv}>
      <slot />
    </div>
  </Column>
</Row>
