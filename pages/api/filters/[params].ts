import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import ProductModel from "../../../model/Products";
import { Product } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  type FilteredProducts = {
    pages: number;
    currentPage: number;
    previousPage?: { page: number; limit: number };
    nextPage?: { page: number; limit: number };
    results: Array<Product>;
  };
  const products: FilteredProducts = await getFilteredProducts(
    req.query["params"]
  );
  if (products.results.length > 0) res.status(200).send(products);
  else res.status(500).send(products);
}

export const getFilteredProducts = async (
  filters: any
): Promise<{
  pages: number;
  currentPage: number;
  previous?: { page: number; limit: number } | null;
  next?: { page: number; limit: number } | null;
  results: Array<Product>;
}> => {

  await dbConnect();
  let query: any = {};
  let sortBy: any = {};

  filters.categories && (query["category"] = { $in: filters.categories });
  filters.brand && (query["brand"] = { $in: filters.brand });
  filters.title &&
    (query["title"] = {
      $regex: filters.title,
      $options: "i",
    });
  filters.rating && (query["rating"] = { $gte: filters.rating });
  if (filters.minPrice || filters.maxPrice) {
    !filters.minPrice && (filters.minPrice = 0);
    !filters.maxPrice && (filters.maxPrice = 9999);
    query["price"] = {
      $gte: filters.minPrice,
      $lte: filters.maxPrice,
    };
  }
  filters.sort &&
    (sortBy = { [filters.sort.split("/")[0]]: filters.sort.split("/")[1] });

  let products: Array<Product>;
  const totalProducts = await ProductModel.countDocuments(query);
  const limit = 20;
  const currentPage = filters.page || 1;
  const pages = Math.ceil(totalProducts / limit);
  const offset = (currentPage - 1) * limit;

  if (Object.keys(query).length !== 0 && !filters.sortField)
    products = await ProductModel.find(query)
      .sort(sortBy)
      .limit(limit)
      .skip(offset);
  else if (Object.keys(query).length !== 0 && filters.sortField)
    products = await ProductModel.find(query)
      .sort(sortBy)
      .limit(limit)
      .skip(offset);
  else
    products = await ProductModel.find().sort(sortBy).limit(limit).skip(offset);

  return {
    pages,
    currentPage,
    previous: currentPage > 1 ? { page: currentPage - 1, limit } : null,
    next: currentPage < pages ? { page: currentPage + 1, limit } : null,
    results: products,
  };
};
