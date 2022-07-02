import { Router } from "express";
import { destinationListRequest } from "../../controlers/api/destinationListRequest";
import { destinationRequest } from "../../controlers/api/destinationRequest";
import { callPositionstackApi } from "../../middleware/callPositionstackApi";
import { combinedDestinationsRequest } from "../../middleware/combinedDestinationsListsRequest";
import { resendDestinationRequest } from "../../middleware/resendDestinationRequest";
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
    callPositionstackApi,
    saveDestinationInDb
);

router.post("/api/destination-resend",
    resendDestinationRequest
)

export const apiRoutes = router;