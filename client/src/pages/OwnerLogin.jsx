import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OwnerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://qr-menu-oxgp.onrender.com/api/owner/login",
        formData
      );

      console.log(res.data);

      localStorage.setItem("ownerToken", res.data.token);
      localStorage.setItem("restaurantId", res.data.owner.restaurantId);
      console.log("restaurantId=",res.data.owner.restaurantId);

      alert("Login Successful");

      navigate("/owner/dashboard");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg p-6 rounded-xl w-96"
      >
        <h1 className="text-3xl font-bold mb-5">
          Restaurant Owner Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default OwnerLogin;