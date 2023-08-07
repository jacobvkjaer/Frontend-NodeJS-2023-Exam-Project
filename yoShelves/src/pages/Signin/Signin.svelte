<script>
  import { navigate } from 'svelte-navigator';
  import { BASE_URL } from '../../stores/urls.js';
  import { user } from '../../stores/user.js';
  import { Button, TextInput, PasswordInput } from 'carbon-components-svelte';
  import { Email, Password, Login } from 'carbon-icons-svelte';
  import toastr, { toastrSetup } from '../../utils/toaster/toastr.js';
  import ForgotPassword from '../../components/ForgotPassword/ForgotPassword.svelte';

  toastrSetup();

  let email = '';
  let password = '';

  async function handleLogin() {
    console.log(email, password);
    const userCredentials = JSON.stringify({ email, password });
    console.log(userCredentials);
    const signinURL = $BASE_URL + '/auth/signin';

    try {
      console.log(`1`);
      const response = await fetch(signinURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: userCredentials,
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message) {
          const userData = {
            id: data.user.id,
            role: data.user.role,
            username: data.user.username,
            email: data.user.email,
          };
          user.set(userData);
          toastr.success(`${data.message}`);
          setTimeout(() => {
            navigate('/home', { replace: true });
          }, 0);
        }
      } else {
        // Handle the error response
        let errorMsg = data.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMsg);
      }
    } catch (error) {
      toastr.error(error.message);
      let email = '';
      let password = '';
    }
  }
</script>

<div class="flex-center">
  <div class="outer">
    <h1>Signin</h1>
    <form on:submit|preventDefault={handleLogin}>
      <div
        class="inner"
        style="display: flex; flex-direction: column; gap: 1rem;"
      >
        <div class="line">
          <div class="icon">
            <Email size={20} />
          </div>
          <TextInput
            bind:value={email}
            type="email"
            placeholder="Email"
            name="email"
            labelText="Email address"
            required={true}
          />
        </div>

        <div class="line">
          <div class="icon">
            <Password size={20} />
          </div>
          <PasswordInput
            bind:value={password}
            type="password"
            placeholder="Password"
            name="password"
            labelText="Password"
            required={true}
          />
        </div>

        <ForgotPassword />
      </div>
      <div class="button">
        <Button type="submit" icon={Login}>Signin</Button>
      </div>
    </form>
  </div>
</div>

<style>
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 48px);
    width: 100%;
  }

  .outer,
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    margin-bottom: 1em;
  }

  .button {
    margin-top: 4em;
  }

  .inner {
    min-width: 400px;
  }

  .line {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .icon {
    margin-top: 20px;
  }

  a:-webkit-any-link {
    text-decoration: none;
    cursor: pointer;
  }
</style>
