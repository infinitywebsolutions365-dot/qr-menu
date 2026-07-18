const express = require("express")
const router = express.Router();
const upload = require("../middleware/upload");

const {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    toggleRestaurantStatus,
    updateRestaurant,
} = require("../controllers/restaurantController");

router.get("/",getRestaurants);

router.get("/:id",getRestaurantById);

router.post("/",createRestaurant);

router.put("/:id",
upload.single("logo"), updateRestaurant);

router.put("/toggle/:id", toggleRestaurantStatus);

module.exports = router;