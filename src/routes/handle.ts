import { Router, Request, Response } from "express";

import RequestController from '../controllers/RequestController'
import HttpUtil from '../util/HttpUtil'

const router = Router()

router.all("*", async (req: Request, res: Response) => {
    const pretty = req.originalUrl.startsWith("/pretty/"); // if url is https://fuckcors.app/pretty/{url}
    const http = new HttpUtil(res);
    const controller = new RequestController(req, res, pretty);

    const result = await controller.handleRequest();
    if(!result.success)
        return http.respondBadRequest(result);
});

export default router;