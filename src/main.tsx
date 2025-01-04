import "./main.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import store from "./app/store";
// Supports weights 100-900
import "@fontsource-variable/onest";
import { lazy, Suspense } from "react";

import App from "@/components/App";
import Header from "./components/Header";

const Product = lazy(() => import("./components/Product"));
const SearchPage = lazy(() => import("./components/SearchPage"));
const Cart = lazy(() => import("./components/Cart"));

function Footer() {
  return (
    <footer className="mt-5 flex flex-col gap-2 border-t-2 bg-teal-900 py-5 text-center text-lg text-white">
      <p className="font-semibold tracking-wide">Unimart</p>
      <p>
        Website created by{" "}
        <a href="https://github.com/Albert0Luna" target="_blank" className="font-semibold tracking-wide">
          Alberto Luna
        </a>
      </p>
    </footer>
  );
}

type Container = HTMLElement | null;

const container: Container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:productId" element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <Product />
            </Suspense>
          } />
          <Route path="cart" element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <Cart />
            </Suspense>
          } />
          <Route path="/search" element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <SearchPage />
            </Suspense>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>,
  );
} else {
  alert("The entry point of the web was not found");
}
