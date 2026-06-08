import { Router } from "express";

import {
  createApplication,
  getApplications,
  updateApplicationStatus,
  getSummary,
} from "../controllers/applicationController.js"

import { validateApplication } from "../middleware/validateApplication.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server running",
  });
});

router.post(
  "/applications",
  validateApplication,
  createApplication
);

router.get(
  "/applications",
  getApplications
);

router.patch(
  "/applications/:id/status",
  updateApplicationStatus
);

router.get(
  "/summary",
  getSummary
);



export default router;