<script>
  import { user } from '../../stores/user.js';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { Grid, Row, Column } from 'carbon-components-svelte';

  import Container from '../../components/General/Container.svelte';
  import BufferColumn from '../../components/Grid/BufferColumn.svelte';
  import Loading from '../../components/Loading/Loading.svelte';
  import RowCol from '../../components/General/RowAndColumnContainer.svelte';
  import BookHeader from '../../components/Books/BookHeader.svelte';
  // import BookTitleSection from '../../components/Books/BookTitleSection.svelte';
  import ReviewSection from '../../components/Reviews/ReviewSection.svelte';

  import BookImageColumn from '../../components/Books/BookImageColumn.svelte';
  import DeleteBook from '../../components/Books/DeleteBook.svelte';
  import FavoriteBook from '../../components/Favorites/FavoriteBook.svelte';
  import ReviewBook from '../../components/Reviews/ReviewBook.svelte';

  export let id;

  $: userId = $user?.user.id;
  $: isAdmin = $user?.user.role === 'admin';
  let review = null;
  let book = null;

  $: if (id && userId) {
    console.log(id);
    fetchReview();
  }

  async function fetchReview() {
    const endpoint = `/users/${userId}/reviews/${id}`;

    try {
      const data = await apiRequest({
        endpoint,
      });
      review = data.review;
      console.warn(review);
      console.warn(data.review);
      book = data.review.reviewed_book;
      console.warn(book);
    } catch (e) {
      console.log(e);
    }
  }
</script>

<Container>
  <Grid fullWidth>
    <Row>
      <BufferColumn />
      <Column class="content-column" sm={16} md={16} lg={16} xlg={14} max={12}>
        {#if review}
          <BookHeader {book} />
          <Row>
            <BookImageColumn {book} />
            <ReviewSection {review} />
            <Column class="buffer-column" sm={4} md={4} lg={4} xlg={4} max={3}>
              <div class="actions-container">
                <FavoriteBook {book} />
                <ReviewBook {review} {book} />
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
