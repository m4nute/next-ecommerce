import React, { useEffect, useRef, useState } from "react";
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
import Drawer from 'react-modern-drawer'
import { SortAscending } from 'tabler-icons-react';


const defaultFilters = {
  categories: [],
  brand: [],
  minPrice: 0,
  maxPrice: 9999,
  title: "",
  rating: null,
  sort: null,
  page: 1,
  stock: '+12'
};



function Home({ data }: any) {

  const [width, setWidth] = useState<number>()
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const resizeHandler = () => {
    setWidth(
      window.innerWidth,
    );
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
  }, []);


  const router = useRouter();

  let { results, pages, currentPage } = data
  results = JSON.parse(results)
  const isFirstRun = useRef(true);
  const [filters, setFilters] = useState<any>({ ...defaultFilters, ...router.query });

  const handleChange = (key: string, value: any) => {
    (key !== "page" && filters.page !== 1) && setFilters((prev: any) => ({ ...prev, page: 1 }));
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
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
    <div className={`mt-4 flex sm:px-5 text-gray-200`}>
      {typeof window !== "undefined" && window.innerWidth < 768 ?
        <>
          <Drawer
            customIdSuffix="drawer2"
            open={isOpen}
            onClose={toggleDrawer}
            direction='right'
            style={{ backgroundColor: '#111' }}
            size={`${typeof window !== "undefined" && window.innerWidth < 500 ? '75vw' : '50vw'}`}
          >
            <div className="h-screen py-6 px-4">
              <div className="flex justify-between "><h1 className="text-xl font-bold ml-2 mt-1 flex"><SortAscending
                size={20}
                strokeWidth={2}
                color={'white'}
                className="mr-1 mt-1"
              />
                Filter & Sort</h1>
                <span className="text-3xl hover:cursor-pointer mr-3" onClick={toggleDrawer}> &times;</span></div>
              <div className="fixed z-1 overflow-y-scroll max-h-full pb-32 pl-2 pr-6">
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
            </div>
          </Drawer>
        </>
        :
        <div className="w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 fixed z-1 overflow-y-scroll max-h-full pb-32 pr-2">
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
        </div>}
      <div className="ml-filters flex-1 w-full">
        {results.length > 0 ? (
          <>
            {typeof window !== "undefined" && window.innerWidth < 768 && <button className="ml-4 flex" onClick={toggleDrawer}>
              <SortAscending
                size={20}
                strokeWidth={2}
                color={'white'}
                className="mr-1 mt-0.5"
              />
              Filter & Sort</button>}
            <ul className="flex flex-wrap mb-4">
              {results.map((product: Product, index: number) => {
                return (
                  <li className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4" key={product.id}>
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