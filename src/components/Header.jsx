import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "../features/cart/cartSlice";
import { selectIsLoading } from "../features/loading/loadingSlice";

const Header = ({ handleOpenModalCart }) => {
  const cartTotalItems = useSelector(selectCartTotalItems);
  const isLoading = useSelector(selectIsLoading);
  return (
    <header className="bg-blue-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-3xl font-bold text-gray-100">Redux e-Commerce</h1>
          <button
            type="button"
            className="relative rounded-full bg-blue-800 p-2 text-gray-100"
            onClick={handleOpenModalCart}
          >
            <ShoppingCartIcon className="w-6 h-6" />

            {cartTotalItems > 0 ? (
              <span className="rounded-full absolute text-xs -top-2 -right-2 font-medium w-6 h-6 text-white flex items-center justify-center bg-red-500">
                {cartTotalItems}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
