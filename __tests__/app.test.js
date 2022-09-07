const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => seed(testData));

describe("Testing the sites endpoint", () => {
  test("should return all of the valid sites, status 200", () => {
    return request(app)
      .get("/sites")
      .expect(200)
      .then(({ body }) => {
        const sites = body;
        expect(sites).toBeInstanceOf(Array);
        expect(sites).toHaveLength(4);
        sites.forEach((site) => {
          expect(site).toEqual(
            expect.objectContaining({
              authorID: expect.any(Number),
              siteName: expect.any(String),
              siteDescription: expect.any(String),
              siteImage: expect.any(String),
              siteAddress: expect.any(String),
              latitude: expect.any(Number),
              longitude: expect.any(Number),
              contactInfo: expect.any(String),
              websiteLink: expect.any(String),
            })
          );
        });
      });
  });

  test("should return all associated sites by stated author ID", () => {
    return request(app)
      .get("/sites?author_id=1")
      .expect(200)
      .then(({ body }) => {
        const sites = body;
        expect(sites).toBeInstanceOf(Array);
        expect(sites).toHaveLength(3);
        sites.forEach((site) => {
          expect(site).toEqual(
            expect.objectContaining({
              authorID: expect.any(Number),
              siteName: expect.any(String),
              siteDescription: expect.any(String),
              siteImage: expect.any(String),
              siteAddress: expect.any(String),
              latitude: expect.any(Number),
              longitude: expect.any(Number),
              contactInfo: expect.any(String),
              websiteLink: expect.any(String),
            })
          );
        });
      });
  });

  test("should post a new site into site db, status 201", () => {
    return request(app)
      .post("/sites")
      .send({
        authorID: 12,
        siteName: "String",
        siteDescription: "String",
        siteImage: "String",
        siteAddress: "String",
        latitude: 1232,
        longitude: 1232,
        contactInfo: "String",
        websiteLink: "String",
      })
      .expect(201)
      .then(({ body }) => {
        const sites = body;
        expect(sites).toBeInstanceOf(Object);
        expect(sites).toEqual(
          expect.objectContaining({
            authorID: 12,
            siteName: "String",
            siteDescription: "String",
            siteImage: "String",
            siteAddress: "String",
            latitude: 1232,
            longitude: 1232,
            contactInfo: "String",
            websiteLink: "String",
          })
        );
      });
  });

  test("should return a status 404 when passed an Author ID with no associated sites", () => {
    return request(app)
      .get("/sites?author_id=23")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Author ID does not exist");
      });
  });

  test("should return a status 400 when passed an invalid input", () => {
    return request(app)
      .get("/sites?author_id=dsahk")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });

  test("should return status 400 when missing info on posted site", () => {
    return request(app)
      .post("/sites")
      .send({
        authorID: 12,
        siteName: "String",
        siteDescription: "String",
        siteImage: "String",
        latitude: 1232,
        longitude: 1232,
        contactInfo: "String",
        websiteLink: "String",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Missing Input Information!");
      });
  });

  test("should return status 400 when given incorrect data on site posting", () => {
    return request(app)
      .post("/sites")
      .send({
        authorID: 12,
        siteName: "String",
        siteDescription: "String",
        siteImage: "String",
        siteAddress: "String",
        latitude: "1232",
        longitude: 1232,
        contactInfo: "String",
        websiteLink: "String",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });
});
