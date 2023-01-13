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

const StyledButton = styled(Button)(`
  text-transform: none;
`);



function ProductPage({ data }: any) {
  const { cart, addProduct } = useCart()
  const [qty, setQty] = useState(1)
  const [selected, setSelected] = useState<number>(0);
  const router = useRouter()
  if (data) {
    return (
      <div className="flex px-32 pt-10">
        <div className="flex w-1/2 max-h-fit flex-col">
          <div className="relative w-full h-96 bg-222">
            <Image
              src={data.images[selected]}
              alt={data.title}
              fill
              sizes="(max-width: 1300px) 75%, (max-width: 1000px) 60%"
              priority
              className="object-contain"
            />
          </div>
          <div className="flex w-full justify-center gap-4 mt-10">
            {data.images.map((image: string, index: number) => {
              return (
                <div
                  key={index}
                  onMouseEnter={() => setSelected(index)}
                  className="relative w-16 h-16 duration-100 transition-all border border-gray-600 hover:border-2 hover:border-green-400 shadow-sm"
                >
                  <Image
                    src={image}
                    alt={data.title}
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
        <div className="text-white ml-12 p-8 pt-8 rounded-md card w-1/2">
          <h1 className="text-3xl">{data.title}</h1>
          <div className="flex gap-2 mt-3">
            <StarRating readOnly={true} rating={data.rating} />
            <span className="text-green-400">({data.rating})</span>
          </div>
          <div>
            <div className="flex mt-8">
              <h1 className="text-lg line-through text-gray-400">
                ${(data.price + (data.price * data.discountPercentage) / 100).toFixed(2)}
              </h1>
            </div>
            <div className="flex">
              <h1 className="text-3xl mt-2">${data.price.toFixed(2)}</h1>
              <h2 className="text-green-400 pt-2 pl-2 text-lg">{data.discountPercentage}% OFF</h2>
            </div>
            <div className="mt-8 flex">
              <StoreIcon fontSize="medium" />
              <div>
                <h1 className="text-lg pl-2">
                  Publisher
                </h1>
                <h2 className="text-gray-400 text-md  pl-2">
                  {data.brand}
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <span className="text-lg"><InventoryIcon /> Stock Available</span>
            </div>

            <div className="flex mt-6">
              <h1 className="flex"><span className="text-lg flex flex-col justify-center pr-2">Amount:</span> <span className="flex flex-col justify-center mr-4">{qty}</span></h1>
              <Button color="info" variant="contained" className="bg-333 mr-3" onClick={() => !(qty === 1) && (setQty(qty - 1))}> - </Button>
              <Button color="info" variant="contained" className='bg-333' onClick={() => !(qty >= 10) && (setQty(qty + 1))}> + </Button>
              <span className="text-green-400 text-md ml-4">{data.stock} Available </span>
            </div>
            <div className="flex gap-4 mt-6">
              {cart?.map((obj: any) => obj.product.id).includes(data.id) ?
                <div className="flex w-1/2">
                  <StyledButton color="success" variant="contained" className="bg-333 w-full text-md" onClick={() => addProduct(data, qty, true)}>
                    Update amount
                  </StyledButton>
                </div>
                :
                <StyledButton color="success" variant="contained" className="bg-333 w-1/2 text-md" onClick={() => addProduct(data, qty)}>
                  Add to Cart
                </StyledButton>
              }
              <StyledButton color="success" variant="contained" className='bg-333 w-1/2 text-md' onClick={() => {
                if (cart.every((item: any) => item.product.id !== data.id)) {
                  addProduct(data, qty)
                }
                router.push('/checkout');
            }}>Proceed to checkout</StyledButton>
            </div>
          </div>
        </div>
      </div >
    )
  }
  return <>No data found...</>;
}

export default ProductPage;

export async function getStaticProps({ params: { id } }: any) {
  id = id!;
  await dbConnect();
  const data: Product | null = await ProductModel.findOne({ id: id });
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)) || null,
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
