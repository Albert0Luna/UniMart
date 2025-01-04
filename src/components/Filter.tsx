import { useState } from "react";
import { Product } from "@/types/products.js";
import categoryList from "@/utils/categoryList.js";
import { fetchAllProducts } from "@/lib/fetchAllProducts";

interface Filters {
  price: number;
  category: string;
}

interface FilterProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[] | []>>;
  originalProducts: Product[];
}

function Filter({ setProducts, originalProducts }: FilterProps) {
  const [filters, setFilters] = useState<Filters>({
    price: 0,
    category: "",
  });

  const [price, setPrice] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.currentTarget;

    if (name === "price") {
      setPrice(parseInt(value));
    }
    setFilters({
      ...filters,
      [name]: name === "price" ? parseInt(value) : value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    let filteredProducts = originalProducts;

    if (filters.price) {
      filteredProducts = filteredProducts.filter(
        (product: Product) => product.price <= filters.price,
      );
    }

    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product: Product) => product.category === filters.category,
      );
    }

    setProducts(filteredProducts);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="my-4 flex w-full flex-col items-end gap-3"
    >
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="price" className="font-medium">
          Max price
        </label>
        <div className="track flex w-full items-center gap-2">
          <p className="w-8 text-center font-medium">${price}</p>
          <input
            type="range"
            name="price"
            id="price"
            className="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-teal-900"
            defaultValue={0}
            min={0}
            max={2500}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="category" className="font-medium">
          Category
        </label>
        <select
          name="category"
          id="category"
          defaultValue="Category"
          onChange={handleInputChange}
          className="w-full rounded-lg border border-sky-900 bg-transparent px-[2px] py-[2.5px]"
        >
          {categoryList.map((item) => (
            <option
              value={item}
              key={item}
              className="bg-transparent font-medium"
            >
              {`${item[0].toUpperCase()}${item.slice(1)}`}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex w-full justify-between">
        <button
          type="submit"
          className="rounded-lg border border-transparent bg-teal-900 px-3 py-1 font-semibold tracking-wider text-white"
        >
          Apply filters
        </button>
        <button
          type="button"
          onClick={() => setProducts(originalProducts)}
          className="rounded-lg border border-sky-900 px-3 py-1 font-medium tracking-wider"
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}

export default Filter;
