import CartIcon from "@/icons/CartIcon";
import { ProductsInTheCart } from "@/types/products";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function Header() {
  const cart = useSelector(
    (state: { cart: { items: ProductsInTheCart[] | [] } }) => state.cart.items,
  );

  return (
    <header className="flex justify-between px-3 py-2 pt-4 lg:px-5 lg:pt-6">
      <Link to="/">
        <h1 className="text-center text-4xl font-semibold text-teal-900 lg:text-5xl">
          Uni<span className="text-orange-600">Mart</span>
        </h1>
      </Link>
      <Link to="cart" className="relative" data-testid="cartLink">
        <div>
          {cart.length > 0 && (
            <p className="absolute -top-2 right-0 min-w-6 rounded-full bg-orange-600 px-1 py-[.5px] text-center text-sm font-bold text-white">
              {cart.length}
            </p>
          )}
          <CartIcon />
        </div>
      </Link>
    </header>
  );
}

export default Header;
