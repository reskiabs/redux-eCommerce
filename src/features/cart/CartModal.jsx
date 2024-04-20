import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import {
  addItemToCart,
  reduceQuantity,
  removeItemFromCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
} from "./cartSlice";

const CartModal = ({ handleCloseModalCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleClickBuy = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleReduceQuantity = (product) => {
    dispatch(reduceQuantity(product));
  };
  const handleRemoveItemCart = (product) => {
    dispatch(removeItemFromCart(product));
  };

  const handleCheckout = () => {
    if (totalItems === 0) return;

    const phoneNumber = "6282195157186";
    const message = encodeURIComponent(
      `Halo, saya ingin membeli ${totalItems} barang dengan total harga: ${totalPrice} dollar.`
    );

    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(URL, "_blank");
  };

  return (
    <Modal>
      <div className="flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[900px]">
        <div className="flex flex-col gap-6 max-h-[500px] overflow-auto">
          {cartItems.map((product) => {
            return (
              <div
                key={product.id}
                className="w-full border-b border-gray-400 pb-4"
              >
                <div className="flex items-center w-full">
                  <div className="w-[120px] h-auto overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="ml-10 w-[75%]">
                    <h3 className="capitalize mt-3 text-lg">{product.title}</h3>
                    <h4 className="text-sm">${product.price}</h4>
                    <div className="flex items-center gap-4 mt-4 ml-auto">
                      <button
                        className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                        type="button"
                        onClick={() =>
                          product.quantity > 1
                            ? handleReduceQuantity(product)
                            : handleRemoveItemCart(product)
                        }
                      >
                        -
                      </button>
                      <h3>{product.quantity}</h3>
                      <button
                        className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                        type="button"
                        onClick={() => handleClickBuy(product)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h3 className="text-md font-bold">Total Items : {totalItems}</h3>
          <h3 className="text-md font-bold">Total Price : {totalPrice}</h3>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-slate-600 hover:bg-slate-700 px-8 py-2 rounded-lg text-sm text-white"
            type="button"
            onClick={handleCloseModalCart}
          >
            Close
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 px-8 py-2 font-bold rounded-lg text-sm text-white"
            type="button"
            onClick={handleCheckout}
          >
            Checkout (Whatsapp)
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
