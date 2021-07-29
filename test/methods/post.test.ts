import FormData from "form-data";
import fs from "fs";

import { buildRequests } from "../util/common";

describe("POST", () => {
    it("without form data", async () => {
        const [server, app] = await buildRequests("post");

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(200);
    });

    it("with status code 400", async () => {
        const [server, app] = await buildRequests("post", (test) => test.query({
            "__status": 400
        }));

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(400);
    });

    it("with multipart/form-data", async () => {
        const formData = new FormData();
        formData.append("key", "value");
        const [server, app] = await buildRequests("post", (test) => test
            .set("Content-Type", "multipart/form-data")
            .send(formData.getBuffer()));

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(200);
    });


    it("with x-www-form-urlencoded", async () => {
        const [server, app] = await buildRequests("post", (test) => test.send("key=value"));

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(200);
    });


    it("with plain text", async () => {
        const [server, app] = await buildRequests("post", (test) => test.send("raw content").type("text/plain"));

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(200);
    });


    it("with file", async () => {
        const formData = new FormData();
        formData.append("file", fs.readFileSync("README.md"));
        const [server, app] = await buildRequests("post", (test) => test
            .set("Content-Type", "multipart/form-data")
            .send(formData.getBuffer()));

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(200);
    });
});