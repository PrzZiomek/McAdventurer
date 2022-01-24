import { Router } from "express";
import { destinationListRequest } from "../../controlers/api/destinationListRequest";
import { destinationRequest } from "../../controlers/api/destinationRequest";
import { combinedDestinationsRequest } from "../../middleware/combinedDestinationsListsRequest";
import { saveDestinationInDb } from "../../middleware/saveDestinationInDb";
import { callWikiApi } from "../../middleware/wikiApi/callWikiApi";

const router = Router();

router.post("/api/destinationsList",
    destinationListRequest,
    combinedDestinationsRequest
);

router.post("/api/destination",
    destinationRequest,
    callWikiApi,
    saveDestinationInDb
);

export const apiRoutes = router;