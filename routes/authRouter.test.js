import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";

import "dotenv/config";
import { findUser } from "../services/authService.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

mongoose.Promise = global.Promise;

const userTest = {
  email: "test3-user@gmail.com",
  password: "examplepassword",
};

describe("test /api/users/signin", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = await app.listen(PORT);
  });
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
  test("check status code = 200", async () => {
    const response = await request(app).post("/api/users/login").send(userTest);
    console.log(response.status);
    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe(userTest.email);

    const user = findUser(userTest.email);
    expect(user.email).toBe(userTest.email);
  });
});
