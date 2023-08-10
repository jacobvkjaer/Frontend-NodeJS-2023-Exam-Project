<script>
  import { Link } from 'svelte-navigator';
  import { ImageLoader } from 'carbon-components-svelte';

  export let book;
  import userIcon from '../../assets/icons/user.svg';
</script>

<div class="card-container">
  <div class="card">
    <Link to={`${book.id}`} class="link-id">
      <div class="image-container">
        <div class="image">
          <ImageLoader src={userIcon} alt="image" />
        </div>

        <div class="info">
          <h4 class="title">{book.title}</h4>
          <h5 class="title">{book.author}</h5>
        </div>
      </div>
    </Link>
  </div>
</div>

<style>
  @import '../../assets/css/cards.css';
</style>
