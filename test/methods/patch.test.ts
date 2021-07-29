import { buildRequests } from "../util/common";

describe("PATCH", () => {
    it("with stauts code 200", async () => {
        const [server, app] = await buildRequests("patch");

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(200);
    });

    it("with status code 400", async () => {
        const [server, app] = await buildRequests("patch", (test) => test.query({
            "__status": 400
        }));

        expect(app).toBeSimilarTo(server);
        expect(app).withHttpStatus(400);
    });
});