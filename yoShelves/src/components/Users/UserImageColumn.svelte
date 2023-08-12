<script>
  import { Column } from 'carbon-components-svelte';
  import UserImage from './UserImage.svelte';
  import UserDetails from './UserDetails.svelte';

  export let user;
</script>

<Column class="image-column-user" sm={2} md={2} lg={2} xlg={2} max={2}>
  <UserImage />
  <UserDetails {user} />
</Column>

<style>
  /* :global(
      .image-column-user.bx--col-sm-2.bx--col-md-2.bx--col-lg-2.bx--col-xlg-2.bx--col-max-3,
      .title-column.bx--col-sm-10.bx--col-md-10.bx--col-lg-10.bx--col-xlg-10.bx--col-max-10
    ) {
    padding: 20px 20px 20px 0;
  } */

  :global(
      .image-column-user.bx--col-sm-2.bx--col-md-2.bx--col-lg-2.bx--col-xlg-2.bx--col-max-2
    ) {
    padding: 20px 20px 20px 0;
    border-right: 1px solid #523a28;
    min-width: 300px;
    max-width: 400px;
  }
</style>
