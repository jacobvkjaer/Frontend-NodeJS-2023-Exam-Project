<script>
  import { Link } from 'svelte-navigator';
  import { ImageLoader } from 'carbon-components-svelte';
  import bookIcon from '../../assets/icons/book.svg';
  import CardContainer from '../Card/CardContainer.svelte';
  import ImageContainer from '../Card/ImageContainer.svelte';

  export let book;
</script>

<CardContainer>
  <Link to={`${book.id}`} class="link-id">
    <ImageContainer>
      <ImageLoader slot="image" src={bookIcon} alt="image" />

      <div slot="info">
        <h4 class="title">{book.title}</h4>
        <h5 class="title">{book.author}</h5>
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
