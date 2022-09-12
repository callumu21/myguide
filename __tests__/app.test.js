const request = require("supertest");
const jestsorted = require("jest-sorted");
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
        expect(sites).toHaveLength(18);
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
        expect(sites).toHaveLength(8);
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

  test("should return a status 404 when passed an empty array as the sites_id query", () => {
    return request(app)
      .get("/sites?site_id=[]")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("No sites found");
      });
  });

  test("should return a status 404 when passed an array with site ids not matching any site", () => {
    return request(app)
      .get("/sites?site_id=[200, 201]")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("No sites found");
      });
  });

  test("should return a status 400 when passed a site_ids query not matching an array", () => {
    return request(app)
      .get("/sites?site_id=211")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Site IDs should be an array");
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

describe("Testing the tours endpoint", () => {
  test("should return all of the valid tours, status 200", () => {
    return request(app)
      .get("/tours")
      .expect(200)
      .then(({ body }) => {
        const tours = body;
        expect(tours).toBeInstanceOf(Array);
        expect(tours).toHaveLength(5);
        tours.forEach((tour) => {
          expect(tour).toEqual(
            expect.objectContaining({
              tourId: expect.any(Number),
              tourCode: expect.any(Number),
              tourName: expect.any(String),
              tourDescription: expect.any(String),
              tourImage: expect.any(String),
              tourSites: expect.any(Array),
            })
          );
        });
      });
  });

  test("should return all associated tours by stated author ID", () => {
    return request(app)
      .get("/tours?author_id=1")
      .expect(200)
      .then(({ body }) => {
        const tours = body;
        expect(tours).toBeInstanceOf(Array);
        expect(tours).toHaveLength(3);
        tours.forEach((tour) => {
          expect(tour).toEqual(
            expect.objectContaining({
              tourId: expect.any(Number),
              tourCode: expect.any(Number),
              tourName: expect.any(String),
              tourDescription: expect.any(String),
              tourImage: expect.any(String),
              tourSites: expect.any(Array),
            })
          );
        });
      });
  });

  test("should return corresponding associated tours by stated tour code", () => {
    return request(app)
      .get("/tours?tour_code=123456")
      .expect(200)
      .then(({ body }) => {
        const tours = body;
        expect(tours).toBeInstanceOf(Array);
        expect(tours).toHaveLength(1);
        tours.forEach((tour) => {
          expect(tour).toEqual(
            expect.objectContaining({
              tourId: expect.any(Number),
              tourCode: 123456,
              tourName: expect.any(String),
              tourDescription: expect.any(String),
              tourImage: expect.any(String),
              tourSites: expect.any(Array),
            })
          );
        });
      });
  });

  test("should post a new tour into site db, status 201", () => {
    return request(app)
      .post("/tours")
      .send({
        authorId: 1,
        tourName: "A Medium Tour of Durham",
        tourDescription: "A medium tour of historic Durham",
        tourImage:
          "https://myguideimages.s3.eu-west-2.amazonaws.com/durham_cathedral.jpg",
        tourSites: [1, 2, 3],
      })
      .expect(201)
      .then(({ body }) => {
        const tours = body;
        expect(tours).toBeInstanceOf(Object);
        expect(tours).toEqual(
          expect.objectContaining({
            tourId: expect.any(Number),
            tourCode: expect.any(Number),
            authorId: 1,
            tourName: "A Medium Tour of Durham",
            tourDescription: "A medium tour of historic Durham",
            tourImage:
              "https://myguideimages.s3.eu-west-2.amazonaws.com/durham_cathedral.jpg",
            tourSites: [1, 2, 3],
          })
        );
      });
  });

  test("should return a status 404 when passed an Author ID with no associated tours", () => {
    return request(app)
      .get("/tours?author_id=23")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Author ID does not exist");
      });
  });

  test("should return a status 400 when passed an invalid input", () => {
    return request(app)
      .get("/tours?author_id=dsahk")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });

  test("should return status 404 when passed a tour code with no associated tours", () => {
    return request(app)
      .get("/tours?tour_code=123452")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Tour code does not exist");
      });
  });

  test("should return status 400 when passed an invalid tour code", () => {
    return request(app)
      .get("/tours?tour_code=banana")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });

  test("should return status 400 when missing info on posted site", () => {
    return request(app)
      .post("/tours")
      .send({
        authorId: 1,
        tourDescription: "A small tour of historic Durham",
        tourImage:
          "https://myguideimages.s3.eu-west-2.amazonaws.com/durham_cathedral.jpg",
        tourSites: [1, 2],
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Missing Input Information!");
      });
  });

  test("should return status 400 when given incorrect data on tours posting", () => {
    return request(app)
      .post("/tours")
      .send({
        authorId: 1,
        tourName: 123,
        tourDescription: "A small tour of historic Durham",
        tourImage:
          "https://myguideimages.s3.eu-west-2.amazonaws.com/durham_cathedral.jpg",
        tourSites: [1, 2],
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input information!");
      });
  });

  test("should return status 404 when accessing an invalid endpoint", () => {
    return request(app)
      .get("/maps")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Endpoint does not exist");
      });
  });
});

