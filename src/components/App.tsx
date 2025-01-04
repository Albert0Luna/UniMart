import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Product, ProductsInTheCart } from "@/types/products.js";
import { Link } from "react-router";
import CloseIcon from "@/icons/CloseIcon.js";

import Filter from "./Filter.js";
import OrderBy from "./OrderBy.js";
import Search from "./Search.js";
import { useGetAllProductsQuery } from "@/features/products/productsSlice.js";

function App() {

  // Counter from redux store
  const cart = useSelector(
    (state: { cart: { items: ProductsInTheCart[] | [] } }) => state.cart.items,
  );

  const { data, error, isLoading } = useGetAllProductsQuery('');
  const [originalProducts, setOriginalProducts] = useState<Product[] | []>([]);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleOrderBy, setToggleOrderBy] = useState(false);

  useEffect(() => {
    if (data?.products) {
      setOriginalProducts(data.products);
      setProducts(data.products);
    }
  }, [data]);

  const handleControls = (control: string) => {
    if (control === "filter") {
      setToggleOrderBy(false);
      setToggleFilter(!toggleFilter);
    } else if (control === "order by") {
      setToggleFilter(false);
      setToggleOrderBy(!toggleOrderBy);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Failed to load products</h1>;
  }

  if (!products) {
    return <h1>The products were not found</h1>;
  }

  return (
    <main className="mx-auto mb-20 flex min-h-[95vh] w-full max-w-[1150px] flex-col px-3 pt-4">
      <Search />
      <div className="mb-5 mt-6 flex w-full flex-col">
        <div className="flex w-full justify-end gap-3">
          <button
            data-testid="close-button"
            onClick={() => {
              setToggleFilter(false);
              setToggleOrderBy(false);
            }}
          >
            {toggleFilter || toggleOrderBy ? <CloseIcon /> : null}
          </button>
          <button
            data-testid="filter-button"
            className={`rounded-lg border border-sky-900 px-3 py-1 font-light tracking-wide transition hover:opacity-60 ${toggleFilter ? "border-transparent bg-sky-900 font-semibold text-white transition" : ""}`}
            onClick={() => handleControls("filter")}
          >
            Filters
          </button>
          <button
            data-testid='order-button'
            className={`rounded-lg border border-sky-900 px-3 py-1 font-light tracking-wide transition hover:opacity-60 ${toggleOrderBy ? "border-transparent bg-sky-900 font-semibold text-white transition" : ""}`}
            onClick={() => handleControls("order by")}
          >
            Order by
          </button>
        </div>

        <div className="flex w-full max-w-[500px] self-end">
          <div className={`${toggleFilter ? "block w-full" : "hidden"}`} id="item" data-testid='filter-component-container'>
            <Filter
              setProducts={setProducts}
              originalProducts={originalProducts}
            />
          </div>

          <div
            className={toggleOrderBy ? "block w-full" : "hidden"}
            data-testid="order-component-container"
          >
            <OrderBy
              products={products}
              setProducts={setProducts}
            />
          </div>
        </div>
      </div>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => {
            const { id, title, price, thumbnail, discountPercentage } = product;
            return (
              <Link to={`${id}`} className="product-item" key={id} data-testid='product'>
                <div className="flex flex-col p-4">
                  <p className="flex h-5 justify-end">
                    {cart.map((item) => {
                      if (item.id === id) {
                        return item.count;
                      }
                    })}
                  </p>
                  <img
                    src={thumbnail}
                    alt={`Image of ${title}`}
                    className="mb-3 w-full object-cover lg:h-full lg:max-h-80"
                  />
                  <div className="flex h-full w-full flex-col">
                    <p className="flex-1 text-lg tracking-wide">{title}</p>
                    <div className="flex gap-3 tracking-wider">
                      <p className="font-light">${price}</p>
                      {discountPercentage > 10 ? (
                        <p className="font-normal text-red-700">
                          -%{Math.floor(discountPercentage)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <h3>Sorry products not found</h3>
        )}
      </div>
    </main>
  );
}

export default App;
