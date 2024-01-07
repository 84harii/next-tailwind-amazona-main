import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import { useState } from "react";
import AnimatedTextCharacter from "../components/AnimatedTextCharacter";
import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosTrendingUp } from "react-icons/io";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/effect-fade";
import Usps from "../components/Usps";

export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  };

  const [showNotification, setShowNotification] = useState(true);

  const handleDismiss = () => {
    setShowNotification(false);
  };
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <Layout title="Home Page">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 4600,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div class="relative shadow-xl sm:overflow-hidden rounded-3xl">
            <div class="absolute inset-0">
              <img
                class="h-full w-full object-cover"
                src="https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?w=1380&t=st=1704627517~exp=1704628117~hmac=87db9f68ff46bac86c9fc6d130e17049763746338026efe131f91854e00fbe17"
                alt="People working on laptops"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 mix-blend-multiply"></div>
            </div>
            <div class="relative py-16 px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 class="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span class="block text-white">Unveiling Trends,</span>
                <AnimatedTextCharacter
                  text="Elevating Lives!"
                  className="text-teal-200"
                />
              </h1>
              <p class="mx-auto mt-6 max-w-lg text-center text-xl text-violet-100 sm:max-w-3xl">
                We brings you a curated collection of trending products
              </p>
              <div class="mx-auto mt-10 max-w-sm sm:max-w-none flex items-center justify-center">
                <a
                  href="/search?query="
                  class="tracking-tight text-inter inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  View Trending Products
                  <IoIosTrendingUp className="-mr-1 ml-3 h-5 w-5 text-gray-800" /> 
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div class="absolute inset-0">
              <img
                class="h-full w-full object-cover"
                src="https://img.freepik.com/free-photo/sale-concept-with-copy-space_23-2148313074.jpg?w=1380&t=st=1704627588~exp=1704628188~hmac=b11e20c1aaa14cc2bd705665be4eb97e05a16ae85482358237b00417498ef231"
                alt="People working on laptops"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 mix-blend-multiply"></div>
            </div>
            <div class="relative py-16 px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 class="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span class="block text-white">Elevating Lives!</span>
                <AnimatedTextCharacter
                  text="Unveiling Trends"
                  className="text-teal-200"
                />
              </h1>
              <p class="mx-auto mt-6 max-w-lg text-center text-xl text-violet-100 sm:max-w-3xl">
                We brings you a curated collection of trending products
              </p>
              <div class="mx-auto mt-10 max-w-sm sm:max-w-none flex items-center justify-center">
                <a
                  href="/search?query="
                  class="tracking-tight text-inter inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  View Trending Products
                  <IoIosTrendingUp className="-mr-1 ml-3 h-5 w-5 text-gray-800" />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span className="text-slate-400" ref={progressContent}></span>
        </div>
      </Swiper>

      <div
        className={`fixed inset-x-0 bottom-0 pb-2 sm:pb-5 z-10 ${
          showNotification ? "" : "hidden"
        }`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-gray-900 p-2 custom-hover-shadow sm:p-3">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex w-0 flex-1 items-center">
                <span className="flex rounded-lg bg-gray-700 p-2">
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                    />
                  </svg>
                </span>
                <p className="ml-3 truncate font-medium text-white">
                  <span className="md:hidden">We announced a new product!</span>
                  <span className="hidden md:inline">
                    Big news! We're excited to announce a brand new product.
                  </span>
                </p>
              </div>
              <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                <Link
                  href="/product/ap-grey"
                  className="btn-hover flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-gray-950 shadow-sm hover:bg-violet-50"
                >
                  Learn more
                </Link>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button
                  type="button"
                  className="-mr-1 flex rounded-md p-2 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-white dismiss_btn"
                  onClick={handleDismiss}
                >
                  <span className="sr-only">Dismiss</span>
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------- display links banner image here ------- */}

      <AnimatedTextCharacter
        text="Unveil the Best Deal"
        className="font-inter mb-2 mt-12 text-2xl font-semibold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl"
      />
      <p className="mb-12 text-base text-gray-400 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
        Discover Quality Goods
      </p>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mt-7">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>

      <Usps />
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
