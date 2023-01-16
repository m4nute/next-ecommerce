import { Select } from "@mantine/core";
import React from "react";

const data = [
  { label: "Rating ⬇️", value: "rating/1" },
  { label: "Rating ⬆️", value: "rating/-1" },
  { label: "Price ⬇️", value: "price/1" },
  { label: "Price ⬆️", value: "price/-1" },
  { label: "Discount ⬇️", value: "discountPercentage/1" },
  { label: "Discount ⬆️", value: "discountPercentage/-1" },
];

export default function SortFilter({ setSort, sort }: any) {
  return (
    <Select
      clearable
      data={data}
      value={sort}
      transitionDuration={150}
      transition="pop-top-left"
      transitionTimingFunction="ease"
      placeholder="Sort"
      onChange={(value) => setSort(value)}
      maxDropdownHeight={280}
    />
  );
}
