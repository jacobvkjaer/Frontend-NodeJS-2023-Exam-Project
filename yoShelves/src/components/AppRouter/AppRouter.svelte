<script>
  import { onMount } from 'svelte';
  import { user } from '../../stores/user.js';
  import { Router, Route, useLocation, useNavigate } from 'svelte-navigator';
  import qs from 'qs';
  import PrivateRoute from '../RoutesPrivate/PrivateRoute.svelte';
  import AllAccess from '../../pages/Main/AllAccess.svelte';
  import Signin from '../../pages/Signin/Signin.svelte';
  import ResetPassword from '../ResetPassword/ResetPassword.svelte';
  import Home from '../../pages/Main/Home.svelte';
  import Users from '../../pages/Users/Users.svelte';
  import User from '../../pages/Users/User.svelte';
  import Books from '../../pages/Books/Books.svelte';
  import Book from '../../pages/Books/Book.svelte';
  import BookFans from '../../pages/Books/BookFans.svelte';
  import Favorites from '../../pages/Favorites/Favorites.svelte';
  import Reviews from '../../pages/Reviews/Reviews.svelte';
  import Review from '../../pages/Reviews/Review.svelte';

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
    <!-- Upon reload -->
    <Route path="/">
      {#if $user?.user.id}
        setTimeout(() => {navigate('/home', { replace: true })}, 0);
      {:else}
        <AllAccess />
      {/if}
    </Route>
    <!-- Home -->
    <PrivateRoute path="/home">
      <Home />
    </PrivateRoute>

    <!-- Admin -->
    <!-- users -->
    <PrivateRoute path="/users">
      <Users />
    </PrivateRoute>
    <PrivateRoute path="/users/:id" let:params>
      {#if params.id}
        <User id={params.id} />
      {:else}
        <div>Error</div>
      {/if}
    </PrivateRoute>
    <PrivateRoute path="/users/:id/reviews" let:params>
      {#if params.id}
        <User id={params.id} />
      {:else}
        <div>Error</div>
      {/if}
    </PrivateRoute>
    <PrivateRoute path="/favorites/:id/fans" let:params>
      {#if params.id}
        <BookFans id={params.id} />
      {:else}
        <div>Error</div>
      {/if}
    </PrivateRoute>

    <!-- books -->
    <PrivateRoute path="/books">
      <Books />
    </PrivateRoute>
    <PrivateRoute path="/books/:id" let:params>
      {#if params.id}
        <Book id={params.id} />
      {:else}
        <div>Error</div>
      {/if}
    </PrivateRoute>
    <PrivateRoute path="/books/search/:id" let:params>
      {#if params.id}
        <Book id={params.id} search="true" />
      {:else}
        <div>Error</div>
      {/if}
    </PrivateRoute>

    <Route path="/signin" component={Signin} />
    <Route path="/reset/:token" let:params>
      {#if queryParams.email}
        <ResetPassword token={params.token} email={queryParams.email} />
      {:else}
        <div>Error: Email parameter is missing.</div>
      {/if}
    </Route>

    <!-- Reviews -->
    <PrivateRoute path="/reviews">
      <Reviews />
    </PrivateRoute>
    <PrivateRoute path="/reviews/:id" let:params>
      {#if params.id}
        <Review id={params.id} />
      {:else}
        <div>Error</div>
      {/if}
    </PrivateRoute>

    <!-- Favorites -->
    <PrivateRoute path="/favorites">
      <Favorites />
    </PrivateRoute>
    <PrivateRoute path="/favorites/:id" let:params>
      {#if params.id}
        <Book id={params.id} />
      {:else}
        <div>Error</div>
      {/if}
    </PrivateRoute>
  </main>
</Router>

<style>
  main {
    min-width: 100%;
    width: 100%;
  }
</style>
