import { Response } from "express";

export default class HttpUtils {

    constructor(private response: Response) {}

    respondCode(code: number, json = {}): Response {
        return this.response.status(code).json({
            status: code,
            ...json
        });
    }

    respondOk(json = {}): Response {
        return this.respondCode(200, json);
    }

    respondBadRequest(json = {}): Response {
        return this.respondCode(400, json);
    }

    respondServerError(json = {}): Response {
        return this.respondCode(500, json);
    }

}