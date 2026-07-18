const express = require("express")
const router = express.Router();

const { createMenu, getMenuByRestaurant, getMenuById, getAllMenus, deleteMenu, updateMenu } = require("../controllers/menuController");

const upload = require("../middleware/upload");

router.post("/",
    upload.single("image"),
    createMenu);

router.get("/", getAllMenus);
 
router.get("/:restaurantId", getMenuByRestaurant);

router.get("/item/:id", getMenuById);

router.put("/:id",
    upload.single("image"),
    updateMenu);

router.delete("/:id",deleteMenu);

module.exports = router;