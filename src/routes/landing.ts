import { Request, Response, Router, static as serveStatic } from "express";
import { hostname } from "os";
import path from "path";

const router = Router();

router.use(serveStatic(path.join(__dirname, "/../../public")));

router.get("/", (req: Request, res: Response) => {
    if(process.env.KUBERNETES_SERVICE_HOST)
        res.header("Kubernetes-Pod", hostname());

    res.render("index", {
        dev: process.env.NODE_ENV === "dev",
        kube_pod: process.env.KUBERNETES_SERVICE_HOST ? hostname() : null,
        layout: false
    });
});

export default router;