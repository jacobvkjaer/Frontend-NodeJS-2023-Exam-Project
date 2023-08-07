<script>
  import { onMount } from 'svelte';
  import { user } from '../../stores/user.js';
  import { Router, Route, useLocation, useNavigate } from 'svelte-navigator';
  import qs from 'qs';
  import PrivateRoute from '../RoutesPrivate/PrivateRoute.svelte';
  import AllAccess from '../../pages/AllAccess/AllAccess.svelte';
  import Signin from '../../pages/Signin/Signin.svelte';
  import ResetPassword from '../ResetPassword/ResetPassword.svelte';
  import Home from '../../pages/Home/Home.svelte';
  import Book from '../../pages/Books/Book.svelte';
  import Reviews from '../../pages/Reviews/Reviews.svelte';
  import Favorites from '../../pages/Favorites/Favorites.svelte';

  let location = useLocation();
  let navigate = useNavigate();

  // const handleNavigation = () => {
  //   if ($user?.user.id && $location?.pathname !== '/') {
  //     console.log('Saving location', $location.pathname);
  //     window.localStorage.setItem('savedLocation', $location.pathname);
  //   }
  // };

  const handleNavigation = () => {
    if (user && $location?.pathname !== '/') {
      console.log('Saving location', $location.pathname);
      window.localStorage.setItem('savedLocation', $location.pathname);
    }
  };

  // onMount(() => {
  //   if ($location.pathname.startsWith('/reset/')) {
  //     console.log('On reset password page, skipping redirect logic.');
  //     return;
  //   }
  //   const savedLocation = window.localStorage.getItem('savedLocation');
  //   console.log('Saved location', savedLocation);
  //   // console.log("$user?.user.id");
  //   // console.log($user.user.id);
  //   if ($user?.user.id) {
  //     if (savedLocation && savedLocation !== '/') {
  //       console.log('Navigating to saved location');
  //       navigate(savedLocation, { replace: true });
  //     } else {
  //       console.log('Navigating to /home');
  //       navigate('/home', { replace: true });
  //     }
  //   } else {
  //     console.log('Navigating to /');
  //     navigate('/', { replace: true });
  //   }
  // });

  onMount(() => {
    if ($location.pathname.startsWith('/reset/')) {
      return;
    }

    const savedLocation = window.localStorage.getItem('savedLocation');

    if ($user?.user.id) {
      navigate(
        savedLocation && savedLocation !== '/' ? savedLocation : '/home',
        { replace: true }
      );
    } else {
      if ($location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    }
  });

  // Extract query parameters
  const queryParams = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
</script>

<Router on:navigate={handleNavigation} primary={false}>
  <main>
    <Route path="/">
      {#if $user.user.id}
        <Route path="/home" component={Home} />
        <!-- <svelte:component this={Home} /> -->
      {:else}
        <AllAccess />
      {/if}
    </Route>
    <Route path="/signin" component={Signin} />
    <Route path="/reset/:token" let:params>
      {#if queryParams.email}
        <ResetPassword token={params.token} email={queryParams.email} />
      {:else}
        <div>Error: Email parameter is missing.</div>
      {/if}
    </Route>
    <PrivateRoute path="/books/title/:title" let:params>
      <Book title={params.title} />
    </PrivateRoute>
    <Route path="/books1/title1/dragon">
      <Book />
    </Route>
    <PrivateRoute path="/reviews">
      <Reviews />
    </PrivateRoute>
    <PrivateRoute path="/favorites">
      <Favorites />
    </PrivateRoute>
  </main>
</Router>

<style>
  main {
    min-width: 100%;
    width: 100%;
  }
</style>
