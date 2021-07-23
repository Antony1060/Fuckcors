import { Response } from "express";

export default class HttpUtils {

    constructor(private response: Response) {}

    respondCode(code, json = {}) {
        this.response.status(code).json({
            status: code,
            ...json
        })
    }

    respondOk(json = {}) {
        return this.respondCode(200, json)
    }

    respondBadRequest(json = {}) {
        return this.respondCode(400, json)
    }

    respondServerError(json = {}) {
        return this.respondCode(500, json)
    }

}