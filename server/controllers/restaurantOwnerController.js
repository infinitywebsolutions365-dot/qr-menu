const RestaurantOwner = require("../models/RestaurantOwner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerOwner = async (req, res) => {
  try {
    const { name, email, password, restaurantId } = req.body;

    const ownerExists = await RestaurantOwner.findOne({ email });

    if (ownerExists) {
      return res.status(400).json({
        message: "Owner already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await RestaurantOwner.create({
      name,
      email,
      password: hashedPassword,
      restaurantId,
    });

    res.status(201).json({
      message: "Owner Registered Successfully",
      owner,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await RestaurantOwner.findOne({ email });

    if (!owner) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, owner.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: owner._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      owner,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerOwner,
  loginOwner,
};