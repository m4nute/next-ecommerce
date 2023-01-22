import React, { useState } from 'react'
import { getSession } from 'next-auth/react'
import Image from "next/image";
import { Product } from '../types';
import getPurchases from './api/purchases';
import { Button } from '@mantine/core';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar } from "@nextui-org/react";
import { signOut } from 'next-auth/react'

function parseISOString(s: any) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function account(props: any) {
  let { data } = props

  const purchases = JSON.parse(data.purchases)

  const [pIndex, setPIndex] = useState(0)
  return (
    <div className='flex flex-col md:flex-row mt-10 gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16 mx-3 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 text-white'>
      <div className='w-full md:w-1/2'>
        <h1 className='font-bold text-2xl text-center'>Purchases</h1>
        <h2 className='font-bold opacity-75 text-lg text-center pb-3'>{purchases.length} Total Purchases</h2>
        {purchases.length > 0 ? purchases.map((purchase: any, index: number) => {
          if (index !== pIndex) return;
          let date = parseISOString(purchase.datetime)
          return (
            <div key={Date.now()}>
              <h2 className='text-center mt-4'><span className='font-bold'>Date:</span> {date.toString().split('GMT')[0]}</h2>
              <h2 className='mb-3 text-center'><span className='font-bold'>Total:</span> ${purchase.cart?.reduce((total: number, item: any) => { return total + item.product.price * item.quantity }, 0)}</h2>
              <ul className=" overflow-y-scroll h-96 rounded-lg pt-4 border border-333 pl-4">
                {purchase.cart?.map(({ product, quantity }: { product: Product, quantity: number }, index: number) => {
                  return (
                    <div key={product.id} className={`w-full p-2 pl-0 border-333 ${index === 0 ? 'pt-0' : 'border-t'}`}>
                      <li>
                        <div className="flex">
                          <div className="relative w-20 h-20">
                            <Image src={product.thumbnail} alt={product.title} fill priority className="object-contain" sizes="(max-width: 1400px) 60%, (max-width: 1100px) 50%" />
                          </div>
                          <div className="pl-4 flex flex-col justify-center gap-2">
                            <h1 className="text-white">{product.title}</h1>
                            <div className="flex">
                              <h1 className="font-bold">${product.price}</h1>
                              <h1 className="text-green-400 ml-4">{product.discountPercentage}% OFF</h1>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex">

                          <div className="flex">
                            <h1 className="flex"><span className="font-bold flex flex-col justify-center pr-2">Amount:</span> <span className="flex flex-col justify-center">{quantity}</span></h1>
                          </div>
                        </div>
                      </li>
                    </div>)
                })}
              </ul>
              <div className='text-center mt-4'>
                <Button className='bg-333' disabled={index > 0 && purchases.length > 1 ? false : true} onClick={() => setPIndex(pIndex - 1)}><ArrowBackIcon /></Button>
                <Button className='bg-333' disabled={index + 1 < purchases.length && purchases.length > 1 ? false : true} onClick={() => setPIndex(pIndex + 1)} ><ArrowForwardIcon /></Button>
              </div>
            </div>

          )
        }) : <h2 className='text-center text-2xl'>No Purchases Made</h2>}

      </div>
      <div className='w-full md:w-1/2 pb-10 md:pb-0'>
        <h1 className='text-center font-bold text-2xl pb-2 md:pb-8 mt-6 md:mt-0'>My Data</h1>
        <div className='flex rounded-md'>
          <Avatar
            className='mt-3 mr-4'
            as="button"
            size="xl"
            src={data.session.user?.image || 'https://imgs.search.brave.com/lfVSxDcSs8exH_5USRuckuzsveb1aaqhT7f17NhiDaM/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU4L2Yy/L2RlLzU4ZjJkZTUw/YmFkMGZiMjRjMjRk/NDc1Nzg0MWQ1N2M0/LmpwZw' || undefined}
          />
          <div>
            <h2 className='text-lg md:text-md'><span className='font-bold'>Name:</span> {data.session.user?.name}</h2>
            <h2 className='text-lg md:text-md mt-1 text-ellipsis overflow-hidden w-full whitespace-nowrap'><span className='font-bold'>Email: </span>{data.session.user?.email}</h2>
            <h2 className='text-lg md:text-md mt-1'><span className='font-bold'>Total Spent:</span> ${purchases.reduce((sum: number, purchase: any) => {
              return sum + purchase.cart?.reduce((total: number, item: any) => { return total + item.product.price * item.quantity }, 0)
            }, 0)}
            </h2>
            <Button className='bg-333 duration-200 transition-all mt-3' color='red' onClick={() => signOut()}>Log Out</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default account

export async function getServerSideProps(context: any) {

  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const purchases = await getPurchases(session.user?.email)

  return {
    props: {
      data: {
        session: session,
        purchases: JSON.stringify(purchases)
      }
    }
  }
}