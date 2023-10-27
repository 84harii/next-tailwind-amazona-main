import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5 mt-4">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                          }}
                        ></Image>
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="bg-lime-900 hover:bg-lime-800 text-white font-semibold w-full py-2 px-4 border border-lime-900 rounded shadow"
                >
                  Proceed to payment 
                   {/* <svg width="35" height="60" viewBox="0 0 65 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M42.515 49.881C42.7527 50.1634 42.9322 50.49 43.0432 50.842C43.1542 51.1941 43.1945 51.5646 43.1618 51.9322C43.1291 52.2999 43.024 52.6574 42.8526 52.9843C42.6812 53.3112 42.4468 53.601 42.163 53.837L30.709 63.43C30.2018 63.848 29.5663 64.0789 28.909 64.084C28.8049 64.0818 28.701 64.0731 28.598 64.058C28.2208 64.0179 27.8556 63.9016 27.5247 63.7161C27.1938 63.5307 26.904 63.2799 26.673 62.979L21.813 56.612C21.5853 56.3188 21.4179 55.9834 21.3204 55.6252C21.2229 55.2669 21.1973 54.893 21.2451 54.5248C21.2928 54.1566 21.413 53.8016 21.5986 53.48C21.7842 53.1585 22.0317 52.8769 22.3266 52.6515C22.6216 52.4261 22.9583 52.2613 23.3173 52.1666C23.6763 52.0719 24.0504 52.0492 24.4182 52.0999C24.786 52.1505 25.1401 52.2734 25.4602 52.4615C25.7802 52.6497 26.0599 52.8993 26.283 53.196L29.359 57.227L38.559 49.527C38.8416 49.2884 39.1686 49.1081 39.5212 48.9966C39.8738 48.8851 40.245 48.8445 40.6134 48.8772C40.9817 48.9099 41.34 49.0153 41.6674 49.1873C41.9948 49.3592 42.2849 49.5943 42.521 49.879L42.515 49.881ZM32.2 72.3C35.3295 72.3006 38.3889 71.3732 40.9913 69.635C43.5937 67.8968 45.6222 65.426 46.8204 62.535C48.0185 59.6439 48.3325 56.4625 47.7225 53.393C47.1126 50.3236 45.6061 47.5039 43.3937 45.2906C41.1812 43.0773 38.3621 41.5697 35.2929 40.9586C32.2236 40.3475 29.0421 40.6603 26.1506 41.8573C23.2591 43.0544 20.7875 45.082 19.0483 47.6837C17.3092 50.2855 16.3806 53.3445 16.38 56.474C16.3829 60.6694 18.0504 64.6922 21.0164 67.6593C23.9824 70.6265 28.0046 72.2955 32.2 72.3ZM32.2 35.03C27.9577 35.0296 23.8106 36.2873 20.2832 38.6439C16.7557 41.0006 14.0064 44.3504 12.3828 48.2697C10.7593 52.1891 10.3345 56.5018 11.1622 60.6625C11.9898 64.8233 14.0328 68.6451 17.0327 71.6447C20.0326 74.6443 23.8546 76.6869 28.0154 77.5142C32.1762 78.3415 36.4889 77.9163 40.4081 76.2924C44.3273 74.6685 47.6768 71.9188 50.0332 68.3912C52.3895 64.8635 53.6468 60.7163 53.646 56.474C53.6402 50.7878 51.3789 45.3361 47.3583 41.3151C43.3377 37.2942 37.8862 35.0324 32.2 35.026V35.03ZM58.779 28.588H50.261V32.832C50.261 33.5778 49.9647 34.293 49.4374 34.8204C48.91 35.3477 48.1948 35.644 47.449 35.644C46.7032 35.644 45.988 35.3477 45.4606 34.8204C44.9333 34.293 44.637 33.5778 44.637 32.832V28.584H19.763V32.828C19.763 33.5738 19.4667 34.289 18.9394 34.8164C18.412 35.3437 17.6968 35.64 16.951 35.64C16.2052 35.64 15.49 35.3437 14.9626 34.8164C14.4353 34.289 14.139 33.5738 14.139 32.828V28.584H5.621V79.278C5.621 80.6306 6.15832 81.9278 7.11475 82.8842C8.07119 83.8407 9.3684 84.378 10.721 84.378H53.682C55.0346 84.378 56.3318 83.8407 57.2882 82.8842C58.2447 81.9278 58.782 80.6306 58.782 79.278V28.584L58.779 28.588ZM19.763 18.06C19.763 16.4267 20.0847 14.8095 20.7097 13.3006C21.3347 11.7916 22.2508 10.4206 23.4057 9.26571C24.5606 8.11083 25.9316 7.19473 27.4406 6.56971C28.9495 5.94469 30.5668 5.623 32.2 5.623C33.8333 5.623 35.4505 5.94469 36.9594 6.56971C38.4684 7.19473 39.8394 8.11083 40.9943 9.26571C42.1492 10.4206 43.0653 11.7916 43.6903 13.3006C44.3153 14.8095 44.637 16.4267 44.637 18.06V22.96H19.763V18.06ZM32.2 0C27.4116 0.00476488 22.8206 1.90901 19.4346 5.29485C16.0485 8.6807 14.144 13.2716 14.139 18.06V22.96H2.808C2.06309 22.9605 1.34887 23.2568 0.822323 23.7837C0.295778 24.3107 -1.88678e-07 25.0251 0 25.77V79.278C0.00185299 82.1204 1.13154 84.8459 3.14103 86.8561C5.15053 88.8664 7.87561 89.9971 10.718 90H53.682C56.5253 89.9984 59.2516 88.8683 61.2622 86.8579C63.2728 84.8475 64.4031 82.1213 64.405 79.278V25.77C64.4054 25.4005 64.3329 25.0346 64.1917 24.6932C64.0504 24.3518 63.8432 24.0416 63.5819 23.7804C63.3206 23.5192 63.0103 23.3121 62.6689 23.171C62.3274 23.0298 61.9615 22.9575 61.592 22.958H50.261V18.058C50.2554 13.2699 48.3507 8.67956 44.9647 5.29415C41.5788 1.90873 36.9881 0.00476395 32.2 0Z" fill="currentColor"/>
                  </svg> */}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
