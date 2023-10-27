import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Link from "next/link";

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

  return (
    <Layout title="Home Page">
    {/* <Carousel showThumbs={false} autoPlay>
      {featuredProducts.map((product) => (
        <div key={product._id}>
          <Link href={`/product/${product.slug}`} passHref className="flex">
            <img src={product.banner} alt={product.name} />
          </Link>
        </div>
      ))}
    </Carousel> */}

{/* -------- display links banner image here ------- */}
<img src="https://i.postimg.cc/YCNfBJqh/fpdl-in-portrait-attractive-caucasian-smiling-woman-isolated-white-studio-shot-drinking-water-1258.jpg" width='100%' className="rounded-3xl" alt='banner image' />

      <h1 class="from-black via-lime-800 to-lime-950 bg-gradient-to-r bg-clip-text text-transparent mb-2 mt-12 text-2xl font-semibold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-grey-800 text-center">Unveil the Best Deal</h1>
      <p class="mb-12 text-md font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">Discover Quality Goods</p>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mt-7">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
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
