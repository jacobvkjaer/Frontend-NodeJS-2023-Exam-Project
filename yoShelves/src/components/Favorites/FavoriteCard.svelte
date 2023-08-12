<script>
  import { truncateWithTrails } from './../../utils/string-manipulation/string-manipulation.js';
  import { onMount } from 'svelte';
  import { user } from '../../stores/user.js';
  import { Link } from 'svelte-navigator';
  import { ImageLoader } from 'carbon-components-svelte';
  import bookIcon from '../../assets/icons/book.svg';
  import CardContainer from '../Card/CardContainer.svelte';
  import ImageContainer from '../Card/ImageContainer.svelte';

  export let favorite;

  let isAdmin = $user?.user.role === 'admin';
  let book = favorite?.favorited_book;
  let endpoint = isAdmin ? `${book.id}/fans` : `${book.id}`;
</script>

<CardContainer>
  <Link to={endpoint} class="link-id">
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
