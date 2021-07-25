import supertest, { Test } from 'supertest';
import app from '../../src/app'

export let dumpUrl: string = "https://httpdump.io/czbsw";
export let contentUrl = "https://antony.cloud";

const appRequest = supertest(app);
const dumpRequest = supertest(dumpUrl);
const conentRequest = supertest(contentUrl);

export type Method = "get" | "post" | "put" | "patch" | "delete";

export async function buildRequests(method: Method, mod: (test: Test) => Test = (test) => test) {
    const server = await mod(dumpRequest[method](""));
    const app = await mod(appRequest[method](`/${dumpUrl}`));

    return [server, app];
}

export async function buildConentRequests(content: string) {
    const server = await conentRequest.get(`/${content}`);
    const app = await appRequest.get(`/${contentUrl}/${content}`);

    return [server, app];
}

export function modifyFields(json: { [key: string]: any }, formData: boolean = false) {
    // remove unnecessary headers ones
    delete json["invoker_ip"];
    for(const f of ["Accept", "Cf-Ray", "User-Agent", "X-Forwarded-For", "Cf-Connecting-Ip"])
        if(f in json["headers"])
            delete json["headers"][f]

    if (formData)
        delete json["raw_post"];

    return json;
}