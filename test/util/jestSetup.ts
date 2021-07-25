import { Response } from "supertest";
import { modifyFields } from "./common";

jest.setTimeout(60000)

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeSimilarTo(other: Response): R
            toHaveSameFormData(other: Response): R
            toMatchContent(other: Response): R
            withHttpStatus(statusCode: number): R
        }
    }
}

expect.extend({
    toBeSimilarTo(recieved: Response, other: Response): jest.CustomMatcherResult {
        return compareRequests(this, recieved, other, false)
    },

    toHaveSameFormData(recieved: Response, other: Response): jest.CustomMatcherResult {
        return compareRequests(this, recieved, other, true)
    },
    
    toMatchContent(recieved: Response, other: Response): jest.CustomMatcherResult {
        return Buffer.compare((recieved.body as Buffer), (other.body as Buffer)) == 0 ?
            {
                pass: true,
                message: () => "Request content should not match."
            } :
            {
                pass: false,
                message: () => `Request content should match. (recieved status=${recieved.statusCode} expected status=${other.statusCode})`
            }
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
            }
    }
})

function compareRequests(ctx: jest.MatcherContext, recieved: Response, other: Response, formData: boolean): jest.CustomMatcherResult {
    const sourceParsed = modifyFields(JSON.parse(recieved.text), formData);
    const otherParsed = modifyFields(JSON.parse(other.text), formData);
    
    return recieved !== other && recieved.statusCode === other.statusCode && ctx.equals(sourceParsed, otherParsed) ?
        {
            pass: true,
            message: () => "Requests should not mostly match."
        } :
        {
            pass: false,
            message: () => `Requests should mostly match. (recieved status=${recieved.statusCode} expected status=${other.statusCode})`
        }
}