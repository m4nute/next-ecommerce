import { useState } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import useCart from '../hooks/cartHook'
import { Product } from '../types';
import Image from "next/image";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PublicIcon from '@mui/icons-material/Public';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios';
import { getSession } from 'next-auth/react';

const StyledButton = styled(Button)(`
  text-transform: none;
`);

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const [name, setName] = useState('');
    const { removeProduct, updateProductQuantity, cart, removeAll } = useCart()

    const handleSubmit = (event: any) => {
        console.log('holaa')
        event.preventDefault();
        if (cart?.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cart is empty!',
                showCloseButton: true,
            }).then((result) => {
                if (result.isDismissed) {
                    return;
                }
            })

        }
        if (cardNumber === '' || expirationDate === '' || cvc === '' || country === '' || zip === '' || name === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cart is empty!',
                showCloseButton: true,
            }).then((result) => {
                if (result.isDismissed) {
                    return;
                }
            })
        }

        Swal.fire({
            icon: 'success',
            title: 'All done!',
            text: 'Checkout completed successfully',
            showConfirmButton: true,
        })

        axios.post('/api/stock', cart)
        .then((res) => {if (res.status === 203) {
            removeAll()
            router.back();
        }})
    }


    const router = useRouter();
    return (
        <div className='mx-32 text-gray-100'>
            <h1 className='text-4xl mt-8 text-center font-bold'>Checkout</h1>
            <h2 className='opacity-50 text-center'>It's fake, fill with random data</h2>
            <button onClick={() => router.back()}><ArrowBackIcon className='mr-1' />Go Back</button>
            <div className='flex mt-5 gap-8'>
                <div className='w-1/2'>
                    {cart?.length > 0 && <h1 className='text-3xl font-bold pb-4'>Total: ${cart?.reduce((total: number, item: any) => { return total + item.product.price * item.quantity }, 0)}</h1>}
                    <ul className=" overflow-y-scroll h-96 rounded-lg">
                        {cart?.length > 0 ? cart?.map(({ product, quantity }: { product: Product, quantity: number }, index: number) => {
                            return (
                                <div key={product.id} className={`w-full p-4 border-333 ${index === 0 ? 'pt-0' : 'border-t'}`}>
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
                                </div>)
                        })
                            :
                            <div className='flex flex-col justify-center h-full'>
                                <h1 className='opacity-50 text-3xl text-center'>Your Cart is Empty</h1>
                                <h1 className='opacity-50 text-2xl text-center'>Add items before accessing this page</h1>
                            </div>
                        }
                    </ul>
                </div>
                <div className='w-1/2'>
                    <form onSubmit={handleSubmit} className="w-2/3 mx-auto">
                        <div className='flex flex-col'>
                            <label className='font-bold'>Name on Card</label>
                            <input type="text" className='rounded-md h-9 p-4 mt-2 bg-222' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold mt-6'>Card Information <CreditCardIcon /></label>
                            <input type="text" className='rounded-md h-9 p-4 mt-2 bg-222' placeholder='1234 1234 1234 1234' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                            <div className='flex gap-2 mt-1'>
                                <input type="text" className='rounded-md h-9 p-4 mt-1 w-1/2 bg-222' placeholder='MM/YY' value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                                <input type="text" className='rounded-md h-9 p-4 mt-1 w-1/2 bg-222' placeholder='CVC' value={cvc} onChange={(e) => setCvc(e.target.value)} />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold mt-6'>Region <PublicIcon /></label>
                            <input type="text" className='rounded-md h-9 p-4 mt-2 bg-222' placeholder='China' value={country} onChange={(e) => setCountry(e.target.value)} />
                            <input type="text" className='rounded-md h-9 p-4 mt-2 bg-222' placeholder='Zip' value={zip} onChange={(e) => setZip(e.target.value)} />
                        </div>

                        <StyledButton disabled={cart?.length > 0 ? false : true} color='success' type='submit' variant="contained" className="bg-333 mt-8 w-full">Complete Payment</StyledButton>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default PaymentForm;


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
    return {
        props: {
        }
    };
}