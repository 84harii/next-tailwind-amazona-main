import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useContext, useState, useEffect } from "react";
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
import Confetti from "react-confetti";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state } = useContext(Store);
  // const { height, width } = useWindowDimensions();
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

  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Add event listener to update the screen size when it changes
    window.addEventListener("resize", updateScreenSize);

    // Initial screen size on component mount
    updateScreenSize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title ? title + " - RD" : "RD"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link
          rel="icon"
          href="https://i.postimg.cc/QMHG7Qts/RD-Luxurious-logo-1-transformed.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="h-30 py-2 mx-auto rounded-b-3xl container px-2 max-w-screen-2xl">
            <a
              href="/search?query="
              className="hover:text-white w-100 inline-flex justify-between items-center py-2 px-1 pr-1 mb-0 text-sm text-zinc-200 bg-zinc-100 rounded-full bg-zinc-900 bg-gradient-to-bl from-zinc-900 via-black to-zinc-900"
            >
              {/* <span className="text-xs bg-zinc-900 bg-gradient-to-bl from-zinc-900 via-zinc-700 to-zinc-900  rounded-full text-white px-4 py-1.5 mr-3">Welcome</span>  */}
              <span className="text-sm font-medium">
                <Marquee
                  pauseOnHover={true}
                  speed={33}
                  gradientWidth={46}
                  gradientColor={[255, 255, 255]}
                  gradient={false}
                >
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp; In pursuit of the finest , Among
                    our most popular products
                  </span>
                </Marquee>
              </span>
              <svg
                aria-hidden="true"
                className="ml-1 w-20 h-5"
                fill="#ffffff"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>

            <Confetti
              width={screenSize.width}
              height={screenSize.height}
              numberOfPieces={168}
              recycle={false}
              colors={[
                "#FF5733", // Orange
                "#FFC300", // Yellow
                "#FF5733", // Orange
                "#C70039", // Red
                "#900C3F", // Dark Red
                "#008080", // Teal
                "#009688", // Greenish
                "#4CAF50", // Green
                "#8BC34A", // Lime
                "#FFEB3B", // Yellow
                "#FF9800", // Orange
                "#FF5722", // Deep Orange
                "#9C27B0", // Purple
                "#673AB7", // Deep Purple
                "#3F51B5", // Indigo
                "#2196F3", // Blue
                "#03A9F4", // Light Blue
                "#00BCD4", // Cyan
                "#FF5722", // Deep Orange
                "#9C27B0", // Purple
                "#673AB7", // Deep Purple
                "#3F51B5", // Indigo
                "#2196F3", // Blue
                "#03A9F4", // Light Blue
                "#00BCD4", // Cyan
              ]}
            />

            <div className="mx-auto max-w-7xl px-0 sm:px-4 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <img
                        className="block h-12 w-auto"
                        src="https://i.postimg.cc/QMHG7Qts/RD-Luxurious-logo-1-transformed.png"
                        alt="RD"
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-center ps-2 lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <div className="relative">
                      <form onSubmit={submitHandler}>
                        <label
                          htmlFor="default-search"
                          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                          <SearchIcon className="h-5 w-5"></SearchIcon>
                        </label>
                        <div className="w-auto flex">
                          <input
                            id="default-search"
                            name="search"
                            className="block border-none italic w-full text-black rounded-md bg-gray-100 rounded-l-lg mx-2 py-2 pl-3 pr-3 leading-5 placeholder-gray-500 text-sm me-0"
                            placeholder="Search product"
                            type="search"
                            required
                            onChange={(e) => setQuery(e.target.value)}
                          />

                          <button
                            type="submit"
                            id="button-addon2"
                            className="text-zinc-800 mr-2 bg-gray-50 hover:bg-white focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-r-lg text-sm px-2 py-2"
                          >
                            <SearchIcon className="h-4 w-4"></SearchIcon>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="flex items-center z-10 ">
                    <Link
                      href="/cart"
                      className="p-2 font-medium text-zinc-900 rounded-lg flex justify-center items-center mr-2 bg-zinc-50 hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      <FiShoppingBag></FiShoppingBag>
                      {cartItemsCount > 0 && (
                        <span className="rounded-full px-1 py-1 text-xs font-bold text-zinc-900">
                          {cartItemsCount}
                        </span>
                      )}
                    </Link>

                    {status === "loading" ? (
                      "Loading"
                    ) : session?.user ? (
                      <Menu as="div" className="relative inline-block">
                        <Menu.Button className="flex justify-center items-center gap-0.5 rounded bg-zinc-50  p-2 font-medium rounded-lg outline-none hover:bg-zinc-100 hover:text-zinc-900 text-zinc-900">
                          <RiUser3Line></RiUser3Line>
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg p-2 rounded-lg">
                          <Menu.Item>
                            <DropdownLink
                              className="dropdown-link"
                              href="/profile"
                            >
                              Profile{" "}
                              <span className="bg-zinc-50 px-2 rounded-lg ml-2">
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
              </div>
            </div>

            {/* <Link href="/" className="text-lg font-bold flex items-center justify-center w-1/4 mb-2">
              <img
                src="https://i.postimg.cc/QMHG7Qts/RD-Luxurious-logo-1-transformed.png"
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
                className="rounded rounded-tl-none rounded-bl-none bg-zinc-200 p-2 text-sm dark:text-zinc-900"
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
                    className="text-zinc-800  hover:bg-white focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-1 py-1"
                  >
                    <SearchIcon className="h-4 w-4"></SearchIcon>
                  </button>
                </div>
              </form> */}
          </nav>
        </header>

        <harsh class="mt-24"></harsh>

        {/* <ParallaxBanner
      layers={[
        { image: 'https://react-scroll-parallax.damnthat.tv/img/banner-background.jpg', speed: -60 },
        {
          speed: -40,
          children: (
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-5xl text-white font-bold">RD LABELS</h1>
            </div>
          ),
        },
        { image: 'https://react-scroll-parallax.damnthat.tv/img/banner-foreground.png', speed: -10 },
      ]}
      className="aspect-[2/1]"
    /> */}

        <main className="container m-auto mt-5 px-2 max-w-screen-2xl">
          {children}
        </main>

        <div className="bg-white relative">
          <svg
            class="absolute inset-0 -z-10 h-full w-full stroke-gray-100 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none"></path>
              </pattern>
            </defs>
            <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                stroke-width="0"
              ></path>
            </svg>
            <rect
              width="100%"
              height="100%"
              stroke-width="0"
              fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
            ></rect>
          </svg>
          <div className="mx-auto max-w-7xl py-8 sm:px-2 sm:py-32 lg:px-4">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-10 gap-x-8 px-5 lg:max-w-none lg:grid-cols-3">
              <div className="text-center sm:flex sm:text-left lg:block lg:text-center">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <img
                      className="mx-auto h-20 w-24"
                      src="https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                  <h3 className="text-md font-medium text-gray-900">
                    Free Shipping
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    It&#039;s not actually free we just price it into the
                    products. Someone&#039;s paying for it, and it&#039;s not
                    us.
                  </p>
                </div>
              </div>

              <div className="text-center sm:flex sm:text-left lg:block lg:text-center">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <img
                      className="mx-auto h-20 w-24"
                      src="https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                  <h3 className="text-md font-medium text-gray-900">
                    24/7 Customer Support
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Our AI chat widget is powered by a naive series of if/else
                    statements. Guaranteed to irritate.
                  </p>
                </div>
              </div>

              <div className="text-center sm:flex sm:text-left lg:block lg:text-center">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <img
                      className="mx-auto h-20 w-24"
                      src="https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                  <h3 className="text-md font-medium text-gray-900">
                    Fast Shopping Cart
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Look how fast that cart is going. What does this mean for
                    the actual experience? I don&#039;t know.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="mt-24 bg-gray-900 sm:mt-12">
          <div class="mx-auto max-w-md overflow-hidden py-12 px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <section
              class=" flex flex-wrap justify-center"
              aria-label="Footer"
            >
              <div class="px-5 py-2">
                <a href="#" class="text-base text-gray-400 hover:text-gray-300">
                  About
                </a>
              </div>

              <div class="px-5 py-2">
                <a href="#" class="text-base text-gray-400 hover:text-gray-300">
                  Blog
                </a>
              </div>

              <div class="px-5 py-2">
                <a href="#" class="text-base text-gray-400 hover:text-gray-300">
                  Jobs
                </a>
              </div>

              <div class="px-5 py-2">
                <a href="#" class="text-base text-gray-400 hover:text-gray-300">
                  Press
                </a>
              </div>

              <div class="px-5 py-2">
                <a href="#" class="text-base text-gray-400 hover:text-gray-300">
                  Accessibility
                </a>
              </div>

              <div class="px-5 py-2">
                <a href="#" class="text-base text-gray-400 hover:text-gray-300">
                  Partners
                </a>
              </div>
            </section>
            <div class="mt-8 flex justify-center space-x-6">
              <a href="#" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">Facebook</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>

              <a href="#" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">Instagram</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>

              <a href="#" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">Twitter</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>

              <a href="#" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">GitHub</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>

              <a href="#" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">Dribbble</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <p class="mt-8 text-center text-base text-gray-400">
              &copy; 1999-2023 Radiant Destiny, Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
