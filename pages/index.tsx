import React, { useEffect, useState } from "react";
import MultiSelectFilter from "../components/MultiSelectFilter";
import BrandFilter from "../components/BrandFilter";
import SortFilter from "../components/SortFilter";
import TitleFilter from "../components/TitleFilter";
import PriceInputs from "../components/PriceInputs";
import StarRating from "../components/StarRating";
import { useRouter } from "next/router";
import { getFilteredProducts } from "./api/filters/[params]";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import PaginationComponent from "../components/Pagination";
import { NextPageContext } from "next";


const defaultData = {
  "pages": 5,
  "currentPage": 1,
  "previous": null,
  "next": {
    "page": 2,
    "limit": 20
  },
  "results": [
    {
      "_id": "638299b5bc8b25d154bf5f70",
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 41.96,
      "rating": 3.69,
      "stock": 94,
      "brand": [
        "Apple"
      ],
      "category": [
        "smartphones"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f71",
      "id": 2,
      "title": "iPhone X",
      "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      "price": 899,
      "discountPercentage": 17.94,
      "rating": 4.44,
      "stock": 34,
      "brand": [
        "Apple"
      ],
      "category": [
        "smartphones"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/2/1.jpg",
        "https://i.dummyjson.com/data/products/2/2.jpg",
        "https://i.dummyjson.com/data/products/2/3.jpg",
        "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f72",
      "id": 3,
      "title": "Samsung Universe 9",
      "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
      "price": 1249,
      "discountPercentage": 15.46,
      "rating": 4.09,
      "stock": 36,
      "brand": [
        "Samsung"
      ],
      "category": [
        "smartphones"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/3/1.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f73",
      "id": 4,
      "title": "OPPOF19",
      "description": "OPPO F19 is officially announced on April 2021.",
      "price": 280,
      "discountPercentage": 17.91,
      "rating": 4.3,
      "stock": 123,
      "brand": [
        "OPPO"
      ],
      "category": [
        "smartphones"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/4/1.jpg",
        "https://i.dummyjson.com/data/products/4/2.jpg",
        "https://i.dummyjson.com/data/products/4/3.jpg",
        "https://i.dummyjson.com/data/products/4/4.jpg",
        "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f74",
      "id": 5,
      "title": "Huawei P30",
      "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      "price": 499,
      "discountPercentage": 10.58,
      "rating": 4.09,
      "stock": 32,
      "brand": [
        "Huawei"
      ],
      "category": [
        "smartphones"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/5/1.jpg",
        "https://i.dummyjson.com/data/products/5/2.jpg",
        "https://i.dummyjson.com/data/products/5/3.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f75",
      "id": 6,
      "title": "MacBook Pro",
      "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
      "price": 1749,
      "discountPercentage": 11.02,
      "rating": 4.57,
      "stock": 83,
      "brand": [
        "APPle"
      ],
      "category": [
        "laptops"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/6/thumbnail.png",
      "images": [
        "https://i.dummyjson.com/data/products/6/1.png",
        "https://i.dummyjson.com/data/products/6/2.jpg",
        "https://i.dummyjson.com/data/products/6/3.png",
        "https://i.dummyjson.com/data/products/6/4.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f76",
      "id": 7,
      "title": "Samsung Galaxy Book",
      "description": "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
      "price": 1499,
      "discountPercentage": 4.15,
      "rating": 4.25,
      "stock": 50,
      "brand": [
        "Samsung"
      ],
      "category": [
        "laptops"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/7/1.jpg",
        "https://i.dummyjson.com/data/products/7/2.jpg",
        "https://i.dummyjson.com/data/products/7/3.jpg",
        "https://i.dummyjson.com/data/products/7/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f77",
      "id": 8,
      "title": "Microsoft Surface Laptop 4",
      "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
      "price": 1499,
      "discountPercentage": 10.23,
      "rating": 4.43,
      "stock": 68,
      "brand": [
        "Microsoft Surface"
      ],
      "category": [
        "laptops"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/8/1.jpg",
        "https://i.dummyjson.com/data/products/8/2.jpg",
        "https://i.dummyjson.com/data/products/8/3.jpg",
        "https://i.dummyjson.com/data/products/8/4.jpg",
        "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f78",
      "id": 9,
      "title": "Infinix INBOOK",
      "description": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
      "price": 1099,
      "discountPercentage": 11.83,
      "rating": 4.54,
      "stock": 96,
      "brand": [
        "Infinix"
      ],
      "category": [
        "laptops"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/9/1.jpg",
        "https://i.dummyjson.com/data/products/9/2.png",
        "https://i.dummyjson.com/data/products/9/3.png",
        "https://i.dummyjson.com/data/products/9/4.jpg",
        "https://i.dummyjson.com/data/products/9/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f79",
      "id": 10,
      "title": "HP Pavilion 15-DK1056WM",
      "description": "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
      "price": 1099,
      "discountPercentage": 6.18,
      "rating": 4.43,
      "stock": 89,
      "brand": [
        "HP Pavilion"
      ],
      "category": [
        "laptops"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
      "images": [
        "https://i.dummyjson.com/data/products/10/1.jpg",
        "https://i.dummyjson.com/data/products/10/2.jpg",
        "https://i.dummyjson.com/data/products/10/3.jpg",
        "https://i.dummyjson.com/data/products/10/thumbnail.jpeg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f7a",
      "id": 11,
      "title": "perfume Oil",
      "description": "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
      "price": 13,
      "discountPercentage": 8.4,
      "rating": 4.26,
      "stock": 65,
      "brand": [
        "Impression of Acqua Di Gio"
      ],
      "category": [
        "fragrances"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/11/1.jpg",
        "https://i.dummyjson.com/data/products/11/2.jpg",
        "https://i.dummyjson.com/data/products/11/3.jpg",
        "https://i.dummyjson.com/data/products/11/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f7b",
      "id": 12,
      "title": "Brown Perfume",
      "description": "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
      "price": 40,
      "discountPercentage": 15.66,
      "rating": 4,
      "stock": 52,
      "brand": [
        "Royal_Mirage"
      ],
      "category": [
        "fragrances"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/12/1.jpg",
        "https://i.dummyjson.com/data/products/12/2.jpg",
        "https://i.dummyjson.com/data/products/12/3.png",
        "https://i.dummyjson.com/data/products/12/4.jpg",
        "https://i.dummyjson.com/data/products/12/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f7c",
      "id": 13,
      "title": "Fog Scent Xpressio Perfume",
      "description": "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
      "price": 13,
      "discountPercentage": 8.14,
      "rating": 4.59,
      "stock": 61,
      "brand": [
        "Fog Scent Xpressio"
      ],
      "category": [
        "fragrances"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/13/thumbnail.webp",
      "images": [
        "https://i.dummyjson.com/data/products/13/1.jpg",
        "https://i.dummyjson.com/data/products/13/2.png",
        "https://i.dummyjson.com/data/products/13/3.jpg",
        "https://i.dummyjson.com/data/products/13/4.jpg",
        "https://i.dummyjson.com/data/products/13/thumbnail.webp"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f7d",
      "id": 14,
      "title": "Non-Alcoholic Concentrated Perfume Oil",
      "description": "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
      "price": 120,
      "discountPercentage": 15.6,
      "rating": 4.21,
      "stock": 114,
      "brand": [
        "Al Munakh"
      ],
      "category": [
        "fragrances"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/14/1.jpg",
        "https://i.dummyjson.com/data/products/14/2.jpg",
        "https://i.dummyjson.com/data/products/14/3.jpg",
        "https://i.dummyjson.com/data/products/14/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f7e",
      "id": 15,
      "title": "Eau De Perfume Spray",
      "description": "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
      "price": 30,
      "discountPercentage": 10.99,
      "rating": 4.7,
      "stock": 105,
      "brand": [
        "Lord - Al-Rehab"
      ],
      "category": [
        "fragrances"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/15/1.jpg",
        "https://i.dummyjson.com/data/products/15/2.jpg",
        "https://i.dummyjson.com/data/products/15/3.jpg",
        "https://i.dummyjson.com/data/products/15/4.jpg",
        "https://i.dummyjson.com/data/products/15/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f7f",
      "id": 16,
      "title": "Hyaluronic Acid Serum",
      "description": "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
      "price": 19,
      "discountPercentage": 13.31,
      "rating": 4.83,
      "stock": 110,
      "brand": [
        "L'Oreal Paris"
      ],
      "category": [
        "skincare"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/16/1.png",
        "https://i.dummyjson.com/data/products/16/2.webp",
        "https://i.dummyjson.com/data/products/16/3.jpg",
        "https://i.dummyjson.com/data/products/16/4.jpg",
        "https://i.dummyjson.com/data/products/16/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f80",
      "id": 17,
      "title": "Tree Oil 30ml",
      "description": "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
      "price": 12,
      "discountPercentage": 24.09,
      "rating": 2.52,
      "stock": 78,
      "brand": [
        "Hemani Tea"
      ],
      "category": [
        "skincare"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/17/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/17/1.jpg",
        "https://i.dummyjson.com/data/products/17/2.jpg",
        "https://i.dummyjson.com/data/products/17/3.jpg",
        "https://i.dummyjson.com/data/products/17/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f81",
      "id": 18,
      "title": "Oil Free Moisturizer 100ml",
      "description": "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
      "price": 40,
      "discountPercentage": 13.1,
      "rating": 4.56,
      "stock": 88,
      "brand": [
        "Dermive"
      ],
      "category": [
        "skincare"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/18/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/18/1.jpg",
        "https://i.dummyjson.com/data/products/18/2.jpg",
        "https://i.dummyjson.com/data/products/18/3.jpg",
        "https://i.dummyjson.com/data/products/18/4.jpg",
        "https://i.dummyjson.com/data/products/18/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f82",
      "id": 19,
      "title": "Skin Beauty Serum.",
      "description": "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
      "price": 46,
      "discountPercentage": 10.68,
      "rating": 4.42,
      "stock": 54,
      "brand": [
        "ROREC White Rice"
      ],
      "category": [
        "skincare"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/19/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/19/1.jpg",
        "https://i.dummyjson.com/data/products/19/2.jpg",
        "https://i.dummyjson.com/data/products/19/3.png",
        "https://i.dummyjson.com/data/products/19/thumbnail.jpg"
      ],
      "__v": 0
    },
    {
      "_id": "638299b5bc8b25d154bf5f83",
      "id": 20,
      "title": "Freckle Treatment Cream- 15gm",
      "description": "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
      "price": 70,
      "discountPercentage": 16.99,
      "rating": 4.06,
      "stock": 140,
      "brand": [
        "Fair & Clear"
      ],
      "category": [
        "skincare"
      ],
      "thumbnail": "https://i.dummyjson.com/data/products/20/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/20/1.jpg",
        "https://i.dummyjson.com/data/products/20/2.jpg",
        "https://i.dummyjson.com/data/products/20/3.jpg",
        "https://i.dummyjson.com/data/products/20/4.jpg",
        "https://i.dummyjson.com/data/products/20/thumbnail.jpg"
      ],
      "__v": 0
    }
  ]
}

const defaultFilters = {
  categories: [],
  brand: [],
  minPrice: 0,
  maxPrice: 9999,
  title: "",
  rating: null,
  sort: null,
  page: 1,
};

function Home({ data }: any) {
  const router = useRouter();

  let results, pages, currentPage

  if (Object.keys(router.query).length === 0) {
    results = defaultData.results
    pages = defaultData.pages
    currentPage = defaultData.currentPage
  } else {
    results = data.results
    pages = data.pages
    currentPage = data.currentPage
    results = JSON.parse(results)
  }
  
  const [filters, setFilters] = useState<any>(Object.assign({}, router.query, defaultFilters));

  const handleChange = (key: string, value: any) => {
    (key !== "page" && filters.page !== 1) && setFilters((prev: any) => ({ ...prev, page: 1 }));
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    router.push({
      pathname: "/",
      query: Object.keys(filters).reduce((acc, key) => {
        filters[key] !== defaultFilters[key] && (acc[key] = filters[key]);
        return acc;
      }, {})
    });

  }, [filters]);

  const handleReset = () => {
    if (JSON.stringify(defaultFilters) === JSON.stringify(filters)) return;
    setFilters(defaultFilters);
  }
  return (
    <div className="mt-4 flex px-5 text-gray-200">
      <div className="w-1/6 fixed z-1">
        <p className="pb-1 font-extrabold pt-6">Categories</p>
        <MultiSelectFilter
          setCategories={(value: string[]) => handleChange("categories", value)}
          categoriesF={filters.categories}
        />
        <p className="pb-1 font-extrabold pt-6">Brand</p>
        <BrandFilter
          setBrand={(value: string[]) => handleChange("brand", value)}
          brand={filters.brand}
        />

        <p className="pb-1 font-extrabold pt-6">Title</p>
        <TitleFilter
          setTitle={(value: string) => handleChange("title", value)}
          title={filters.title}
        />

        <p className="pb-1 font-extrabold pt-6">Sort</p>
        <SortFilter
          setSort={(value: string) => handleChange("sort", value)}
          sort={filters.sort}
        />

        <p className="pb-1 font-extrabold pt-6">Price Range</p>
        <PriceInputs
          setMinPriceF={(value: any) => { value === undefined ? handleChange("minPrice", 0) : handleChange("minPrice", value) }}
          minPriceF={filters.minPrice}
          setMaxPriceF={(value: any) => { value === undefined ? handleChange("maxPrice", 9999) : handleChange("maxPrice", value) }}
          maxPriceF={filters.maxPrice}
        />

        <p className="pb-1 font-extrabold pt-6 text-center">Minimum Rating</p>
        <StarRating
          setRating={(value: any) => handleChange("rating", value)}
          rating={filters.rating}
        />
        <div className="text-center mt-8">
          <button
            className="bg-222 w-full px-5 py-3 rounded-md hover:text-222 hover:bg-gray-200 text-white hover:transition-all hover:duration-300 duration-300"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="w-5/6 ml-filters">
        {results.length > 0 ? (
          <>
            <ul className="flex flex-wrap ml-3 mb-4">
              {results.map((product: Product, index: number) => {
                return (
                  <li className="w-1/4 p-4" key={product.id}>
                    <ProductCard prod={product} index={index} />
                  </li>
                );
              })}
            </ul>

            <PaginationComponent
              handleChange={handleChange}
              page={currentPage}
              total={pages}
            />
          </>
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }: NextPageContext) {
  let data = await getFilteredProducts(query);

  return {
    props: {
      data: {
        currentPage: data.currentPage,
        pages: data.pages,
        results: JSON.stringify(data.results)
      },
    },
  };
}

export default Home;
