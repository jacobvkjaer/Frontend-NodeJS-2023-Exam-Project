<script>
  import 'carbon-components-svelte/css/all.css';
  import { Theme } from 'carbon-components-svelte';
  import 'carbon-icons-svelte';
  import 'carbon-pictograms-svelte';

  import { onMount, onDestroy } from 'svelte';
  import { user } from './stores/user.js';
  import { BASE_URL } from './stores/urls.js';
  import { Router, useLocation } from 'svelte-navigator';
  import AppRouter from './components/AppRouter/AppRouter.svelte';
  import Navbar from './components/Navbar/Navbar.svelte';

  onMount(async () => {
    // console.log(window.location.pathname); // results in '/'
    if (!window.location.pathname.includes('/reset/')) {
      console.log('Making /auth/status request');
      const authStatusURL = `${$BASE_URL}/auth/status`;
      const response = await fetch(authStatusURL, {
        credentials: 'include',
      });

      if (response.ok) {
        console.log(`getting data...`);
        const data = await response.json();
        user.set(data.user);
      } else {
        console.log(`clearing user...`);
        user.clearUser();
      }

      // Subscribe to the user state and log it whenever it changes
      user.subscribe(state => {
        console.log(state);
      });
    }
  });
</script>

<Theme
  theme="g90"
  tokens={{
    'interactive-01': '#004363',
    'hover-primary': '#006ea2',
    'active-primary': '#004e73',
  }}
>
  <Router>
    <Navbar />
    <AppRouter />
  </Router>
</Theme>
