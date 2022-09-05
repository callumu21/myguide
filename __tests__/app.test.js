const request = require("supertest");

const app = require("../app.js");

describe("test1", () => {
  test("should return 1 item", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(2);
      });
  });
});
