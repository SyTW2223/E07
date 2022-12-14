import { describe, it, expect } from "vitest";
import request from "supertest";

const expressAPI = request("http://localhost:3000");
describe("GET (/users) tests", () => {
  it("Trying to get a user without username should respond with 401", async () => {
    const response = await expressAPI.get("/user").send();
    expect(response.status).toBe(404);
  });

  it("Trying to get a user that not exists should respond with 404", async () => {
    const response = await expressAPI
      .get("/user?username=IAMANINVENTEDUSERTHATDOESNOTEXISTS")
      .send();
    expect(response.status).toBe(404);
  });

  it("Trying to get a user that exists should respond with the user and 200", async () => {
    const response = await expressAPI.get("/user?username=test").send();
    expect(response.status).toBe(200);
    expect(response.body.publications).toBeTruthy;
  });
});

describe("GET (/users/:id) tests", () => {
  it("Trying to get an user with an ID that does not exist should return a 401", async () => {
    const response = await expressAPI
      .get("/user/000000000000000000000000")
      .send();
    expect(response.status).toBe(401);
  });

  // it("Trying to get an user with an ID that exists should return the user and 200", async () => {
  //   const response = await expressAPI
  //     .get("/user/63b315a36a74a2d2e88c2814")
  //     .send();
  //   expect(response.status).toBe(200);
  //   expect(response.body.username).toBe("test");
  //   expect(response.body.password).toBe("Test123456");
  //   expect(response.body.email).toBe("test@test.test");
  // });
});
