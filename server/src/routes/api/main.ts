import { Router } from "express";
import { destinationRequest } from "../../controlers/api/destinationRequest";
import { saveDestinationInDb } from "../../middleware/saveDestinationInDb";
import { callWikiApi } from "../../middleware/wikiApi/callWikiApi";

const router = Router();

router.post("/api/destination",
    destinationRequest,
    callWikiApi,
    saveDestinationInDb
);

export const apiRoutes = router;