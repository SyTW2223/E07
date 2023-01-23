import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
const expressAPI = request("http://localhost:3000");

async function getJWT() {
  const login = await expressAPI.post("/login").send({
    email: "test@test.test",
    password: "Test123456",
  });
  return login.body.token;
}

let jwt = undefined;

beforeAll(async () => {
  jwt = await getJWT();
  console.log(jwt);
});

describe("GET (/users) tests", () => {
  it("Trying to get a user without username should respond with 401", async () => {
    const response = await expressAPI
      .get("/user")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(response.status).toBe(404);
  });

  it("Trying to get a user that not exists should respond with 404", async () => {
    const response = await expressAPI
      .get("/user?username=IAMANINVENTEDUSERTHATDOESNOTEXISTS")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(response.status).toBe(404);
  });

  it("Trying to get a user that exists should respond with the user and 200", async () => {
    const response = await expressAPI
      .get("/user?username=test")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.publications).toBeTruthy;
  });
});

describe("GET (/users/:id) tests", () => {
  it("Trying to get an user with an ID that does not exist should return a 404", async () => {
    const response = await expressAPI
      .get("/user/000000000000000000000000")
      .set("Authorization", `Bearer ${jwt}`)
      .send();
    expect(response.status).toBe(404);
  });
});
