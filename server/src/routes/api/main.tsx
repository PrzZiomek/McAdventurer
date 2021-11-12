import { Router } from "express";
import { destinationRequest } from "./destinationRequest";

const router = Router();

router.post("api/destination", destinationRequest);

export const apiRoutes = router;