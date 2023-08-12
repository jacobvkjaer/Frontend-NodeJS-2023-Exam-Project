import { get } from 'svelte/store';
import { BASE_URL } from '../../stores/urls.js';
import toastr, { toastrSetup } from '../toaster/toastr.js';

toastrSetup();

export async function apiRequest({
  baseURL = get(BASE_URL),
  endpoint = '',
  method = 'GET',
  headers = {},
  body = null,
  credentials = 'include',
  useToastr = false,
}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  try {
    const url = `${baseURL}${endpoint}`;

    const response = await fetch(url, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : null,
      credentials,
    });

    // Logging for testing purposes
    const data = await response.json();
    console.log(`reponse: apiRequest`);
    console.log(data.message);

    if (!response.ok) {
      let errorMsg = data.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMsg);
    }

    if (useToastr && data.message) {
      toastr.success(data.message);
    }

    return data;
  } catch (error) {
    if (useToastr) toastr.error(error.message);
    throw error;
  }
}
