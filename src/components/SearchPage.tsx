import { fetchAllProducts } from "@/lib/fetchAllProducts";
import { Product, ProductsInTheCart } from "@/types/products";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useSearchValidation from "@/hooks/useSearchValidation";
import Magnifying from "@/icons/Magnifying";
import { useSelector } from "react-redux";

function SearchPage() {
  const [originalProducts, setOriginalProducts] = useState<
    ProductsInTheCart[] | []
  >([]);

  const cart = useSelector(
    (state: { cart: { items: ProductsInTheCart[] | [] } }) => state.cart.items,
  );

  useEffect(() => {
    fetchAllProducts().then((data) => {
      setOriginalProducts(data);
    });
  }, []);

  const [searchParams] = useSearchParams();

  const inputElement = useRef<HTMLInputElement>(null);

  const value = searchParams.get("searchProducts");

  const [query, setQuery] = useState(value ?? "");
  const { error, validateQuery } = useSearchValidation(query);
  const [renderSearch, setRenderSearch] = useState<Product[] | null>(null);

  useEffect(() => {
    const productsToSearch = originalProducts.filter((product) => {
      return product.title
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    });

    if (productsToSearch.length === 0) return;
    setRenderSearch(productsToSearch);
  }, [query, originalProducts]);

  const handleSearchProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateQuery()) {
      if (inputElement.current) {
        inputElement.current.value = "";
      }
    }
  };

  const removeTwoDecimals = (num: number) => {
    return num.toFixed(2);
  }

  return (
    <main className="mx-auto mb-20 flex min-h-[95vh] w-full max-w-[1150px] flex-col px-3 pt-4">
      <h1 className="mb-2 text-center text-3xl font-semibold">Search</h1>
      <form
        onSubmit={handleSearchProduct}
        className="flex w-full items-center justify-center gap-2"
      >
        <input
          type="text"
          className="flex-1 rounded-md border border-teal-900 p-1 tracking-wide outline-none outline-2 focus:outline-sky-700"
          placeholder="Mascara..."
          ref={inputElement}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <button>
          <Magnifying />
        </button>
      </form>
      {error && (
        <div className="mt-1 font-medium tracking-wide text-red-700">
          {error}
        </div>
      )}

      <h3 className="mt-4 text-gray-700 lg:my-4 lg:text-lg">
        Results for: <span className="font-semibold">{query}</span>
      </h3>

      <div className="products-grid">
        {renderSearch ? (
          renderSearch.map((product) => {
            const { id, title, price, thumbnail, discountPercentage, count } =
              product;

            return (
              <Link to={`/${id}`} className="product-item">
                <div key={id} className="flex flex-col p-4">
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
                    className="mb-3 h-56 w-full object-cover lg:h-full lg:max-h-80"
                  />
                  <div className="flex h-full w-full flex-col">
                    <p className="flex-1 text-lg tracking-wide">{title}</p>
                    <div className="flex gap-3 tracking-wider">
                      <p className="font-light">
                        ${removeTwoDecimals(price)}
                      </p>
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
          <h3>Something went wrong!</h3>
        )}
      </div>
    </main>
  );
}

export default SearchPage;
