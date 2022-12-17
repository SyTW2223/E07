import { describe, it, expect, assert } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

const expressAPI = request("http://localhost:3000");
describe("JWT tests", () => {
  it("When login, the api should return a JWT with a 201 status", async () => {
    const login = await expressAPI.post("/login").send({
      email: "test@test.test",
      password: "Test123456",
    });
    const retrievedToken = login.body.token;
    expect(login.status).toBe(201);
    expect(retrievedToken).not.toBe(null);
  });

  it("Trying to add a publication without JWT token should return 401", async () => {
    const response = await expressAPI.post("/publication").send({
      title: "test",
      content: "test",
    });
    expect(response.text).toBe('{"err":"Missing token"}');
    expect(response.status).toBe(401);
  });

  it("Trying to add a publication with an invalid JWT token should return 403", async () => {
    const token = jwt.sign({ user: "Fake user" }, "Not the password", {
      expiresIn: "1h",
    });
    const response = await expressAPI
      .post("/publication")
      .set("Authorization", `Bearer ${token}`);
    expect(response.text).toBe('{"err":"Invalid token"}');
    expect(response.status).toBe(403);
  });
});
