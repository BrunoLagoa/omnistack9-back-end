const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

// Importando controllers
const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/BookingController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

const routes = express.Router();
const upload = multer(uploadConfig);

// Route Sessions
routes.post("/sessions", SessionController.store);

// Route Spot
routes.get("/spots", SpotController.index);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

// Route Dashboard
routes.get("/dashboard", DashboardController.show);

// Route Booking
routes.post("/spots/:spot_id/bookings", BookingController.store);

routes.post("/bookings/:booking_id/approvals", ApprovalController.store);
routes.post("/bookings/:booking_id/rejections", RejectionController.store);

module.exports = routes;
