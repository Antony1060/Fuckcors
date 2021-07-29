import supertest from "supertest";

import app from "../../src/app";

describe("CORS", () => {
    it("allows every origin", (done) => {
        supertest(app)
            .get("/")
            .expect("Access-Control-Allow-Origin", "*")
            .expect(200, done);
    });
});