describe("Testing tours endpoint with specified tour_ids", () => {
  test("should return status 200 and the tour with corresponding tourId", () => {
    return request(app)
      .get("/tours/1")
      .expect(200)
      .then(({ body }) => {
        const tour = body[0];
        expect(tour).toEqual(
          expect.objectContaining({
            tourId: 1,
            authorId: 1,
            tourCode: 123456,
            tourName: "Tour of Durham",
            tourDescription: "A tour of historic Durham",
            tourImage:
              "https://myguideimages.s3.eu-west-2.amazonaws.com/durham_cathedral.jpg",
            tourSites: [1, 2, 3, 4],
          })
        );
      });
  });

  test("should return status 204 and no body for deleted tour", () => {
    return request(app)
      .delete("/tours/1")
      .expect(204)
      .then(() => {
        return request(app)
          .get("/tours")
          .expect(200)
          .then(({ body }) => {
            expect(body).toBeInstanceOf(Array);
            expect(body).toHaveLength(4);
          });
      });
  });

  test("should return status 200 and updated tour for patch request", () => {
    const update = {
      tourCode: 555555,
      tourName: "test name",
      tourDescription: "test description",
    };
    return request(app)
      .patch("/tours/1")
      .send(update)
      .expect(200)
      .then(({ body }) => {
        const tour = body[0];
        expect(tour).toEqual(
          expect.objectContaining({
            tourId: 1,
            authorId: 1,
            tourCode: 555555,
            tourName: "test name",
            tourDescription: "test description",
            tourImage:
              "https://myguideimages.s3.eu-west-2.amazonaws.com/durham_cathedral.jpg",
            tourSites: [1, 2, 3, 4],
          })
        );
      });
  });

  test("should return a status 404 for GET when passed an tour ID with no associated tours", () => {
    return request(app)
      .get("/tours/999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Tour does not exist");
      });
  });

  test("should return a status 400 for GET when passed an invalid input", () => {
    return request(app)
      .get("/tours/one")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });

  test("should return a status 404 for DELETE when passed a non existant tour ID", () => {
    return request(app)
      .delete("/tours/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Tour does not exist");
      });
  });

  test("should return a status 400 for delete when passed a invalid body", () => {
    return request(app)
      .patch("/tours/1")
      .send({ tourCode: "onetwothree" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      });
  });

  test("should return status 400 when passed a body with both valid and invalid values AND the tour should remain unchaed", () => {
    return request(app)
      .patch("/tours/1")
      .send({ tourName: "New Tour", tourCode: "onetwothree" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      })
      .then(() => {
        return request(app)
          .get("/tours/1")
          .expect(200)
          .then(({ body }) => {
            const tour = body[0];
            expect(tour).toEqual(
              expect.objectContaining({
                tourId: 1,
                authorId: 1,
                tourCode: 123456,
                tourName: "Tour of Durham",
                tourDescription: "A tour of historic Durham",
                tourImage:
                  "https://myguideimages.s3.eu-west-2.amazonaws.com/durham_cathedral.jpg",
                tourSites: [1, 2, 3, 4],
              })
            );
          });
      });
  });
});

