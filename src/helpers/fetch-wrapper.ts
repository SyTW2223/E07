import { useAuthStore } from "@/stores";

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
    console.log(authHeader(url));
    return fetch(url, requestOptions).then(handleResponse);
  };
}

// helper functions

function authHeader(url: string) {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.token;
  const isApiUrl = url.startsWith("http://localhost:3000");
  if (isLoggedIn && isApiUrl) {
    return {
      Authorization: `Bearer ${user.token}`,
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
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const { user, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && user) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
