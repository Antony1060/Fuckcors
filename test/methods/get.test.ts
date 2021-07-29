import { buildConentRequests, buildRequests } from "../util/common";

describe("GET", () => {

    it("without query paramaters", async () => {
        const [server, app] = await buildRequests("get");

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(200);
    });

    it("with status code 400", async () => {
        const [server, app] = await buildRequests("get", (test) => test.query({
            "__status": 400
        }));

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(400);
    });

    it("with query paramaters", async () => {
        const [server, app] = await buildRequests("get", (test) => test.query({
            queryParam1: "queryValue1",
            queryParam2: "queryValue2"
        }));

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(200);
    });

    it("content (png)", async () => {
        const [server, app] = await buildConentRequests("fuckcors_sample.png");

        expect(app).toMatchContent(server);
        expect(app).withHttpStatus(200);
    });

    it("content (mp4)", async () => {
        const [server, app] = await buildConentRequests("fuckcors_sample.mp4");

        expect(app).toMatchContent(server);
        expect(app).withHttpStatus(200);
    });
});