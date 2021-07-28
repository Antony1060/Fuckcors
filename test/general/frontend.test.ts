import { promises as fs } from "fs"
import supertest from "supertest";

import app from "../../src/app";

describe("FRONTEND", () => {
    it("should return a static html file", (done) => {
        supertest(app)
            .get("/")
            .expect(200, async (err, res) => {
                if(err) return done(err);
                expect(res.text)
                    .toEqual(await fs.readFile("public/index.html", { encoding: "utf-8" }));
                done();
            })
    });

    it("should grab assets", (done) => {
        supertest(app)
            .get("/assets/style.css")
            .expect(200, async (err, res) => {
                if(err) return done(err);
                expect(res.text)
                    .toEqual(await fs.readFile("public/assets/style.css", { encoding: "utf-8" }));
                done()
            })
    })
})