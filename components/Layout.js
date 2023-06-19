import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import DropdownLink from "./DropdownLink";
import { useRouter } from "next/router";
import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { RiUser3Line } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
import Marquee from "react-fast-marquee";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  const [query, setQuery] = useState("");

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + " - RD" : "RD"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="h-30 px-4 py-2 max-w-screen-2xl mx-auto">

            <a href="/search?query=" class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-0 text-sm text-lime-700 bg-lime-100 rounded-full dark:bg-lime-100 dark:text-lime-900 hover:bg-lime-200 dark:hover:bg-lime-100">
              <span class="text-xs bg-lime-900 rounded-full text-white px-4 py-1.5 mr-3">Welcome</span> <span class="text-sm font-medium">
                <Marquee
                  pauseOnHover={true}
                  speed={46}
                  gradientWidth={46}
                  gradientColor={[255, 255, 255]}
                  gradient={false}
                >
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp; In pursuit of the finest , Among our
                    most popular products
                  </span>
                </Marquee>
              </span>
              <svg aria-hidden="true" class="ml-2 w-20 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
            </a>




            <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div class="flex h-16 justify-between">
              <div class="flex lg:px-0">
                <div class="flex flex-shrink-0 items-center">
                  <Link href="/" >
                    <img class="block h-12 w-auto" src="https://i.postimg.cc/KjFnRqnt/RD-Luxurious-logo-1.png"
                      alt="RD" />
                  </Link>
                </div>
              </div>
              <div class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div class="w-full max-w-lg lg:max-w-xs">
                  <div class="relative"> 
                    <form onSubmit={submitHandler} >
                      <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      >
                        <SearchIcon className="h-5 w-5"></SearchIcon>
                      </label>
                      <div className="w-auto flex">
                        <input id="default-search" name="search"
                          class="block border-none italic w-full text-black rounded-md bg-gray-50 rounded-lg bg-white mx-2 py-2 pl-3 pr-3 leading-5 placeholder-gray-500 text-sm"
                          placeholder="Search product" type="search"  required
                          onChange={(e) => setQuery(e.target.value)} />
 
                        <button
                          type="submit"
                          id="button-addon2"
                          className="text-lime-800 bg-gray-50 hover:bg-white focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-2 py-2"
                        >
                          <SearchIcon className="h-4 w-4"></SearchIcon>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>




            {/* <Link href="/" className="text-lg font-bold flex items-center justify-center w-1/4 mb-2">
              <img
                src="https://i.postimg.cc/KjFnRqnt/RD-Luxurious-logo-1.png"
                width="52"
              />
            </Link>
            <div className="flex items-center justify-center w-3/4">  
              onSubmit={submitHandler}
              className="mx-auto justify-center items-center flex"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-2 text-sm focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-lime-200 p-2 text-sm dark:text-lime-900"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
            </form> */}

            {/* <form onSubmit={submitHandler} className="grow">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  <SearchIcon className="h-5 w-5"></SearchIcon>
                </label>
                <div className="w-auto flex">
                  <input
                    id="default-search"
                    className="block w-90 p-2 pl-4 text-sm text-gray-900 border border-none rounded-lg bg-[#f3f3f3] focus:none focus:none"
                    required
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Search products"
                  />
                  <button
                    type="submit"
                    id="button-addon2"
                    className="text-lime-800  hover:bg-white focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-1 py-1"
                  >
                    <SearchIcon className="h-4 w-4"></SearchIcon>
                  </button>
                </div>
              </form> */}

            {/* <div className="flex items-center z-10 ">
              <Link
                href="/cart"
                className="p-2 font-medium text-lime-900 rounded-lg flex justify-center items-center mr-2 bg-lime-50 hover:bg-lime-100 hover:text-lime-900"
              >
                <FiShoppingBag></FiShoppingBag>
                {cartItemsCount > 0 && (
                  <span className="rounded-full px-1 py-1 text-xs font-bold text-lime-900">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="flex justify-center items-center gap-0.5 rounded bg-lime-50  p-2 font-medium rounded-lg outline-none hover:bg-lime-100 hover:text-lime-900 text-lime-900">
                    <RiUser3Line></RiUser3Line>
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg p-2 rounded-lg">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile{" "}
                        <span className="bg-lime-50 px-2 rounded-lg ml-2">
                          {session.user.name}
                        </span>
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
            </div> 
            </div>*/}
          </nav>
 

        </header>


        <main className="container m-auto mt-24 px-4">{children}</main>

        <div class="bg-slate-50">
          <div class="mx-auto max-w-7xl py-8 sm:px-2 sm:py-32 lg:px-4">
            <div class="mx-auto grid max-w-2xl grid-cols-1 gap-y-10 gap-x-8 px-5 lg:max-w-none lg:grid-cols-3">
              <div class="text-center sm:flex sm:text-left lg:block lg:text-center">
                <div class="sm:flex-shrink-0">
                  <div class="flow-root">
                    <img class="mx-auto h-20 w-24" src="https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg" alt="" />
                  </div>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                  <h3 class="text-md font-medium text-gray-900">Free Shipping</h3>
                  <p class="mt-2 text-sm text-gray-500">It&#039;s not actually free we just price it into the products. Someone&#039;s paying for it, and it&#039;s not us.</p>
                </div>
              </div>

              <div class="text-center sm:flex sm:text-left lg:block lg:text-center">
                <div class="sm:flex-shrink-0">
                  <div class="flow-root">
                    <img class="mx-auto h-20 w-24" src="https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg" alt="" />
                  </div>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                  <h3 class="text-md font-medium text-gray-900">24/7 Customer Support</h3>
                  <p class="mt-2 text-sm text-gray-500">Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.</p>
                </div>
              </div>

              <div class="text-center sm:flex sm:text-left lg:block lg:text-center">
                <div class="sm:flex-shrink-0">
                  <div class="flow-root">
                    <img class="mx-auto h-20 w-24" src="https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg" alt="" />
                  </div>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                  <h3 class="text-md font-medium text-gray-900">Fast Shopping Cart</h3>
                  <p class="mt-2 text-sm text-gray-500">Look how fast that cart is going. What does this mean for the actual experience? I don&#039;t know.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <footer className="flex h-10 justify-center items-center bg-lime-50  py-2 px-4 font-medium rounded-lg outline-none hover:bg-lime-100 hover:text-lime-900 text-lime-900 text-sm">
          <p><a href="/login">Copyright</a> © <a href="/admin/dashboard">1999-2023 RD</a></p>
        </footer>
      </div>
    </>
  );
}
