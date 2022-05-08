const UserController = require("../../controllers/user.controller");
const httpMocks = require("node-mocks-http");
const { User } = require("../../models");
const { hashPassword } = require("../../helpers/bcrypt");

jest.mock("../../models/");

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
beforeEach(() => {
  jest.clearAllMocks();
});

const userData = {
  id: 1,
  firstName: "Jems",
  lastName: "Kirawan",
  email: "asd@gmail.com",
  password: "secret",
};

const testingData = {
  id: 1,
  firstName: "Jems",
  lastName: "Kirawan",
  email: "asd@gmail.com",
  password: hashPassword("secret"),
};

describe("UserController.registerUser", () => {
  it("should return 201", async () => {
    User.create.mockResolvedValue(userData);
    User.findOne.mockResolvedValue(null);
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(201);
  });
  it("should return 400", async () => {
    User.findOne.mockResolvedValue({
      email: "asssd@gmail.com",
    });
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(400);
  });
  it("should return 503", async () => {
    const rejected = Promise.reject({ message: "Error" });
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(rejected);
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(503);
  });
  it("should return 500", async () => {
    const rejected = Promise.reject({ message: "Error" });
    User.findOne.mockResolvedValue(rejected);
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(500);
  });
});
