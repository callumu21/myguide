const request = require("supertest");

const app = require("../app.js");

describe("Testing the sites endpoint", () => {
  test("should return all of the valid sites, status 200", () => {
    return request(app)
      .get("/sites")
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

  test("should return all associated sites by stated author ID", () => {
    return request(app)
      .get("/sites/1")
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

  test("should return an empty when passed an ID with no associated sites", () => {
    return request(app)
      .get("/sites/0")
      .expect(200)
      .then(({ body }) => {
        const sites = body;
        expect(sites).toBeInstanceOf(Array);
        expect(sites).toHaveLength(0);
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
});