describe("Testing the site/:site_id endpoints", () => {
  test("should return specified site when correct id entered ", () => {
    return request(app)
      .get("/sites/1")
      .expect(200)
      .then(({ body }) => {
        expect(body[0]).toEqual(
          expect.objectContaining({
            authorID: 1,
            siteName: "Durham Cathedral",
            siteDescription: "This is Durham Cathedral",
            siteImage:
              "https://myguideimages.s3.eu-west-2.amazonaws.com/durham_cathedral.jpg",
            siteAddress: "Durham DH1 3EH",
            latitude: 54.773678472624034,
            longitude: -1.5762204386383316,
            contactInfo: "0191 338 7178",
            websiteLink: "https://www.durhamcathedral.co.uk/",
          })
        );
      });
  });

  test("should patch/update an existing site's details where stated", () => {
    return request(app)
      .patch("/sites/1")
      .send({ siteName: "Manchester Cathedral" })
      .expect(200)
      .then(({ body }) => {
        expect(body[0]).toEqual(
          expect.objectContaining({
            authorID: 1,
            siteName: "Manchester Cathedral",
            siteDescription: "This is Durham Cathedral",
            siteImage:
              "https://myguideimages.s3.eu-west-2.amazonaws.com/durham_cathedral.jpg",
            siteAddress: "Durham DH1 3EH",
            latitude: 54.773678472624034,
            longitude: -1.5762204386383316,
            contactInfo: "0191 338 7178",
            websiteLink: "https://www.durhamcathedral.co.uk/",
          })
        );
      });
  });

  test("should return status 204 for when specified site has been deleted", () => {
    return request(app)
      .delete("/sites/1")
      .expect(204)
      .then(() => {
        return request(app)
          .get("/sites")
          .expect(200)
          .then(({ body }) => {
            expect(body).toBeInstanceOf(Array);
            expect(body).toHaveLength(17);
          });
      });
  });

  test("should return a status 400 when passed an invalid input", () => {
    return request(app)
      .get("/sites/ewqrewr")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });

  test("should return a status 404 when passed an Site ID that does not exist", () => {
    return request(app)
      .get("/sites/23")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Site ID does not exist");
      });
  });

  test("when given a delete request it should return a status 404 when passed a non existent Site ID", () => {
    return request(app)
      .delete("/sites/2837")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Site ID does not exist");
      });
  });

  test("should return a status 400 when passed a invalid body for a patch request", () => {
    return request(app)
      .patch("/sites/1")
      .send({ authorID: "hellohello" })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Input");
      });
  });

  test("should receive a status 400 when valid and invalid values are passed, leaving the site unchanged", () => {
    return request(app)
      .patch("/sites/1")
      .send({ authorID: 1, latitude: "wassupeveryone" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      })
      .then(() => {
        return request(app)
          .get("/sites/1")
          .expect(200)
          .then(({ body }) => {
            const site = body[0];
            expect(site).toEqual(
              expect.objectContaining({
                authorID: 1,
                siteName: "Durham Cathedral",
                siteDescription: "This is Durham Cathedral",
                siteImage:
                  "https://myguideimages.s3.eu-west-2.amazonaws.com/durham_cathedral.jpg",
                siteAddress: "Durham DH1 3EH",
                latitude: 54.773678472624034,
                longitude: -1.5762204386383316,
                contactInfo: "0191 338 7178",
                websiteLink: "https://www.durhamcathedral.co.uk/",
              })
            );
          });
      });
  });
});

describe("Sorting and ordering queries for /tours", () => {
  test("Tours are returned in descending order of updatedAt by default", () => {
    return request(app)
      .get("/tours")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("updatedAt", { descending: true });
      });
  });

  test("Tours can be sorted by tourName", () => {
    return request(app)
      .get("/tours?sort_by=tourName")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("tourName", { descending: true });
      });
  });

  test("Tours can be sorted by tourCode", () => {
    return request(app)
      .get("/tours?sort_by=tourCode")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("tourCode", { descending: true });
      });
  });

  test("Tours can be sorted in ascending order of updatedAt", () => {
    return request(app)
      .get("/tours?order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("updatedAt", { descending: false });
      });
  });

  test("Tours can be sorted in reverse alphabetical order for tourName", () => {
    return request(app)
      .get("/tours?sort_by=tourName&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("tourName", { descending: false });
      });
  });

  test("Tours can be sorted in ascending order by tourCode", () => {
    return request(app)
      .get("/tours?sort_by=tourCode&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("tourCode", { descending: false });
      });
  });

  test("Tours can be sorted in ascending order by createdAt", () => {
    return request(app)
      .get("/tours?sort_by=createdAt&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("createdAt", { descending: false });
      });
  });

  test("Returns a 400 status code and error message when sort_by query is invalid", () => {
    return request(app)
      .get("/tours?sort_by=age")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort by query");
      });
  });

  test("Returns a 400 status code and error message when order query is invalid", () => {
    return request(app)
      .get("/tours?order=age")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order query");
      });
  });
});

describe("Sorting and ordering queries for /sites", () => {
  test("Sites are returned in descending order of updatedAt by default", () => {
    return request(app)
      .get("/sites")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("updatedAt", { descending: true });
      });
  });

  test("Sites can be sorted by siteName", () => {
    return request(app)
      .get("/sites?sort_by=siteName")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("siteName", { descending: true });
      });
  });

  test("Sites can be sorted in ascending order of updatedAt", () => {
    return request(app)
      .get("/sites?order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("updatedAt", { descending: false });
      });
  });

  test("Sites can be sorted in reverse alphabetical order for siteName", () => {
    return request(app)
      .get("/sites?sort_by=siteName&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("siteName", { descending: false });
      });
  });

  test("Returns a 400 status code and error message when sort_by query is invalid", () => {
    return request(app)
      .get("/sites?sort_by=age")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort by query");
      });
  });

  test("  Returns a 400 status code and error message when order query is invalid", () => {
    return request(app)
      .get("/sites?order=age")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order query");
      });
  });
});
