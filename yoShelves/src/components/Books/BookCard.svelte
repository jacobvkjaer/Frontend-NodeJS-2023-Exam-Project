<script>
  import { Link } from 'svelte-navigator';
  import { ImageLoader } from 'carbon-components-svelte';
  import bookIcon from '../../assets/icons/book.svg';

  export let book;
</script>

<div class="card-container">
  <div class="card">
    <Link to={`${book.id}`} class="link-id">
      <div class="image-container">
        <div class="image">
          <ImageLoader src={bookIcon} alt="image" />
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
  /* Affected by global style in UserCard.svelte */
  .card-container {
    margin: auto;
    padding-bottom: 40px;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 220px;
    height: 320px;
    background: rgba(82, 58, 40, 0.6);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    background: rgba(196, 98, 0, 0.4);
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    gap: 15px;
    padding-top: 25px;
  }

  .image {
    width: 120px;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 95%;
  }

  .title {
    text-align: center;
    overflow: hidden;
  }
</style>
