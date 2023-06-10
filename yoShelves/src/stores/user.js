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