import { useAuthStore } from "@/stores";

import { expressJS_url, expressJS_port } from "../config/env.frontend";

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method: string) {
  return (url: string, body: object) => {
    let requestOptions: object = {};
    if (body) {
      requestOptions = {
        method,
        headers: authHeader(url),
        body: JSON.stringify(body),
      };
    } else {
      requestOptions = {
        method,
        headers: authHeader(url),
        body: {},
      };
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
}

// helper functions

function authHeader(url: string) {
  // return auth header with jwt if user is logged in and request is to the api url
  const { api_token } = useAuthStore();
  const isLoggedIn = !!api_token?.token;
  const isApiUrl = url.startsWith(`${expressJS_url}:${expressJS_port}`);
  if (isLoggedIn && isApiUrl) {
    return {
      Authorization: `Bearer ${api_token.token}`,
      "Content-Type": "application/json",
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    const { api_token, logout } = useAuthStore();
    if ([401, 403].includes(response.status) && api_token) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      logout();
    }
    if (response.status.toString().startsWith("2")) {
      const data = text && JSON.parse(text);
      return Promise.resolve(data);
    }
    console.log(response.status);
    return Promise.reject(text);
  });
}
