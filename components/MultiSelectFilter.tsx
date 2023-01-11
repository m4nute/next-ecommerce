import { MultiSelect } from "@mantine/core";
import React from "react";

const categories: any = [
  { label: "Smartphones", group: "Tech 💻", value: "smartphones" },
  { label: "Laptops", group: "Tech 💻", value: "laptops" },
  { label: "Shirts", group: "Men's clothing 👕", value: "mens-shirts" },
  { label: "Shoes", group: "Men's clothing 👕", value: "mens-shoes" },
  {
    label: "Watches",
    group: "Men's clothing 👕",
    value: "mens-watches",
  },
  {
    label: "Dresses",
    group: "Women's clothing 👚",
    value: "womens-dresses",
  },
  {
    label: "Shoes",
    group: "Women's clothing 👚",
    value: "womens-shoes",
  },
  {
    label: "Watches",
    group: "Women's clothing 👚",
    value: "womens-watches",
  },
  {
    label: "Bags",
    group: "Women's clothing 👚",
    value: "womens-bags",
  },
  {
    label: "Jewellery",
    group: "Women's clothing 👚",
    value: "womens-jewellery",
  },
  { label: "Tops", group: "Women's clothing 👚", value: "tops" },
  { label: "Motorcycle", group: "Vehicles 🚗", value: "motorcycle" },
  { label: "Automotive", group: "Vehicles 🚗", value: "automotive" },
  { label: "Fragrances", group: "Fashion 👠", value: "fragrances" },
  { label: "Skincare", group: "Fashion 👠", value: "skincare" },
  { label: "Sunglasses", group: "Fashion 👠", value: "sunglasses" },
  { label: "Furniture", group: "Decoration 🎍", value: "furniture" },
  {
    label: "For Home",
    group: "Decoration 🎍",
    value: "home-decoration",
  },
  { label: "Lighting", group: "Decoration 🎍", value: "lighting" },
  {
    label: "Groceries",
    group: "Supermarket 🛒",
    value: "groceries",
  },
];

export default function MultiSelectFilter({ setCategories, categoriesF }: any) {
  return (
    <MultiSelect
      data={categories}
      transitionDuration={150}
      transition="pop-top-left"
      transitionTimingFunction="ease"
      placeholder="Categories"
      searchable
      clearable
      value={categoriesF}
      onChange={(value) => setCategories(value)}
    />
  );
}
