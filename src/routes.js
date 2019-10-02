const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

// Importando controllers
const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/BookingController");

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

module.exports = routes;
