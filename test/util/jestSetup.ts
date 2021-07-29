import { Response } from "supertest";

import { modifyFields } from "./common";

jest.setTimeout(60000);
jest.spyOn(console, "log").mockImplementation(() => {});

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeSimilarTo(other: Response): R
            toMatchContent(other: Response): R
            withHttpStatus(statusCode: number): R
        }
    }
}

expect.extend({
    toBeSimilarTo(recieved: Response, other: Response): jest.CustomMatcherResult {
        const sourceParsed = modifyFields(JSON.parse(recieved.text));
        const otherParsed = modifyFields(JSON.parse(other.text));
        
        return recieved !== other && recieved.statusCode === other.statusCode && this.equals(sourceParsed, otherParsed) ?
            {
                pass: true,
                message: () => "Requests should not mostly match."
            } :
            {
                pass: false,
                message: () => `Requests should mostly match. (recieved status=${recieved.statusCode} expected status=${other.statusCode})`
            };
    },
    
    toMatchContent(recieved: Response, other: Response): jest.CustomMatcherResult {
        return (recieved.body as Buffer).length > 0 && Buffer.compare((recieved.body as Buffer), (other.body as Buffer)) == 0 ?
            {
                pass: true,
                message: () => "Request content should not match."
            } :
            {
                pass: false,
                message: () => `Request content should match. (recieved status=${recieved.statusCode} expected status=${other.statusCode})`
            };
    },

    withHttpStatus(recieved: Response, statusCode: number): jest.CustomMatcherResult {
        return recieved.statusCode === statusCode ?
            {
                pass: true,
                message: () => `Request should not return with status code '${statusCode}'`
            } :
            {
                pass: false,
                message: () => `Request should return with status code '${statusCode}'`
            };
    }
});