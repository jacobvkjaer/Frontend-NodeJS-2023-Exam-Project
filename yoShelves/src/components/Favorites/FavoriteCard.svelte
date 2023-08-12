<script>
  import { truncateWithTrails } from './../../utils/string-manipulation/string-manipulation.js';
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import { ImageLoader } from 'carbon-components-svelte';
  import bookIcon from '../../assets/icons/book.svg';
  import CardContainer from '../Card/CardContainer.svelte';
  import ImageContainer from '../Card/ImageContainer.svelte';

  export let favorite;
  let book = favorite.favorited_book;
</script>

<CardContainer>
  <Link to={`${book.id}/fans`} class="link-id">
    <ImageContainer>
      <ImageLoader slot="image" src={book.image} alt="image" />

      <div slot="info">
        <h4 class="title">{truncateWithTrails(book.title, 32)}</h4>
        <h5 class="title">{truncateWithTrails(book.author, 20)}</h5>
      </div>
    </ImageContainer>
  </Link>
</CardContainer>

<style>
  .title {
    text-align: center;
    overflow: hidden;
  }
</style>
