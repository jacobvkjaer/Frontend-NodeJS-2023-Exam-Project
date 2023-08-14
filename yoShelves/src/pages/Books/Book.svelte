<script>
  import { user } from '../../stores/user.js';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { Grid, Row, Column } from 'carbon-components-svelte';

  import Container from '../../components/General/Container.svelte';
  import BufferColumn from '../../components/Grid/BufferColumn.svelte';
  import Loading from '../../components/Loading/Loading.svelte';
  import RowCol from '../../components/General/RowAndColumnContainer.svelte';
  import BookHeader from '../../components/Books/BookHeader.svelte';
  import BookTitleSection from '../../components/Books/BookTitleSection.svelte';
  import ReviewEditSection from '../../components/Reviews/ReviewEditSection.svelte';

  import BookImageColumn from '../../components/Books/BookImageColumn.svelte';
  import DeleteBook from '../../components/Books/DeleteBook.svelte';
  import FavoriteBook from '../../components/Favorites/FavoriteBook.svelte';
  import ReviewBook from '../../components/Reviews/ReviewBook.svelte';
  import { onMount } from 'svelte';

  export let id;
  export let search = false;
  let isEditingReview = false;

  $: userId = $user?.user.id;
  $: isAdmin = $user?.user.role === 'admin';
  let book;
  let review;
  let addReview;

  $: if (book) {
    fetchReview();
  }

  // onMount(async () => {
  //   if (id && userId) {
  //     book = await fetchBook();
  //     if (!isAdmin) review = await fetchReview();
  //   }
  //   console.debug('Got out of the review function: ', review);
  // });

  onMount(fetchBook);

  async function fetchBook() {
    const endpoint = search
      ? `/books/search/id/${id}`
      : isAdmin
      ? `/admin/books/${id}`
      : `/users/${userId}/favorites/${id}`;

    let data;

    try {
      data = await apiRequest({
        endpoint,
      });

      console.log(data);

      // Checks whether the book with id is in db
      await apiRequest({
        endpoint: `/books/${id}`,
      });
    } catch (e) {
      // if in db
      if (e.status === 404) {
        data = await apiRequest({
          method: 'POST',
          endpoint: `/books/`,
          body: data,
        });
      } else if (e.status === 500) {
        console.log('Book ID not found in the API');
      } else {
        console.log(e.message);
      }
    } finally {
      if (data) {
        console.log(`inside finally - data`);
        if (search) {
          console.log(`inside finally - search`);
          // console.log(isAdmin);
          if (isAdmin) book = data.book;
          else book = data.book;
        } else {
          if (isAdmin) book = data.book;
          else book = data.favorite.favorited_book;
        }
        console.log(`inside finally - else`);
      }
    }
    console.debug('Book after update:', book);
  }

  async function fetchReview() {
    const endpoint = `/users/${userId}/books/${id}`;
    console.debug('endpoint: ', endpoint);

    let data;

    try {
      data = await apiRequest({
        endpoint,
      });

      console.debug('review: ', data.review);
      review = data.review;
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
        {#if book}
          <BookHeader {book} />
          <Row>
            <BookImageColumn {book} />
            {#if isEditingReview}
              <ReviewEditSection
                {book}
                review={isEditingReview}
                bind:isEditingReview
              />
            {:else}
              <BookTitleSection {book} />
            {/if}
            <Column class="buffer-column" sm={4} md={4} lg={4} xlg={4} max={3}>
              <div class="actions-container">
                <FavoriteBook {book} />
                {#if review}
                  <ReviewBook {review} {book} />
                  <ReviewBook {review} {book} bind:isEditingReview />
                {:else}
                  <ReviewBook {book} />
                  <ReviewBook {book} bind:isEditingReview />
                {/if}
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
