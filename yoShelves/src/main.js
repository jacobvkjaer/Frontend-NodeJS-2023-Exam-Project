import './assets/css/app.css';
// import "carbon-components-svelte/css/all.css";
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
