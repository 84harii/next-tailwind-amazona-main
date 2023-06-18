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
          <nav className="h-30  px-4 py-2 ">
            <Marquee
              pauseOnHover={true}
              speed={46}
              gradientWidth={46}
              gradientColor={[255, 255, 255]}
              gradient={true}
            >
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp; In pursuit of the finest , Among our
                most popular products
              </span>
            </Marquee>
            <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-bold">
              <img
                src="https://i.postimg.cc/KjFnRqnt/RD-Luxurious-logo-1.png"
                width="52"
              />
            </Link>
            {/* <form
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

            <form onSubmit={submitHandler} className="mx-4 grow">
              <label
                for="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </label>
              <div className="relative">
                
                <input
                  id="default-search"
                  className="block w-full p-2 pl-4 text-sm text-gray-900 border border-none rounded-lg bg-zinc-50 focus:ring-lime-500 focus:border-lime-500  "
                  required
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search products"
                />
                <button
                  type="submit"
                  id="button-addon2"
                  className="text-lime-800 absolute right-2.5 bottom-[0.4rem] bg-lime-100 hover:bg-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-1 py-1"
                >
                  <SearchIcon className="h-4 w-4"></SearchIcon>
                </button>
              </div>
            </form>

            <div className="flex items-center z-10 ">
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
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-24 px-4">{children}</main>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-zinc-400">
                  Happy Customers
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-lime-900 sm:text-5xl">
                  84K
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-zinc-400">
                  Assets under holding
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-lime-900 sm:text-5xl">
                  $1 Million
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-zinc-400">
                  New users annually
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-lime-900 sm:text-5xl">
                  4,600
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <footer className="flex h-10 justify-center items-center bg-lime-50  py-2 px-4 font-medium rounded-lg outline-none hover:bg-lime-100 hover:text-lime-900 text-lime-900">
          <p>Copyright © 1999-2023 RD</p>
        </footer>
      </div>
    </>
  );
}
