import supertest, { Test } from 'supertest';
import app from '../../src/app'

let dumpUrl: string = "https://backend.antony.red/dump";
let contentUrl = "https://antony.cloud";

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

export function modifyFields(json: { [key: string]: any }) {
    // delete the `requestIp` because some ISPs don't give a static ip and tests might fail because of that
    delete json["requestIp"];

    // remove unnecessary headers
    for(const f of ["accept", "cf-ray", "user-agent", "x-forwarded-for", "cf-connecting-ip"])
        if(f in json["headers"])
            delete json["headers"][f]

    return json;
}