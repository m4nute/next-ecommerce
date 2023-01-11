import React, { useState } from "react";
import { MultiSelect } from "@mantine/core";

const options = [
  { label: "Apple", value: "Apple" },
  { label: "Samsung", value: "Samsung" },
  { label: "OPPO", value: "OPPO" },
  { label: "Huawei", value: "Huawei" },
  { label: "Microsoft Surface", value: "Microsoft Surface" },
  { label: "Infinix", value: "Infinix" },
  { label: "HP Pavilion", value: "HP Pavilion" },
  { label: "Impression of Acqua Di Gio", value: "Impression of Acqua Di Gio" },
  { label: "Royal_Mirage", value: "Royal_Mirage" },
  { label: "Fog Scent Xpressio", value: "Fog Scent Xpressio" },
  { label: "Al Munakh", value: "Al Munakh" },
  { label: "Lord - Al-Rehab", value: "Lord - Al-Rehab" },
  { label: "L'Oreal Paris", value: "L'Oreal Paris" },
  { label: "Hemani Tea", value: "Hemani Tea" },
  { label: "Dermive", value: "Dermive" },
  { label: "ROREC White Rice", value: "ROREC White Rice" },
  { label: "Fair & Clear", value: "Fair & Clear" },
  { label: "Saaf & Khaas", value: "Saaf & Khaas" },
  { label: "Bake Parlor Big", value: "Bake Parlor Big" },
  { label: "Baking Food Items", value: "Baking Food Items" },
  { label: "fauji", value: "fauji" },
  { label: "Dry Rose", value: "Dry Rose" },
  { label: "Boho Decor", value: "Boho Decor" },
  { label: "Flying Wooden", value: "Flying Wooden" },
  { label: "LED Lights", value: "LED Lights" },
  { label: "luxury palace", value: "luxury palace" },
  { label: "Golden", value: "Golden" },
  { label: "Furniture Bed Set", value: "Furniture Bed Set" },
  { label: "Ratttan Outdoor", value: "Ratttan Outdoor" },
  { label: "Kitchen Shelf", value: "Kitchen Shelf" },
  { label: "Multi Purpose", value: "Multi Purpose" },
  { label: "AmnaMart", value: "AmnaMart" },
  { label: "Professional Wear", value: "Professional Wear" },
  { label: "Soft Cotton", value: "Soft Cotton" },
  { label: "Top Sweater", value: "Top Sweater" },
  { label: "RED MICKY MOUSE..", value: "RED MICKY MOUSE.." },
  { label: "Digital Printed", value: "Digital Printed" },
  { label: "Ghazi Fabric", value: "Ghazi Fabric" },
  { label: "IELGY", value: "IELGY" },
  { label: "IELGY fashion", value: "IELGY fashion" },
  { label: "Synthetic Leather", value: "Synthetic Leather" },
  { label: "Sandals Flip Flops", value: "Sandals Flip Flops" },
  { label: "Maasai Sandals", value: "Maasai Sandals" },
  { label: "Arrivals Genuine", value: "Arrivals Genuine" },
  { label: "Vintage Apparel", value: "Vintage Apparel" },
  { label: "FREE FIRE", value: "FREE FIRE" },
  { label: "The Warehouse", value: "The Warehouse" },
  { label: "Sneakers", value: "Sneakers" },
  { label: "Rubber", value: "Rubber" },
  { label: "Naviforce", value: "Naviforce" },
  { label: "SKMEI 9117", value: "SKMEI 9117" },
  { label: "Strap Skeleton", value: "Strap Skeleton" },
  { label: "Stainless", value: "Stainless" },
  { label: "Eastern Watches", value: "Eastern Watches" },
  { label: "Luxury Digital", value: "Luxury Digital" },
  { label: "Watch Pearls", value: "Watch Pearls" },
  { label: "Bracelet", value: "Bracelet" },
  { label: "LouisWill", value: "LouisWill" },
  { label: "Copenhagen Luxe", value: "Copenhagen Luxe" },
  { label: "Steal Frame", value: "Steal Frame" },
  { label: "Darojay", value: "Darojay" },
  { label: "Fashion Jewellery", value: "Fashion Jewellery" },
  { label: "Cuff Butterfly", value: "Cuff Butterfly" },
  { label: "Designer Sun Glasses", value: "Designer Sun Glasses" },
  { label: "mastar watch", value: "mastar watch" },
  { label: "Car Aux", value: "Car Aux" },
  { label: "W1209 DC12V", value: "W1209 DC12V" },
  { label: "TC Reusable", value: "TC Reusable" },
  { label: "Neon LED Light", value: "Neon LED Light" },
  {
    label: "METRO 70cc Motorcycle - MR70",
    value: "METRO 70cc Motorcycle - MR70",
  },
  { label: "BRAVE BULL", value: "BRAVE BULL" },
  { label: "shock absorber", value: "shock absorber" },
  { label: "JIEPOLLY", value: "JIEPOLLY" },
  { label: "Xiangle", value: "Xiangle" },
  { label: "lightingbrilliance", value: "lightingbrilliance" },
  { label: "Ifei Home", value: "Ifei Home" },
  { label: "DADAWU", value: "DADAWU" },
  { label: "YIOSI", value: "YIOSI" },
];

const Example = ({ setBrand, brand }: any) => {
  return (
    <div className="text-black">
      <MultiSelect
        data={options}
        transitionDuration={150}
        transition="pop-top-left"
        transitionTimingFunction="ease"
        placeholder="Brands"
        searchable
        clearable
        value={brand}
        onChange={(value) => setBrand(value)}
      />
    </div>
  );
};

export default Example;
