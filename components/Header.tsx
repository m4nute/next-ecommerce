import Link from "next/link";
import React, { useState } from "react";
import OwnNavLink from "../components/NavLink";
import Badge, { BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import 'react-modern-drawer/dist/index.css'
import Drawer from 'react-modern-drawer'
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import { Product } from "../types";
import useCart from '../hooks/cartHook'
import { styled } from "@mui/material";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react"
import {  Text, Avatar, Dropdown } from "@nextui-org/react";

const StyledButton = styled(Button)(`
  text-transform: none;
`);


function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const router = useRouter()

  const { data: session } = useSession()

  const { removeProduct, updateProductQuantity, cart, removeAll } = useCart()

  const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    "& .MuiBadge-badge": {
      right: -1,
      top: 13,
      padding: "0 4px",
      backgroundColor: "#fff",
      border: "2px solid #111",
      color: "#000",
      fontWeight: "bold",
    },
  }));

  return (
    <header
      className='p-4 sticky inset-x-0 top-0 z-50 transition-all bg-opacity-80 bg-clip-padding duration-100 navTransition text-gray-200 bg-111 navDefault'
    >
      <div className="flex justify-between">
        <Link className={`font-bold text-3xl flex w-1/4 text-222`} href="/">
          <p
            className={`flex flex-col justify-center text-gray-200 transition-all duration-300`}
          >
            Peda Store
          </p>
        </Link>

        <div className="flex justify-center w-1/2">
          <OwnNavLink navText={"Best Deals"} redirect={"/?sort=discountPercentage%2F-1"} align={true} />
          <OwnNavLink navText={"Limited Products"} redirect={"/?stock=limited"} align={true} />
        </div>

        <div className="w-1/4 justify-end flex carrito">
          {!session ?
            <>
              <OwnNavLink navText={"Sign In"} redirect={"/login"} align={true} />
              <OwnNavLink navText={"Sign Up"} redirect={"/signup"} align={true} />
            </>
            :
            <div className="flex flex-col justify-center mr-2">
              <Dropdown placement="bottom-right">
                <Dropdown.Trigger>
                  <Avatar
                    as="button"
                    size="md"
                    src={session.user?.image || undefined}
                  />
                </Dropdown.Trigger>
                <Dropdown.Menu
                  aria-label="User menu actions"
                  color="secondary"
                  onAction={key => {
                    if (key === 'purchases') {
                      router.push('/account#purchases')
                    }
                    else if (key === 'account') {
                      router.push('/account')
                    }
                    else if (key === 'logout') {
                      signOut({ callbackUrl: 'http://localhost:3000/login' })
                    }
                  }}
                >
                  <Dropdown.Item key="profile" css={{ height: "$18" }} textValue="hola">
                    <Text b color="inherit" css={{ d: "flex" }} className="w-full">
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }} className="w-full">
                      <span className={` ${session?.user?.email && session?.user?.email?.length > 22 ? "text-sm" : "text-md"} text-ellipsis overflow-hidden whitespace-nowrap`}>
                        {session.user?.email}
                      </span>
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item textValue="hola" key="account" withDivider>My Account</Dropdown.Item>
                  <Dropdown.Item textValue="hola" key="purchases">Purchases</Dropdown.Item>
                  <Dropdown.Item textValue="hola" key="logout" withDivider color="error" >
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          }

          <IconButton onClick={toggleDrawer}>
            <StyledBadge
              badgeContent={cart?.length}
              color="secondary"
              className="hover:scale-110 duration-200 transition-all"
            >
              <ShoppingBagOutlinedIcon
                className="text-white text-3xl"
                fontSize="large"
              />
            </StyledBadge>
          </IconButton>
          <Drawer
            customIdSuffix="drawer"
            open={isOpen}
            onClose={toggleDrawer}
            direction='right'
            style={{ backgroundColor: '#111' }}
            size={`400px`}
          >
            <div className="h-screen py-6 px-4">
              <div className="h-3/4 overflow-y-scroll">
                <div className="flex justify-between"><h1 className="text-2xl font-bold ml-4 mt-1">My Cart</h1> <span className="text-3xl hover:cursor-pointer mr-3" onClick={toggleDrawer}> &times;</span></div>

                {cart?.length > 0 ?
                  <ul className="pb-4">
                    {cart.map(({ product, quantity }: { product: Product, quantity: number }) => {
                      return <li className="mt-4 ml-4" key={product.id}>
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
                          <Button onClick={() => removeProduct(product.id)} variant='contained' className="bg-333 py-2 px-4 w-10 rounded-md duration-200 transition-all hover:bg-444"><DeleteIcon fontSize="small" /></Button>
                          <div className="flex ml-4">
                            <h1 className="mx-3 flex"><span className="font-bold flex flex-col justify-center pr-2">Amount:</span> <span className="flex flex-col justify-center">{quantity}</span></h1>
                            <Button color="info" variant="contained" className="bg-333 mr-3" onClick={() => {
                              quantity === 1 ? (removeProduct(product.id)) :
                                updateProductQuantity(product.id, (quantity - 1))
                            }}> - </Button>
                            <Button color="info" variant="contained" className="bg-333" onClick={() => updateProductQuantity(product.id, (quantity + 1))}> + </Button>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>

                  :
                  <h1 className="mt-20 flex justify-center text-gray-300">No items added to the cart</h1>}
              </div>
              {cart?.length > 0 &&
                <div className="h-1/4 border-t">
                  <div className="flex flex-col justify-between h-full">
                    <div className="ml-4">
                      <div className="flex justify-between mt-4">
                        <h2 className="font-bold">Subtotal: ${cart.reduce((total: number, item: any) => { return total + item.product.price * item.quantity + item.product.price * item.quantity * item.product.discountPercentage / 100 }, 0).toFixed(0)}</h2>
                        <StyledButton variant='contained' className="bg-333" color="error" onClick={() => removeAll()}>Delete All <DeleteIcon className="pl-1" /></StyledButton>
                      </div>
                      <h2 className="text-sm">Discount: ${cart.reduce((discount: number, item: any) => { return discount + item.product.price * item.quantity * item.product.discountPercentage / 100 }, 0).toFixed(0)}</h2>
                      <h2 className="mt-4 font-bold">Total: ${cart.reduce((total: number, item: any) => { return total + item.product.price * item.quantity }, 0)}</h2>
                    </div>
                    <StyledButton color="primary" variant="contained" className='bg-333 w-full text-md' onClick={() => {
                      router.push('/checkout'); setIsOpen(false)
                    }}>Proceed to Checkout</StyledButton>
                  </div>
                </div>
              }

            </div>
          </Drawer>
          {/* <PlansBtn /> */}

        </div>
      </div>

    </header>
  );
}

export default Header;
