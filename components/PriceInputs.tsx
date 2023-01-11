import { NumberInput } from "@mantine/core";
import React from "react";

export default function PriceInputs({
  setMinPriceF,
  setMaxPriceF,
  minPriceF,
  maxPriceF,
}: any) {
  return (
    <div className="flex flex-row">
      <NumberInput
        placeholder="Minimum"
        max={9999}
        min={0}
        className="w-1/2 pr-1"
        onChange={(value) => setMinPriceF(value)}
        value={minPriceF === undefined ? 0 : minPriceF}
      />
      <NumberInput
        placeholder="Maximum"
        max={9999}
        className="w-1/2 pl-1"
        value={maxPriceF === undefined ? 9999 : maxPriceF}
        min={0}
        onChange={(value) => setMaxPriceF(value)}
      />
    </div>
  );
}
