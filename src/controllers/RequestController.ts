import { Request, Response } from 'express';
import urlParse from 'url-parse';
import validUrl from 'valid-url';

import RequestUtil from '../util/RequestUtil'

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
        }
    }

    handleRequest() {
        const params = this.parseParams();
        
        if (!validUrl.isWebUri(params.url))
            return { success: false, error: "Invalid url" }

        if (this.request.get("host") === urlParse(params.url).host)
            return { success: false, error: "Can't make a request to itself" }

        return RequestUtil.fetchUrl(params.url, params.method, params.headers, params.body)
            .then(async resp => {
                let body = null;
                const host = urlParse(resp.url).origin;
                const headers = RequestUtil.parseFetchHeaders(resp.headers);
                if (this.pretty && headers["content-type"] && headers["content-type"].startsWith("text/html")) {
                    body = await resp.text();
                    body = RequestUtil.injectReplacerScript(host, body);
                } else body = await resp.buffer()

                this.response.set(headers);
                this.response.status(resp.status).send(body);

                return { success: true }
            })
            .catch(err => {
                return { success: false, error: err.message }
            })
    }

}