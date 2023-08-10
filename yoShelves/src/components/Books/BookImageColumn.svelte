<script>
  import { Row, Column } from 'carbon-components-svelte';
  import BookImage from '../../components/Books/BookImage.svelte';
  import BookDetails from '../../components/Books/BookDetails.svelte';
  export let book;
</script>

<Column class="image-column" sm={2} md={2} lg={2} xlg={2} max={2}>
  <BookImage {book} />
  <BookDetails {book} />
</Column>

<style>
  :global(
      .image-column.bx--col-sm-2.bx--col-md-2.bx--col-lg-2.bx--col-xlg-2.bx--col-max-2,
      .title-column.bx--col-sm-20.bx--col-md-10.bx--col-lg-10.bx--col-xlg-10.bx--col-max-10
    ) {
    padding-bottom: 20px;
    padding-top: 20px;
    align-items: start;
    border-bottom: 1px solid #523a28;
  }

  :global(
      .image-column.bx--col-sm-2.bx--col-md-2.bx--col-lg-2.bx--col-xlg-2.bx--col-max-2
    ) {
    padding-right: 20px;
    border-right: 1px solid #523a28;
    min-width: 230px;
    min-width: 230px;
  }
</style>
