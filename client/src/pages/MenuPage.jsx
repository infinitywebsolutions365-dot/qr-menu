import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MenuPage() {
  const { restaurantId } = useParams();

  const [menus, setMenus] = useState([]);

  const [restaurant, setRestaurant] = useState(null);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  

  useEffect(() => {
    fetchRestaurant();
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(
        `https://qr-menu-oxgp.onrender.com/api/menu/${restaurantId}`
      );

      setMenus(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRestaurant = async () => {
    try {
        const res = await axios.get(
            `https://qr-menu-oxgp.onrender.com/api/restaurants/${restaurantId}`
        );
        setRestaurant(res.data);
    } catch(error) {
        console.log(error);
    }
  };

  // const groupedMenus = menus.reduce((acc, item) => {
  //   if(!acc[item.category]) {
  //     acc[item.category] = [];
  //   }

  //   acc[item.category].push(item);

  //   return acc;
  // }, {});

  const categories = [
    "All",
    ...new Set(menus.map((item) => 
    item.category)),
  ];

  // const filteredMenus = menus.filter((item) => 
  
  // item.name.toLowerCase().includes(
  //   search.toLowerCase())
  // );

  const filteredMenus = menus.filter((item) => {
    const matchesSearch = item.name
    .toLowerCase()
    .includes(search.toLowerCase(

    ));

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const groupedMenus = filteredMenus.reduce((acc, item) => {
    if(!acc[item.category]) {
      acc[item.category] = [];
    }

    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-100 via-white to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {restaurant && (

            <div className="mb-8 bg-white rounded-2xl shadow-xl obrder border-gray-200 p-6">
              <div className="flex items-center gap-5">
                {restaurant?.logo && (
                  <img src={restaurant.logo} alt={restaurant.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 shadow-lg" />
                )}

                <div>
                  <h1 className="text-3xl font-extrabold text-gray-800">
                    {restaurant.name}
                  </h1>

                  <p className="text-gray-500 text-sm mt-1">
                    {restaurant.address}
                  </p>

                  <p className="text-orange-600 font-medium mt-1">
                    📞{restaurant.phone}
                  </p>
                </div>
              </div>

              <div className={`mt-6 p-4 rounded-xl text-center font-bold shadow-sm ${
                restaurant.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {restaurant.isOpen ? "🟢 Restaurant is Open" : "🔴 Restaurant is Closed"}
              </div>
            </div>
        )}

        <div className="mb-6">
          <input type="text" placeholder="Search menu..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-xl border border-gray-300 p-3 shadow-sm focu:ring-2 focus:ring-orange-400 focus:outline-none" />
        </div>

        <select value={selectedCategory}
        onChange={(e) => 
          setSelectedCategory(e.target.value)}
          className="w-full mt-4 bg-white rounded-xl border border-gray-300 p-3 shadow-sm">
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {Object.keys(groupedMenus).length === 0 ? (
  <div className="text-center py-16">
    <h2 className="text-2xl font-semibold text-gray-500">
      No Menu Items Found
    </h2>
  </div>
) : (
  Object.keys(groupedMenus).map((category) => (
    <div key={category} className="mb-10">
      <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-3 mb-5">
        {category}
      </h2>

      <div className="space-y-5">
        {groupedMenus[category].map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-4 flex flex-row justify-between items-center gap-4"
          >
            {/* Left */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    item.vegType === "Veg"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.vegType}
                </span>

                {item.isBestSeller && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
                    🔥 Bestseller
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-800 break-words">
                {item.name}
              </h3>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {item.description}
              </p>

              <p className="text-green-600 text-xl font-bold mt-3">
                ₹{item.price}
              </p>
            </div>

            {/* Right */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-lg flex-shrink-0"
            />
          </div>
        ))}
      </div>
    </div>
  ))
)}

      </div>
    </div>
  );
}

export default MenuPage;