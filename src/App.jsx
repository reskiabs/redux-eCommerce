import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CartModal from "./features/cart/CartModal";
import ProductList from "./features/productlist/ProductList";

export default function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModalCart = () => {
    setIsOpenModal(true);
  };

  const handleCloseModalCart = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      {isOpenModal ? (
        <CartModal handleCloseModalCart={handleCloseModalCart} />
      ) : null}
      <Header handleOpenModalCart={handleOpenModalCart} />
      <main className="max-w-7xl mx-auto px-4">
        <ProductList />
      </main>
    </>
  );
}
