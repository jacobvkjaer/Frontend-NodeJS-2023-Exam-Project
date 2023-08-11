<script>
  import { Link } from 'svelte-navigator';
  import { ImageLoader } from 'carbon-components-svelte';
  import userIcon from '../../assets/icons/user.svg';
  import CardContainer from '../Card/CardContainer.svelte';
  import ImageContainer from '../Card/ImageContainer.svelte';

  export let user;
</script>

<CardContainer>
  <Link to={`${user.id}`} class="link-id">
    <ImageContainer>
      <ImageLoader slot="image" src={userIcon} alt="image" />

      <div slot="info">
        <h3 class="title">{user.username}</h3>
        <h4 class="title">({user.role})</h4>
        <h6 class="title">{user.email}</h6>
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
