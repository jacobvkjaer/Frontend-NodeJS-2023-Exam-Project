<script>
  import { truncateWithTrails } from '../../utils/string-manipulation/string-manipulation';
  export let book;
</script>

<div class="wrapper">
  {#if book?.author}
    <div class="aligner">
      <h6>Author:</h6>
      <p title={book.author}>{truncateWithTrails(book.author, 15)}</p>
    </div>
  {/if}
  {#if book?.publisher}
    <div class="aligner">
      <h6>Publisher:</h6>
      <p title={book.publisher}>{truncateWithTrails(book.publisher, 11)}</p>
    </div>
  {/if}
  {#if book?.published_date}
    <div class="aligner">
      <h6>Published:</h6>
      <p title={book.publishedDate}>{book.published_date}</p>
    </div>
  {/if}
  {#if book?.categories}
    <div class="aligner">
      <h6>Categories:</h6>
      <p title={book.categories.join(', ')}>
        {truncateWithTrails(book.categories.join(', '), 11)}
      </p>
    </div>
  {/if}
  {#if book?.page_count}
    <div class="aligner">
      <h6>Pages:</h6>
      <p>{book.page_count}</p>
    </div>
  {/if}
</div>

<style>
  .aligner {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }

  h6 {
    padding-right: 5px;
  }

  p {
    font-size: 14px;
  }
</style>
