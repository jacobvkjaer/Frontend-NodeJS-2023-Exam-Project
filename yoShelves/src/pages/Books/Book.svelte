<script>
  import BookHeader from '../../components/Books/BookHeader.svelte';

  import { Star, StarFilled, StarHalf } from 'carbon-icons-svelte';
  import FavoriteBook from '../../components/Favorites/FavoriteBook.svelte';
  import ReviewBook from '../../components/Reviews/ReviewBook.svelte';

  import BookSubtitle from '../../components/Books/BookSubtitle.svelte';
  import BookImageColumn from '../../components/Books/BookImageColumn.svelte';
  import RowAndColumn from '../../components/Grid/RowAndColumnContainer.svelte';
  import Loading from '../../components/Loading/Loading.svelte';
  import BufferColumn from '../../components/Grid/BufferColumn.svelte';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { onMount } from 'svelte';
  import { Grid, Row, Column } from 'carbon-components-svelte';

  let book = null;
  export let id;
  let isLoading = true;

  async function fetchBook() {
    const endpoint = `/admin/books/${id}`;

    try {
      const data = await apiRequest({
        endpoint,
      });
      book = data.book;
      console.log(book);
      isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }
  onMount(fetchBook);
</script>

<div class="container">
  <Grid fullWidth>
    <Row>
      <BufferColumn />
      <Column class="content-column" sm={16} md={16} lg={16} xlg={14} max={12}>
        <BookHeader {book} />
        {#if id && book}
          <Row>
            <BookImageColumn {book} />
            <Column class="title-column" sm={8} md={8} lg={8} xlg={8} max={10}>
              {#if book?.subtitle}
                <div class="title-container">
                  <Row class="title-row-1">
                    <Column
                      class="title-row-column-1"
                      sm={16}
                      md={16}
                      lg={16}
                      xlg={16}
                      max={16}
                    >
                      <BookSubtitle subtitle={book.subtitle} />
                    </Column>
                  </Row>
                </div>
              {/if}
              {#if book.rating}
                <div class="title-container">
                  <Row class="title-row">
                    <Column
                      class="title-row-column"
                      sm={16}
                      md={16}
                      lg={16}
                      xlg={16}
                      max={16}
                    >
                      <div class="aligner">
                        <h3>Rating</h3>
                        <h2>-</h2>
                        {#each Array(Math.floor(book.rating)).fill() as _}
                          <h4><StarFilled size={20} /></h4>
                        {/each}
                        {#if book.rating % 1 >= 0.5}
                          <h4><StarHalf size={20} /></h4>
                        {/if}
                        {#each Array(5 - Math.ceil(book.rating)).fill() as _}
                          <h4><Star size={20} /></h4>
                        {/each}
                      </div>
                    </Column>
                  </Row>
                </div>
              {/if}
              <div class="title-container">
                <Row class="title-row">
                  <Column
                    class="title-row-column"
                    sm={16}
                    md={16}
                    lg={16}
                    xlg={16}
                    max={16}><h3>Description:</h3></Column
                  >
                </Row>
              </div>
              <div class="title-container">
                <Row class="title-row">
                  <Column
                    class="title-row-column"
                    sm={16}
                    md={16}
                    lg={16}
                    xlg={16}
                    max={16}
                    ><p class="book-content">{book.description}</p></Column
                  >
                </Row>
              </div>
            </Column>
            <Column class="buffer-column" sm={4} md={4} lg={4} xlg={4} max={3}>
              <div class="actions-container">
                <FavoriteBook {book} />
                <ReviewBook {book} />
              </div>
            </Column>
          </Row>
        {:else}
          <RowAndColumn classDiv={'p-text'}>
            <Loading />
          </RowAndColumn>
        {/if}
      </Column>
      <BufferColumn />
    </Row>
  </Grid>
</div>

<style>
  :global(.title-column) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .container {
    padding: 2em 1em;
  }

  :global(
      .title-column.bx--col-sm-8.bx--col-md-8.bx--col-lg-8.bx--col-xlg-8.bx--col-max-10
    ) {
    padding: 20px;
    border-right: 1px solid #523a28;
  }

  .aligner {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
  }

  h3 {
    padding-right: 23px;
  }

  h2 {
    padding-right: 18px;
  }

  :global(
      .buffer-column.bx--col-sm-4.bx--col-md-4.bx--col-lg-4.bx--col-xlg-4.bx--col-max-3
    ) {
    padding: 20px 0 20px 20px;
  }
</style>
