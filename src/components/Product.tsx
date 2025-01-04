import { addToCart, removeFromCart } from "@/features/cart/cartSlice";
import { ProductsInTheCart } from "@/types/products";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import StartIcon from "@/icons/StartIcon";
import { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "@/features/products/productsSlice";
import ReviewList from "./ReviewList";

function Product() {
  const cart = useSelector(
    (state: { cart: { items: ProductsInTheCart[] | [] } }) => state.cart.items,
  );

  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  const dispatch = useDispatch();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error loading product</h1>;
  }

  const {
    id,
    title,
    images,
    description,
    rating,
    price,
    sku,
    reviews,
    discountPercentage,
  } = product;

  return (
    <main className="mx-auto mb-20 flex min-h-[95vh] w-full max-w-[1150px] flex-col px-3 pt-4 lg:mb-10">
      <div className="lg:hidden">
        <h1 className="text-3xl font-bold">{title}</h1>
        <small>{sku}</small>
      </div>

      <div className="flex flex-col gap-2 lg:mb-5 lg:flex-row">
        <img
          src={images[0]}
          alt={`Image of ${title}`}
          className="object-container object max-h-[500px] w-full max-w-[600px] lg:mr-3"
        />

        <div className="grid place-content-center gap-4">
          <div className="hidden lg:block">
            <h1 className="mb-2 text-4xl font-bold">{title}</h1>
            <small className="text-lg font-light">{sku}</small>
          </div>

          <div className="mb-2 flex items-center justify-end gap-2 lg:justify-start">
            <p className="flex self-center text-[18px] font-semibold lg:text-xl">
              {parseFloat(rating.toString().slice(0, -1))}
            </p>
            <div className="flex">
              <div className="mb-2 flex">
                {Array.from({ length: Math.round(Number(rating)) }).map((_, index) => (
                  <StartIcon key={`rating-${index}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-5 flex gap-4 text-2xl font-bold tracking-wider lg:mb-0 lg:text-3xl">
            <p>{price}</p>
            {Math.floor(discountPercentage) > 5 ? (
              <p className="text-red-600">-%{Math.floor(discountPercentage)}</p>
            ) : null}
          </div>

          <div className="mb-6 flex items-center gap-3">
            <button
              className="rounded border border-transparent bg-teal-900 px-3 py-1 lg:text-xl font-semibold tracking-wide text-white"
              onClick={() => dispatch(addToCart({ product, id }))}
            >
              Add
            </button>
            {cart.map((item) => {
              if (item.id === id) {
                return (
                  <div key={id} className="flex gap-3 items-center">
                    <p className="min-w-8 border-b text-center lg:text-2xl">
                      {item.count}
                    </p>
                    <button
                      onClick={() => dispatch(removeFromCart({ product, id }))}
                      className="rounded border border-red-700 px-3 py-1 tracking-wide lg:text-xl"
                    >
                      Remove
                    </button>
                  </div>
                );
              }
            })}
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold lg:text-2xl">
              Description
            </h3>
            <p className="mb-4 text-lg">{description}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xl font-semibold lg:mb-6 lg:text-2xl">
          Reviews
        </h3>
        <ReviewList reviews={reviews} />
      </div>
    </main>
  );
}

export default Product;