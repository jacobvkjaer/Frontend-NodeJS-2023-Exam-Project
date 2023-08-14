<script>
  import { truncateWithTrails } from './../../utils/string-manipulation/string-manipulation.js';
  import { user } from '../../stores/user.js';
  import { Link } from 'svelte-navigator';
  import { ImageLoader } from 'carbon-components-svelte';
  import { Star, StarFilled, StarHalf } from 'carbon-icons-svelte';
  import bookIcon from '../../assets/icons/book.svg';
  import CardContainer from '../Card/CardContainer.svelte';
  import ImageContainer from '../Card/ImageContainer.svelte';

  export let review;

  let isAdmin = $user?.user.role === 'admin';
  let book = review?.reviewed_book;
  let endpoint = `${review.id}`;
  // let endpoint = isAdmin ? `${book.id}/fans` : `${book.id}`;
</script>

<CardContainer>
  <Link to={endpoint} class="link-id">
    <ImageContainer>
      <ImageLoader slot="image" src={book.image} alt="image" />

      <div slot="info">
        <h4 class="title">{truncateWithTrails(book.title, 32)}</h4>
        <div class="aligner">
          {#each Array(Math.floor(review.rating)).fill() as _}
            <h5><StarFilled size={16} /></h5>
          {/each}
          {#if review.rating % 1 >= 0.5}
            <h5><StarHalf size={16} /></h5>
          {/if}
          {#each Array(5 - Math.ceil(review.rating)).fill() as _}
            <h5><Star size={16} /></h5>
          {/each}
        </div>
        <h4 class="title">{truncateWithTrails(review.review_title, 32)}</h4>
      </div>
    </ImageContainer>
  </Link>
</CardContainer>

<style>
  .aligner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding-top: 5px;
  }

  .title {
    text-align: center;
    overflow: hidden;
  }
</style>
