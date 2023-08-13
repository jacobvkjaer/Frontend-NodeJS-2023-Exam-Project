<script>
  import { user } from '../../stores/user.js';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { onMount } from 'svelte';
  import { Grid, Row, Column } from 'carbon-components-svelte';

  import Container from '../../components/General/Container.svelte';
  import BufferColumn from '../../components/Grid/BufferColumn.svelte';
  import Loading from '../../components/Loading/Loading.svelte';
  import RowCol from '../../components/General/RowAndColumnContainer.svelte';
  import BookHeader from '../../components/Books/BookHeader.svelte';
  import BookFansSection from '../../components/Books/BookFansSection.svelte';

  import BookImageColumn from '../../components/Books/BookImageColumn.svelte';
  import DeleteBook from '../../components/Books/DeleteBook.svelte';
  import FavoriteBook from '../../components/Favorites/FavoriteBook.svelte';
  import ReviewBook from '../../components/Reviews/ReviewBook.svelte';

  export let id;

  console.log('Got to bookfans!');
  let userId = $user?.user.id;
  let isAdmin = $user?.user.role === 'admin';
  let book = null;

  // // GET /users/:id/favorites/:bookId
  async function fetchBook() {
    const endpoint = isAdmin
      ? `/admin/books/${id}`
      : `/users/${userId}/favorites/${id}`;

    try {
      const data = await apiRequest({
        endpoint,
      });
      console.log(isAdmin);
      console.log(book);
      if (isAdmin) book = data.book;
      else book = data.favorite.favorited_book;
    } catch (e) {
      console.log(e);
    }
  }
  onMount(fetchBook);
</script>

<Container>
  <Grid fullWidth>
    <Row>
      <BufferColumn />
      <Column class="content-column" sm={16} md={16} lg={16} xlg={14} max={12}>
        <BookHeader {book} />
        {#if id && book}
          <Row>
            <BookImageColumn {book} />
            <BookFansSection {book} {isAdmin} />
            <Column class="buffer-column" sm={4} md={4} lg={4} xlg={4} max={3}>
              <div class="actions-container">
                <FavoriteBook {book} />
                <!-- <ReviewBook {book} /> -->
                {#if isAdmin}
                  <DeleteBook {book} />
                {/if}
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
