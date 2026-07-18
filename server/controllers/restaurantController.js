const Restaurant = require("../models/Restaurant");

const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      message: "Restaurant Created Successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getRestaurants = async (req, res) =>  {
    try{
        const restaurants = await Restaurant.find();

        res.status(200).json(restaurants);

    } catch (error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if(!restaurant) {
      return

      res.status(404).json({
        message: "Restaurant not found",
      });
    }

    restaurant.name = req.body.name || restaurant.name;
    restaurant.address = req.body.address || restaurant.address;
    restaurant.phone = req.body.phone || restaurant.phone;

    if(req.file){
      restaurant.logo = req.file.path;
    }

    await restaurant.save();

    res.status(200).json({
      message: "Restaurant Updated Successfully",
      restaurant,
    });
  } catch (error){
    res.status(500).json({
      message: error.message,
    });
  }
};

const toggleRestaurantStatus = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if(!restaurant) {
      return 
      res.status(404).json({
        message:"Restaurant not found"
      });
    }

    restaurant.isOpen = ! restaurant.isOpen;

    await restaurant.save();

    res.json({
      message: "Restaurant Status updated",
      isOpen: restaurant.isOpen,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  toggleRestaurantStatus,
  updateRestaurant,
};