import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store'; 
import Collapsible from 'react-collapsible';
import { useState } from 'react';
import { useEffect } from 'react';
import { CountUp } from 'use-count-up'
import { FiShoppingBag } from "react-icons/fi";

export default function ProductScreen(props) {
  const { product } = props;
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * (20 - 10 + 1)) + 10; // Generate a random number between 10 and 20
      setRandomNumber(random);
    }, 4000); // Set the interval to 1 second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>

      <div className="py-2">
        <Link href="/">
          <button type="button" className="flex items-center justify-center gap-1 py-0.5 px-2 mr-2 mb-2 text-sm font-sm text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-black-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
            Back to home
          </button>
        </Link>
      </div>


      <div className="grid md:grid-cols-2 md:gap-2">
        <div className="md:col-span-1 max-w-lg" >
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          ></Image>
        </div>

        <div>
          <div className="block w-full p-6 bg-zinc-50 rounded-lg">
            <h1 className="mb-2 text-lg font-semibold tracking-tight from-black via-lime-800 to-lime-950 bg-gradient-to-r bg-clip-text text-transparent">{product.name}</h1>
         
            <p className="font-normal text-gray-700 dark:text-gray-400">

              <div className="card text-sm">
                <div className="mb-2 flex justify-between text-gray-500">
                  <span>Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="mb-2 flex justify-between text-gray-500">
                  <span>Brand:</span>
                  <span>{product.brand}</span>
                </div>
                <div className="mb-2 mt-6 flex justify-between text-gray-500">
                  <span>
                    <div className="flex items-center">
                      <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      <p className="ml-2 text-sm font-bold text-gray-700">4.95</p>
                      {/* <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                      <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline">84 reviews</a> */}
                    </div>
                  </span>
                  <span>Current Spectators : <b>{randomNumber}</b></span>
                </div>
              </div>

              <Collapsible trigger="See All Product Details" >
                <div className='bg-white p-2 text-sm'>
                  {product.description}
                </div>
              </Collapsible>
            </p>
          </div>
          <div>
            <div className="card p-5 text-right">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div className='text-3xl font-semibold'>₹
                  <CountUp isCounting end={product.price} duration={2} />
                </div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>
              </div>
              {/* <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button> */}
            {/* <button class="button-84 mt-4" role="button" 
            type="button"
            onClick={addToCartHandler}>
              <div class="button-84__content">
                <span class="button-84__text text">
                  Add to cart <FiShoppingBag></FiShoppingBag>
                </span>
              </div>
            </button> */}


            <button class="button btn-cart mt-4" role="button" 
            type="button"
            onClick={addToCartHandler}><span><span>Add to My Bag</span></span></button>

              {/* <Link href={`https://rzp.io//l/${product.slug}`} className="inline-flex items-center justify-center mx-auto mt-4 text-gray-100 hover:text-gray-200 hover:bg-lime-800 bg-lime-900  font-medium rounded-lg text-sm px-5 py-3 text-center">
                Order Now with razorpay <span className="inline-flex items-center justify-center px-2 py-2 w-auto h-4 ml-2 text-xs font-semibold text-lime-900 bg-white rounded-full">
                  ₹ {product.price}
                </span>
              </Link> */}
            </div>
          </div>
        </div>

      </div>
      



      {/* ------------------------------------------------ Review ------------------------------------------------ */}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-10 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-lg font-medium text-gray-900">What Our Customers Says</h2>
          <div className="mt-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
            <div className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                <div className="flex items-center xl:col-span-1">
                  <div className="flex items-center">
                    <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>

                    <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>

                    <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>

                    <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>

                    <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">5<span className="sr-only"> out of 5 stars</span></p>
                </div>

                <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                  <h3 className="text-sm font-medium text-gray-900">Can&#039;t say enough good things</h3>

                  <div className="mt-3 space-y-6 text-sm text-gray-500">
                    <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
                    <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                <p className="font-medium text-gray-900">Risako M</p>
                <time dateTime="2021-01-06" className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">May 16, 2021</time>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
