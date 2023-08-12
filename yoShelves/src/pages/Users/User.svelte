<script>
  import BookHeader from '../../components/Books/BookHeader.svelte';

  import { Star, StarFilled, StarHalf } from 'carbon-icons-svelte';
  import FavoriteBook from '../../components/Favorites/FavoriteBook.svelte';
  import DeleteUser from '../../components/Users/DeleteUser.svelte';
  import ReviewBook from '../../components/Reviews/ReviewBook.svelte';

  import BookSubtitle from '../../components/Books/BookSubtitle.svelte';
  import UserImageColumn from '../../components/Users/UserImageColumn.svelte';
  import BufferColumn from '../../components/Grid/BufferColumn.svelte';

  import Container from '../../components/General/Container.svelte';
  import RowCol from '../../components/General/RowAndColumnContainer.svelte';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { onMount } from 'svelte';
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import Loading from '../../components/Loading/Loading.svelte';
  import UserHeader from '../../components/Users/UserHeader.svelte';

  let user = null;
  export let id;
  let isLoading = true;

  async function fetchUser() {
    const endpoint = `/admin/users/${id}`;

    try {
      const data = await apiRequest({
        endpoint,
      });
      user = data.user;
      isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }
  onMount(fetchUser);
</script>

<Container>
  <Grid fullWidth>
    <Row>
      <BufferColumn />
      <Column class="content-column" sm={16} md={16} lg={16} xlg={14} max={12}>
        <UserHeader {user} />
        {#if id && user}
          <Row>
            <UserImageColumn {user} />
            <Column class="title-column" sm={8} md={8} lg={8} xlg={8} max={10}>
              <!-- {#if book?.subtitle}
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
              </div> -->
            </Column>
            <Column class="buffer-column" sm={4} md={4} lg={4} xlg={4} max={3}>
              <div class="actions-container">
                <DeleteUser {user} />
                <!-- <ReviewBook {book} /> -->
              </div>
            </Column>
          </Row>
        {:else}
          <RowCol classColumn={'header-column'}>
            <Loading />
          </RowCol>
        {/if}
      </Column>
      <BufferColumn />
    </Row>
  </Grid>
</Container>

<style>
  .container {
    align-items: center;
    margin: 0 auto;
    width: 100%;
    padding: 2em 1em;
    color: #f4f4f4;
  }

  h1 {
    text-align: center;
    margin: 0 0 0.7em 0;
    color: #cdd1d4;
    font-size: 4em;
  }

  :global(
      .header-column.bx--col-sm-1.bx--col-md-4.bx--col-lg-8.bx--col-xlg-14.bx--col-max-16
    ) {
    border-bottom: 1px solid #523a28;
  }

  :global(
      .image-column.bx--col-sm-1.bx--col-md-1.bx--col-lg-2.bx--col-xlg-2.bx--col-max-2,
      .title-column.bx--col-sm-4.bx--col-md-4.bx--col-lg-10.bx--col-xlg-10.bx--col-max-10
    ) {
    padding-bottom: 20px;
    padding-top: 20px;
    align-items: start;
    border-bottom: 1px solid #523a28;
  }

  :global(
      .image-column.bx--col-sm-1.bx--col-md-1.bx--col-lg-2.bx--col-xlg-2.bx--col-max-2
    ) {
    padding-right: 20px;
    border-right: 1px solid #523a28;
  }

  :global(
      .title-column.bx--col-sm-4.bx--col-md-4.bx--col-lg-10.bx--col-xlg-10.bx--col-max-10
    ) {
    padding-left: 20px;
    padding-right: 20px;
    border-right: 1px solid #523a28;
  }

  :global(
      .buffer-column.bx--col-sm-2.bx--col-md-2.bx--col-lg-4.bx--col-xlg-4.bx--col-max-4
    ) {
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #523a28;
  }

  /* :global(.buffer-column .wrapper.s-bljRqzogRN3f) {
    padding-bottom: 20px;
    border-bottom: 1px solid #523a28;
  } */

  /* :global(.title-row-1.bx--row) {
    padding-bottom: 25px;
  } */

  .book-title,
  .book-description {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: auto;
  }

  .book-title {
    margin: 0 0 -10px 0;
    padding: 0 20px 20px 20px;
    font-size: 2em;
  }

  .p-text {
    text-align: center;
    margin: 1em 0 1.2em 0;
    color: #cdd1d4;
  }

  .aligner {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  h3 {
    padding-right: 8px;
  }
</style>
