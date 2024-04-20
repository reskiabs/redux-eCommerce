import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { addItemToCart } from "../cart/cartSlice";
import { selectIsLoading, setLoading } from "../loading/loadingSlice";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [sortProducts, setSortProducts] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, [sortProducts]); // Trigger fetchProducts when sortProducts changes

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      let apiUrl = `https://fakestoreapi.com/products?sort=${sortProducts}`;

      // Append category filter if a category is selected
      if (selectedCategory !== "all") {
        apiUrl = `https://fakestoreapi.com/products/category/${selectedCategory}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClickBuy = (product) => {
    dispatch(addItemToCart(product));
  };

  const sortProductList = (type) => {
    let sortedProducts = [...products]; // Create a copy of products array

    if (type === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price); // Sort by price low to high
    } else if (type === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price); // Sort by price high to low
    }

    // Filter by search term
    sortedProducts = sortedProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by selected category
    if (selectedCategory !== "all") {
      sortedProducts = sortedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    return sortedProducts;
  };

  const filteredProductList = sortProductList(sortProducts);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-x-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              onChange={(e) => setSortProducts(e.target.value)}
              value={sortProducts}
            >
              <option value="all">All Product</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
              <option value="high-to-low">Price High to Low</option>
              <option value="low-to-high">Price Low to High</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Category</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's clothing</option>
              <option value="women's clothing">Women's clothing</option>
            </select>
          </div>
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-6 gap-4">
            {filteredProductList.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border shadow p-4 w-full"
              >
                <div className="relative group w-[80%] h-[300px] mx-auto overflow-hidden">
                  <img
                    className="w-full h-full group-hover:scale-110 transition-all duration-500 ease-in-out object-contain"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <div className="flex flex-col gap-3 mt-8">
                  <button
                    type="button"
                    className="bg-blue-700 text-white hover:bg-blue-600 rounded-lg text-sm py-3 px-8"
                    onClick={() => handleClickBuy(product)}
                  >
                    BUY NOW
                  </button>
                  <h3 className="font-bold">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="border rounded-full px-2.5 text-blue-700 text-sm font-medium capitalize border-blue-600 bg-blue-50">
                      {product.category}
                    </span>
                    <div className="flex gap-2 items-center">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <h4 className="font-semibold text-neutral-700">
                        {product.rating.rate}
                      </h4>
                    </div>
                  </div>
                  <h3 className="tabular-nums text-lg font-semibold text-gray-700">
                    ${product.price}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
