const Menu = require("../models/Menu");

const createMenu = async (req, res) => {
  try {
    const menu = await Menu.create({
      restaurantId: req.body.restaurantId,
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      vegType: req.body.vegType,
      isBestSeller: req.body.isBestSeller,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      message: "Menu Item Added Successfully",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMenuByRestaurant = async (req,res) => {
    try{
        const menus = await Menu.find({
            restaurantId:req.params.restaurantId,
        });

        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getAllMenus = async (req, res) => {
  try{
    const menus = await Menu.find().populate("restaurantId");

    res.status(200).json(menus);
  } catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);

    if (!menu) {
      return res.status(404).json({
        message: "Menu Item Not Found",
      });
    }

    res.status(200).json({
      message: "Menu Item Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        message: "Menu Item Not Found",
      });
    }

    menu.name = req.body.name || menu.name;
    menu.category = req.body.category || menu.category;
    menu.price = req.body.price || menu.price;
    menu.description = req.body.description || menu.description;
    menu.vegType = req.body.vegType || menu.vegType;
    menu.isBestSeller = req.body.isBestSeller || menu.isBestSeller;

    if (req.file) {
      menu.image = req.file.path;
    }

    await menu.save();

    res.status(200).json({
      message: "Menu Updated Successfully",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if(!menu) {
      return
      res.status(404).json({
        message: "Menu Item Not Found",
      });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMenu,
  getMenuByRestaurant,
  getMenuById,
  getAllMenus,
  deleteMenu,
  updateMenu,
};
