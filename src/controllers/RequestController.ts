import { Request, Response } from "express";
import urlParse from "url-parse";
import validUrl from "valid-url";

import RequestUtil from "../util/RequestUtil";

export default class RequestController {

    constructor(
        private request: Request,
        private response: Response,
        private pretty: boolean
    ) {}

    private parseParams() {
        const headers = Object.assign({}, this.request.headers);
        delete headers["host"];
        const body = Buffer.isBuffer(this.request.body) ? this.request.body : null;        
        return {
            method: this.request.method,
            url: this.request.originalUrl.slice(this.pretty ? 8 : 1),
            headers,
            body
        };
    }

    handleRequest(): Promise<{ success: boolean, error?: string }> {
        const params = this.parseParams();
        
        if (!validUrl.isWebUri(params.url))
            return Promise.resolve({ success: false, error: "Invalid url" });

        if (this.request.get("host") === urlParse(params.url).host)
            return Promise.resolve({ success: false, error: "Can't make a request to itself" });

        return RequestUtil.fetchUrl(params.url, params.method, params.headers, params.body)
            .then(async resp => {
                let body = null;
                const host = urlParse(resp.url).origin;
                const headers = RequestUtil.parseFetchHeaders(resp.headers);
                this.response.set(headers);
                this.response.status(resp.status);
                if (this.pretty && headers["content-type"] && headers["content-type"].startsWith("text/html")) {
                    body = await resp.text();
                    body = RequestUtil.injectReplacerScript(host, body);
                    this.response.send(body);
                    return { success: true };
                }

                resp.body.pipe(this.response);
                return { success: true };
            })
            .catch(err => {
                return { success: false, error: err.message };
            });
    }

}