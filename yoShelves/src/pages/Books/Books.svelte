<script>
  import { onMount } from 'svelte';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { Row, Column } from 'carbon-components-svelte';

  import Grid from '../../components/Grid/GridContainer.svelte';
  import Header from '../../components/Users/Header.svelte';
  import RowAndColumn from '../../components/Grid/RowAndColumnContainer.svelte';
  import Loading from '../../components/Loading/Loading.svelte';
  import BookCard from '../../components/Books/BookCard.svelte';

  let books = null;
  let isLoading = true;

  async function fetchBooks() {
    try {
      const data = await apiRequest({
        endpoint: '/admin/books',
      });
      books = data.books;
      console.log(books);
      isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }

  onMount(fetchBooks);
</script>

<div class="container">
  <Grid>
    <RowAndColumn classColumn={'header-column'}>
      <Header header={'Books'} />
    </RowAndColumn>
    {#if isLoading}
      <RowAndColumn classColumn={'header-column'} classDiv={'p-text'}>
        <Loading />
      </RowAndColumn>
    {:else if books && books.length > 0}
      <Row noGutter>
        {#each books as book (book.id)}
          <Column sm={6} md={4} lg={5} xlg={4} max={3}>
            <BookCard {book} />
          </Column>
        {/each}
      </Row>
    {:else}
      <RowAndColumn classColumn={'header-column'} classDiv={'p-text'}>
        <p>No books yet? That can't be right.</p>
      </RowAndColumn>
    {/if}
  </Grid>
</div>
