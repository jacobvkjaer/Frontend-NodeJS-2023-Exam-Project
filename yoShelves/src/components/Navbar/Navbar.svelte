<script>
  import { get } from 'svelte/store';
  import { BASE_URL } from '../../stores/urls.js';
  import { user } from '../../stores/user.js';
  import { Link, useLocation, navigate } from 'svelte-navigator';
  import Signout from '../Signout/Signout.svelte';
  import DeleteUser from '../DeleteUser/DeleteUser.svelte';
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
    CharacterSentenceCase,
  } from 'carbon-icons-svelte';

  let isSideNavOpen = true;
  let isOpen = false;
  let expanded = false;

  let location = useLocation();
  let targetRoute;
  let icon;

  let email;
  let unsubscribe;

  let isAuthenticated;

  onMount(() => {
    unsubscribe = user.subscribe(value => {
      isAuthenticated = value.isAuthenticated;
    });

    return unsubscribe;
  });

  async function handleInput(event) {
    const query = event.target.value;
    if (query.length < 3) {
      results = [];
      return;
    }

    console.log(query);
    const baseUrl = get(BASE_URL);
    const bookURL = `${baseUrl}/books/search/title-or-author/${encodeURIComponent(
      query
    )}`;
    console.log(bookURL);

    try {
      const response = await fetch(bookURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const books = await response.json();
      results = books.map(book => ({
        href: `/books/title/${encodeURIComponent(book.title)}`,
        text: book.title,
        description: book.author,
      }));

      console.log(results);
      console.log(results.href);
    } catch (e) {
      console.log(e);
    }
  }

  $: {
    if ($location.pathname === '/signin') {
      targetRoute = '/';
      icon = Undo;
    } else {
      targetRoute = '/signin';
      icon = Login;
    }
  }

  // const data = [
  //   // Insert your data here...
  // ];

  let ref = null;
  let active = false;
  let value = '';
  let selectedResultIndex = 0;
  let events = [];

  $: lowerCaseValue = value.toLowerCase();
  $: results =
    value.length > 0
      ? data.filter(item => {
          return (
            item.text.toLowerCase().includes(lowerCaseValue) ||
            item.description.includes(lowerCaseValue)
          );
        })
      : [];
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
              navigate(e.detail.selectedResult.href);
            }
          }}
        />
        <!-- <Link to="/books1/title1/dragon">
          <div
            class:selected={$location.pathname === '/books1/title1/dragon' &&
              !isOpen}
          >
            <HeaderGlobalAction
              aria-label="books1/title1/dragon"
              icon={CharacterSentenceCase}
            />
          </div>
        </Link> -->
        <Link to="/favorites">
          <div class:selected={$location.pathname === '/favorites' && !isOpen}>
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
              {#if $user.user.role === 'admin'}
                <HeaderPanelDivider>Control panel</HeaderPanelDivider>
                <Link to="/admin/users" on:click={() => (isOpen = false)}>
                  <HeaderPanelLink>Users</HeaderPanelLink>
                </Link>
                <Link to="/admin/books" on:click={() => (isOpen = false)}>
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
