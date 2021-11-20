import { Router } from "express";
import { destinationRequest } from "../../controlers/api/destinationRequest";
import { callWikiApi } from "../../middleware/wikiApi/callWikiApi";

const router = Router();

router.use(
    "/api/destination",
    callWikiApi,
    destinationRequest, 
);

export const apiRoutes = router;