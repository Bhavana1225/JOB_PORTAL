const express = require("express");
const router = express.Router();
const multer = require("multer");
const { applyJob, getUserApplications, updateApplication, deleteApplication } = require("../controllers/applicationController");
const { protect } = require("../middleware/authmiddleware");

// Multer config for resume upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Apply to job
router.post("/:jobId/apply", protect, upload.single("resume"), applyJob);

// Get applications of logged-in user
router.get("/user", protect, getUserApplications);

// Update application
router.put("/:applicationId", protect, upload.single("resume"), updateApplication);

// Delete application
router.delete("/:applicationId", protect, deleteApplication);

module.exports = router;
