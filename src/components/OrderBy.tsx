import { Product } from "@/types/products";
import { useState } from "react";

interface OrderByProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[] | []>>;
}

const actions = {
  maxPrice: (products: Product[]) => {
    const copiedProducts = [...products];
    return copiedProducts.sort((a, b) => b.price - a.price);
  },
  minPrice: (products: Product[]) => {
    const copiedProducts = [...products];
    return copiedProducts.sort((a, b) => a.price - b.price);
  },
  maxRating: (products: Product[]) => {
    const copiedProducts = [...products];
    return copiedProducts.sort((a, b) => b.rating - a.rating);
  },
  minRating: (products: Product[]) => {
    const copiedProducts = [...products];
    return copiedProducts.sort((a, b) => a.rating - b.rating);
  },
};

const optionsToOrderBy = [
  {
    name: "maxPrice",
    label: "Max price",
  },
  {
    name: "minPrice",
    label: "Min price",
  },
  {
    name: "maxRating",
    label: "Max Rating",
  },
  {
    name: "minRating",
    label: "Min Rating",
  },
];

function OrderBy({ products, setProducts }: OrderByProps) {
  const [orderSelected, setOrderSelected] = useState<String | null>(null);

  const handleOrderByOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    const actionToDo = e.currentTarget.name as keyof typeof actions;
    const actionOrder = actions[actionToDo];
    setOrderSelected(actionToDo);
    if (actionOrder) {
      try {
        setProducts(actionOrder(products));
      } catch (error) {
        console.error("Error applying sort:", error);
      }
    }
  };

  return (
    <div
      className="my-4 lg:flex w-full lg:justify-between grid grid-cols-2 gap-3"
    >
      {optionsToOrderBy.map((option) => (
        <button
          key={option.name}
          type="button"
          onClick={handleOrderByOption}
          name={option.name}
          className={`rounded-lg border border-sky-900 px-3 py-1 tracking-wide ${orderSelected === option.name ? "border-transparent bg-teal-900 text-white transition" : "transition hover:opacity-60"}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default OrderBy;
