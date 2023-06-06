import { writable } from 'svelte/store';

const createUserStore = () => {
  const { subscribe, set, update } = writable({
    isAuthenticated: false,
    user: {
      id: null,
      role: null,
      username: null,
      email: null
    }
  });

  const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ isAuthenticated: true, user });
  }

  const clearUser = () => {
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: { id: null, role: null, username: null, email: null } });
  }

  return {
    subscribe,
    set: setUser,
    update,
    clearUser,
    updateRole: (role) => update((state) => {
      state.user.role = role;
      return state;
    })
  };
};

export const user = createUserStore();





// import { writable, derived } from "svelte/store";

// function createUserStore() {
//   const { subscribe, set, update } = writable(null);

//   return {
//     subscribe,
//     set: (value) => {
//       localStorage.setItem('user', JSON.stringify(value));
//       set(value);
//     },
//     remove: () => {
//       localStorage.removeItem('user');
//       set(null);
//     },
//   }
// }

// export const user = createUserStore();
// export const isLoggedIn = derived(user, $user => !!$user);
