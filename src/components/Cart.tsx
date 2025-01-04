import {
  addToCart,
  clearCart,
  removeFromCart,
} from "@/features/cart/cartSlice";
import { ProductsInTheCart } from "@/types/products";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const cart = useSelector(
    (state: { cart: { items: ProductsInTheCart[] | [] } }) => state.cart.items,
  );

  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <dialog open={openDialog} className="absolute inset-0 border w-10/12 lg:w-6/12 text-white bg-teal-900 border-none rounded-lg z-10">
        <div className="px-8 py-8 flex flex-col gap-3 text-lg">
          <h2 className="text-xl font-bold">Check your order</h2>
          <div>
            <p className="mb-2">Total items:
              <span className="ml-2 font-semibold">
                {cart.reduce((acc, item) => acc + item.count, 0)}
              </span>
            </p>
            <ul className="text-[15px] flex flex-col gap-1">
              {
                cart.map((product) => {
                  const { title, count, id } = product;
                  return (
                    <li key={id} className="lg:text-base">
                      <p>
                        {title} x {count}
                      </p>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div>
            <p>Total amount:
              <span className="ml-2 font-semibold">
                $ {cart.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}
              </span>
            </p>
          </div>
          <div className=" flex w-full self-center justify-between">
            <button
              onClick={() => {
                setOpenDialog(false);
                dispatch(clearCart());
              }}
              className="rounded text-white bg-orange-600 px-3 py-1 font-semibold tracking-wide w-fit "
            >
              Place order
            </button>
            <button
              onClick={() => setOpenDialog(false)}
              className="rounded text-white bg-red-800 px-3 py-1 font-semibold tracking-wide w-fit self-center"
            >
              Close
            </button>
          </div>
        </div>
      </dialog >
      <main className={
        `mx-auto mb-20 flex min-h-[95vh] w-full max-w-[1150px] flex-col px-3 pt-4 ${openDialog ? "blur-sm" : ""} relative z-0`

      }>

        <h1 className="mb-2 text-center text-3xl font-semibold">Cart</h1>
        <div className="flex flex-col items-center gap-4 mb-5">
          {cart.length ? (
            cart.map((product) => {
              const { title, count, id, thumbnail, amount } = product;
              return (
                <div key={id} className="flex lg:gap-3 gap-1 justify-center lg:w-[30rem] w-full">
                  <img
                    src={thumbnail}
                    alt={`Image of ${title}`}
                    className=" lg:h-36 lg:w-36 object-cover lg:mr-10 h-32 w-32"
                  />
                  <div className="flex flex-col gap-2 self-end flex-1 justify-center">
                    <h1 className="text-lg font-semibold">{title}</h1>
                    <p className="text-lg">
                      $ {amount.toFixed(2)}
                    </p>
                    <div className="mb-6 flex items-center gap-3">
                      <button
                        className="rounded border border-transparent bg-teal-900 px-3 py-1 font-semibold tracking-wide text-white"
                        onClick={() => dispatch(addToCart({ product, id }))}
                      >
                        Add
                      </button>
                      {cart.map((item) => {
                        if (item.id === id) {
                          return (
                            <div key={id} className="flex gap-3 items-center">
                              <p className="min-w-8 rounded border text-center text-xl">
                                {item.count}
                              </p>
                              <button
                                onClick={() =>
                                  dispatch(removeFromCart({ product, id }))
                                }
                                className="rounded border border-red-700 px-3 py-1 tracking-wide"
                              >
                                Remove
                              </button>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="m-auto flex h-full w-full items-center justify-center p-5 lg:text-xl">
              <h1 className="">No products in your cart</h1>
            </div>
          )}
        </div>
        {cart.length ? (
          <div className="flex justify-center gap-12">
            <button
              onClick={() => setOpenDialog(true)}
              className="w-auto rounded bg-teal-900 px-3 py-1 font-semibold tracking-wide text-white lg:text-lg"
            >
              Complete Purchase
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-auto rounded bg-red-700 px-3 py-1 font-semibold tracking-wide text-white lg:text-lg"
            >
              Clear cart
            </button>
          </div>
        ) : null}
      </main>
    </>

  );
}

export default Cart;
