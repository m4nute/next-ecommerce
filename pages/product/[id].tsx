import React, { useState } from "react";
import Image from "next/image";
import dbConnect from "../../lib/dbConnect";
import ProductModel from "../../model/Products";
import { Product } from "../../types";
import StarRating from "../../components/StarRating";
import InventoryIcon from "@mui/icons-material/Inventory";
import Button from "@mui/material/Button";
import useCart from "../../hooks/cartHook";
import StoreIcon from '@mui/icons-material/Store';
import { styled } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

const StyledButton = styled(Button)(`
  text-transform: none;
`);



function ProductPage({ data }: any) {
  const { cart, addProduct } = useCart()
  const [qty, setQty] = useState(1)
  const [selected, setSelected] = useState<number>(0);
  const router = useRouter()
  const { product, similars } = data

  if (product) {
    return (
      <>
        <div className="flex flex-col sm:flex-row px-6 md:px-8 lg:px-12 xl:px-32 pt-10">
          <div className="flex w-full sm:w-1/2 max-h-fit flex-col items-center">
            <div className="relative w-4/5 sm:w-full h-52 sm:h-96 bg-222">
              <Image
                src={product.images[selected]}
                alt={product.title}
                fill
                sizes="(max-width: 1300px) 75%, (max-width: 1000px) 60%"
                priority
                className="object-contain"
              />
            </div>
            <div className="flex w-full justify-center gap-4 mt-4 sm:mt-10">
              {product.images.map((image: string, index: number) => {
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setSelected(index)}
                    className="relative w-16 h-16 duration-100 transition-all border border-gray-600 hover:border-2 hover:border-green-400 shadow-sm"
                  >
                    <Image
                      src={image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 1000px) 30%,(max-width: 700px) 20%,(max-width: 400px) 10%"
                      priority
                      className="object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-white ml-0 sm:ml-4 md:ml-10 lg:ml-12 mt-6 sm:mt-0 p-4 lg:p-8  rounded-md card w-full sm:w-1/2">
            <div className="flex sm:flex-col gap-4 sm:gap-0">
              <h1 className="text-3xl">{product.title}</h1>
              <div className="flex gap-2 sm:mt-3">
                <StarRating readOnly={true} rating={product.rating} />
                <span className="text-green-400 mt-1.5 sm:mt-0">({product.rating})</span>
              </div>
            </div>
            <div>
              <div className="flex mt-3 sm:mt-8">
                <h1 className="text-md lg:text-lg line-through text-gray-400">
                  ${(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}
                </h1>
              </div>
              <div className="flex mt-1 sm:mt-2">
                <h1 className="text-xl md:text-3xl">${product.price.toFixed(2)}</h1>
                <h2 className="text-green-400 pl-2 text-md lg:text-lg">{product.discountPercentage}% OFF</h2>
              </div>
              <div className="flex sm:flex-col gap-4 sm:gap-0">
                <div className="mt-4 sm:mt-8 flex">
                  <StoreIcon fontSize="medium" />
                  <div>
                    <h2 className="text-lg pl-2">
                      {product.brand}
                    </h2>
                  </div>
                </div>
                <div className="mt-4 sm:mt-8">
                  <span className="text-lg"><InventoryIcon className="mr-1 pb-1 scale-90" /> Stock Available</span>
                </div>
              </div>

              <div className="flex mt-4 flex-col lg:flex-row">
                <h1 className="flex"><span className="text-lg flex flex-col justify-center pr-2">Amount:</span> <span className="flex flex-col justify-center mr-4">{qty}</span></h1>
                <div className="mt-2 mb-2">
                  <Button color="info" variant="contained" className="bg-333 mr-3" onClick={() => !(qty === 1) && (setQty(qty - 1))}> - </Button>
                  <Button color="info" variant="contained" className='bg-333' onClick={() => !(qty >= 10 || qty >= product.stock) && (setQty(qty + 1))}> + </Button>
                  <span className="text-green-400 text-xs ml-2 sm:ml-3">{product.stock} Available </span>
                </div>
              </div>
              <div className="flex gap-4 mt-6 flex-col md:flex-row">
                {cart?.map((obj: any) => obj.product.id).includes(product.id) ?
                  <div className="flex w-full md:w-1/2">
                    <StyledButton color="success" variant="contained" className="bg-333 w-full text-md" onClick={() => addProduct(product, qty, true)}>
                      Update amount
                    </StyledButton>
                  </div>
                  :
                  <StyledButton color="success" variant="contained" className="bg-333 text-md w-full md:w-1/2" onClick={() => addProduct(product, qty)}>
                    Add to Cart
                  </StyledButton>
                }
                <StyledButton color="success" variant="contained" className='bg-333 w-full md:w-1/2 text-md' onClick={() => {
                  if (cart.every((item: any) => item.product.id !== product.id)) {
                    addProduct(product, qty)
                  }
                  router.push('/checkout');
                }}>Proceed to checkout</StyledButton>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-10 text-white h-fit">
          <h1 className="text-xl font-bold pb-4 mt-8 text-center">More on <span className="capitalize">{product.category}</span></h1>
          <ul className="flex mb-10 gap-6 justify-center w-full flex-wrap px-0">
            {similars.map((prod: Product, index: number) => {
              return (
                <li key={index} className="bg-black text-white h-52 w-4/5 sm:w-2/5 md:w-1/3 product-card transition-all duration-100 rounded-md ">
                  <div className="h-3/5 relative w-full bg-222">
                    <Image
                      src={prod.thumbnail}
                      alt={prod.title}
                      fill
                      sizes="(max-width: 1400px) 60%, (max-width: 1100px) 50%"
                      className="object-contain"
                    />
                  </div>
                  <div className="p-3 bg-black overflow-hidden mb-10 h-2/5">
                    <Link href={`/product/${prod.id}`}>
                      <h1 className="text-888 text-ellipsis overflow-hidden w-full whitespace-nowrap product-title duration-300 transition-all">
                        {prod.title}
                      </h1>
                    </Link>
                    <p>
                      <span className="text-md lg:text-lg">${prod.price}</span>
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </>
    )
  }
  return <>No data found...</>;
}

export default ProductPage;

export async function getStaticProps({ params: { id } }: any) {
  id = id!;
  await dbConnect();
  const data: Product | null = await ProductModel.findOne({ id: id });
  let similars: Product[] | null = await ProductModel.find({ category: data?.category[0] })
  similars = similars.filter((product: Product) => product.id !== data?.id)

  return {
    props: {
      data: {
        product: JSON.parse(JSON.stringify(data)) || null,
        similars: JSON.parse(JSON.stringify(similars.slice(0, 3)))
      }
    },
    revalidate: 86400,
  };
}

export async function getStaticPaths() {
  const paths = [];
  for (let i = 1; i <= 100; i++) {
    paths.push({ params: { id: i.toString() } });
  }
  return {
    paths: paths,
    fallback: false,
  };
}
