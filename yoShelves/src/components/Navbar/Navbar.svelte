<script>
  import { user } from '../../stores/user.js';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { debounce } from '../../utils/search/debouncing.js';
  import { get } from 'svelte/store';
  import { BASE_URL } from '../../stores/urls.js';
  import { Link, useLocation, navigate, useMatch } from 'svelte-navigator';
  import Signout from '../Signout/Signout.svelte';
  import DeleteUser from '../Account/DeleteAccount.svelte';
  import { onMount, onDestroy } from 'svelte';
  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    HeaderSearch,
  } from 'carbon-components-svelte';
  import {
    Login,
    Undo,
    Review,
    Favorite,
    UserAvatarFilledAlt,
    Home,
  } from 'carbon-icons-svelte';

  let isSideNavOpen = true;
  let isOpen = false;

  let location = useLocation();
  const favoriteMatch = useMatch('/favorites');
  const favoriteIdFanMatch = useMatch('/favorites/:id/fans');
  let targetRoute;
  let icon;

  let isAdmin;
  let isAuthenticated;
  let unsubscribe;

  $: {
    if ($location.pathname === '/signin') {
      targetRoute = '/';
      icon = Undo;
    } else {
      targetRoute = '/signin';
      icon = Login;
    }
  }

  onMount(() => {
    unsubscribe = user.subscribe(value => {
      isAuthenticated = value.isAuthenticated;
      isAdmin = value.user.role === 'admin';
    });

    return unsubscribe;
  });

  // Search functionality
  let ref;
  let active = false;
  let value = '';
  let selectedResultIndex = 0;
  let events = [];
  let results = [];

  const fetchBooks = debounce(async query => {
    try {
      const endpoint = `/books/search/title-or-author/${encodeURIComponent(
        query
      )}`;
      const data = await apiRequest({
        endpoint,
        useToastr: true,
      });

      results = data.map(book => ({
        href: `/books/search/${encodeURIComponent(book.id)}`,
        text: book.title,
        description: book.author,
      }));
    } catch (e) {
      console.error('Error fetching books:', e.message);
    }
  }, 500);

  function handleInput(event) {
    const query = event.target.value;
    if (query.length < 3) {
      results = [];
      return;
    }
    fetchBooks(query);
  }
</script>

<header class="navbar">
  {#if isAuthenticated}
    <Header
      company="Welcome"
      platformName={$user?.user.username}
      bind:isSideNavOpen
    >
      <HeaderUtilities>
        <HeaderSearch
          bind:ref
          bind:active
          bind:value
          bind:selectedResultIndex
          placeholder="Search by title or author"
          {results}
          on:input={handleInput}
          on:active={() => {
            events = [...events, { type: 'active' }];
          }}
          on:inactive={() => {
            events = [...events, { type: 'inactive' }];
          }}
          on:clear={() => {
            events = [...events, { type: 'clear' }];
          }}
          on:select={e => {
            events = [...events, { type: 'select', ...e.detail }];
            console.log(e.detail.selectedResult);
            if (e.detail.selectedResult) {
              console.log('base: ' + e.detail.selectedResult);
              console.log('base + href: ' + e.detail.selectedResult.href);
              navigate(e.detail.selectedResult.href, { replace: true });
              results = [];
            }
          }}
        />
        <Link to="/favorites">
          <div
            class:selected={($favoriteMatch || $favoriteIdFanMatch) && !isOpen}
          >
            <HeaderGlobalAction aria-label="Favorites" icon={Favorite} />
          </div>
        </Link>
        <Link to="/reviews">
          <div class:selected={$location.pathname === '/reviews' && !isOpen}>
            <HeaderGlobalAction aria-label="Reviews" icon={Review} />
          </div>
        </Link>
        <Link to="/home">
          <div class:selected={$location.pathname === '/home' && !isOpen}>
            <HeaderGlobalAction aria-label="Home" icon={Home} />
          </div>
        </Link>
        <div class:selected={isOpen}>
          <HeaderAction
            bind:isOpen
            icon={UserAvatarFilledAlt}
            closeIcon={UserAvatarFilledAlt}
          >
            <HeaderPanelLinks>
              {#if isAdmin}
                <HeaderPanelDivider>Control panel</HeaderPanelDivider>
                <Link to="/users" on:click={() => (isOpen = false)}>
                  <HeaderPanelLink>Users</HeaderPanelLink>
                </Link>
                <Link to="/books" on:click={() => (isOpen = false)}>
                  <HeaderPanelLink>Books</HeaderPanelLink>
                </Link>
                <HeaderPanelLink>Favorites</HeaderPanelLink>
                <HeaderPanelLink>Reviews</HeaderPanelLink>
              {:else}
                <HeaderPanelDivider>Boring stuff</HeaderPanelDivider>
                <Link to="/home">
                  <div>
                    <HeaderPanelLink>item1</HeaderPanelLink>
                  </div>
                </Link>
                <HeaderPanelLink>item2</HeaderPanelLink>
                <HeaderPanelLink>item3</HeaderPanelLink>
                <HeaderPanelLink>item4</HeaderPanelLink>
              {/if}
              <HeaderPanelDivider>Account</HeaderPanelDivider>
              <HeaderPanelLink>Account settings</HeaderPanelLink>
              <HeaderPanelLink>Preferences</HeaderPanelLink>
              <Signout on:signedout={() => (isOpen = false)} />
              <DeleteUser on:userDeleted={() => (isOpen = false)} />
            </HeaderPanelLinks>
          </HeaderAction>
        </div>
      </HeaderUtilities>
    </Header>
  {:else}
    <Header company="Exam" platformName="YoShelves" bind:isSideNavOpen>
      <HeaderUtilities>
        <Link to={targetRoute}>
          <HeaderGlobalAction {icon} />
        </Link>
      </HeaderUtilities>
    </Header>
  {/if}
</header>

<style>
  :global(a:-webkit-any-link) {
    text-decoration: none;
    color: #ffffff;
  }

  :global(.s-hvm9nvLZEY8k .bx--header, .svelte-13u0dam .bx--header__action) {
    background-color: #523a28;
  }

  :global(
      .s-hvm9nvLZEY8k .bx--header__action:hover,
      .svelte-13u0dam .bx--header__action.disabled
    ) {
    background-color: #c46200;
  }

  :global(.s-hvm9nvLZEY8k .bx--header__action:active) {
    background-color: #964b00;
  }

  :global(.bx--header__action:focus) {
    border: none; /* Removes border */
  }

  :global([role='search'].active.svelte-13u0dam.svelte-13u0dam) {
    outline: none !important;
  }

  :global(input.svelte-13u0dam.svelte-13u0dam) {
    padding-left: 10px !important;
  }

  :global(
      .selected.svelte-13u0dam.svelte-13u0dam,
      [role='menuitem'].svelte-13u0dam.svelte-13u0dam:hover
    ) {
    background-color: #c46200 !important;
  }

  .navbar {
    height: 47px;
  }

  /* Aside */
  :global(.bx--header-panel, ul.svelte-13u0dam.svelte-13u0dam) {
    background-color: #614530 !important;
  }

  :global(.bx--header-panel .bx--switcher__item-link:hover) {
    background-color: #c46200;
  }

  :global(.bx--header-panel .bx--switcher__item-link:active) {
    background-color: #964b00;
  }

  .selected {
    background-color: #c46200; /* color for selected item */
  }

  /* Dropdown elements */
  :global(.bx--switcher__item:nth-child(1)) {
    margin-top: 0;
  }
</style>
