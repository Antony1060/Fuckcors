import { Request, Response, Router } from "express";

import RequestController from "../controllers/RequestController";
import HttpUtil from "../util/HttpUtil";
import { Levels, log } from "../util/log";

const router = Router();

router.all("*", async (req: Request, res: Response) => {
    const pretty = req.originalUrl.startsWith("/pretty/"); // if url is https://fuckcors.app/pretty/{url}
    const http = new HttpUtil(res);
    const controller = new RequestController(req, res, pretty);

    const result = await controller.handleRequest();
    if(!result.success) {
        log(Levels.DEBUG, `Request faild for ${result?.error}`);
        return http.respondBadRequest(result);
    }
});

export default router;