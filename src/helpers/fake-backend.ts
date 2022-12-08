export { fakeBackend };

function fakeBackend() {
  // route functions

//   function authenticate() {
//     const { username, password } = body();
//     const user = users.find(
//       (x) => x.username === username && x.password === password
//     );

//     if (!user) return error("Username or password is incorrect");

//     return ok({
//       id: user.id,
//       username: user.username,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       token: "fake-jwt-token",
//     });
//   }

//   function getUsers() {
//     if (!isAuthenticated()) return unauthorized();
//     return ok(users);
//   }

//   // helper functions

//   function ok(body) {
//     resolve({
//       ok: true,
//       text: () => Promise.resolve(JSON.stringify(body)),
//     });
//   }

//   function unauthorized() {
//     resolve({
//       status: 401,
//       text: () => Promise.resolve(JSON.stringify({ message: "Unauthorized" })),
//     });
//   }

//   function error(message) {
//     resolve({
//       status: 400,
//       text: () => Promise.resolve(JSON.stringify({ message })),
//     });
//   }

//   function isAuthenticated() {
//     return opts.headers["Authorization"] === "Bearer fake-jwt-token";
//   }

//   function body() {
//     return opts.body && JSON.parse(opts.body);
//   }
}
