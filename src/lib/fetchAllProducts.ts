import { Product } from "@/types/products";
import products from "../../mocks/products.json";

export async function fetchAllProducts(): Promise<Product[]> {
  const query = fetch("https://dummyjson.com/products");
  const response = await query;
  const data = await response.json();

  return data.products;
}
