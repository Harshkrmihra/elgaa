const express = require("express");
const coachController = require("../controllers/coachController");
const auth = require("../middlewares/auth");
const {
  createCoachValidator,
  updateCoachValidator,
} = require("../middlewares/validators");
const { checkCoachOwnershipOrAdmin } = require("../middlewares/permissions");

const router = express.Router();

// Get all coaches
router.get("/", coachController.getAllCoaches);

// Get coach page by username
router.get("/@:username", coachController.getCoachByUsername);
// Get a coach by ID
router.get("/:id", coachController.getCoachById);

// Create a new coach
router.post("/", auth, createCoachValidator, coachController.createCoach);

// Get average rating for a specific coach
router.get("/:coachId/average-rating", coachController.getCoachAverageRating);

// Get coach level
router.get("/:id/level", coachController.getCoachLevel);

// Update coach info
router.put(
  "/:id",
  auth,
  updateCoachValidator,
  checkCoachOwnershipOrAdmin,
  coachController.updateCoach
);

// Get coach ID by email
router.get("/email/:email", auth, coachController.getCoachIdByEmail);

module.exports = router;
