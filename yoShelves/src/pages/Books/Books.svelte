<script>
  import { onMount } from 'svelte';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { Grid, Row, Column } from 'carbon-components-svelte';

  import BufferColumn from '../../components/Grid/BufferColumn.svelte';
  import Loading from '../../components/Loading/Loading.svelte';

  import Container from '../../components/General/Container.svelte';
  import Header from '../../components/General/Header.svelte';
  import RowCol from '../../components/General/RowAndColumnContainer.svelte';
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

<Container>
  <Grid fullWidth>
    <Row>
      <BufferColumn />
      <Column class="content-column" sm={16} md={16} lg={16} xlg={14} max={12}>
        <Header classColumn={'header-column'} header={'Books'} />
        {#if isLoading}
          <RowCol classColumn={'header-column'}>
            <Loading />
          </RowCol>
        {:else if books && books.length > 0}
          <Row>
            {#each books as book (book.id)}
              <Column sm={6} md={4} lg={5} xlg={4} max={3}>
                <BookCard {book} />
              </Column>
            {/each}
          </Row>
        {:else}
          <RowCol classColumn={'header-column'}>
            <p>No books yet? That can't be right.</p>
          </RowCol>
        {/if}
      </Column>
      <BufferColumn />
    </Row>
  </Grid>
</Container>
