import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import { BsBox2Heart } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";
import { PiSealWarningLight } from "react-icons/pi";
import { TbDiscountCheck } from "react-icons/tb";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        // Sort orders in descending order based on createdAt
        const sortedOrders = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        dispatch({ type: "FETCH_SUCCESS", payload: sortedOrders });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const getMonthName = (dateString) => {
    const options = { month: "long" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const isOrderOlderThanTwoDays = (createdAt) => {
    const orderDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate - orderDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays > 3;
  };

  const getElapsedTime = (dateString) => {
    const orderDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = Math.floor((currentDate - orderDate) / (1000 * 60)); // in minutes

    if (timeDifference < 60) {
      return `${timeDifference} minutes ago`;
    } else if (timeDifference < 1440) {
      return `${Math.floor(timeDifference / 60)} hours ago`;
    } else {
      return `${Math.floor(timeDifference / 1440)} days ago`;
    }
  };

  const getFormattedDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5 mt-4">
        <div class="space-y-1 px-2">
          <Link
            href="/admin/dashboard"
            class="bg-gray-0 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            <svg
              class="text-gray-500  mr-3 h-6 w-6 transform group-hover:translate-x-1/3 group-hover:rotate-12 transition duration-300"
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              ></path>
            </svg>
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            class="group text-violet-800 hover:bg-violet-50 bg-violet-50 hover:text-violet-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            <svg
              class="text-violet-800 group-hover:text-black mr-3 h-6 w-6 transform group-hover:translate-x-1/3 group-hover:rotate-12 transition duration-300"
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              ></path>
            </svg>
            Orders
          </Link>

          <Link
            href="/admin/products"
            class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md group"
          >
            <svg
              class="text-gray-400  mr-3 h-6 w-6 transform group-hover:translate-x-1/3 group-hover:rotate-12 transition duration-300"
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
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              ></path>
            </svg>
            Products
          </Link>

          <Link
            href="/admin/users"
            class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md group"
          >
            <svg
              class="text-gray-400  mr-3 h-6 w-6 transform group-hover:translate-x-1/3 group-hover:rotate-12 transition duration-300"
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
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              ></path>
            </svg>
            Users
          </Link>
        </div>

        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-xl flex items-center gap-2">
            <BsBox2Heart /> Orders
          </h1>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-dashed	">
                  <tr>
                    <th className="px-4 text-left">ID</th>
                    <th className="p-4 text-left">USER</th>
                    <th className="p-4 text-left">DATE</th>
                    <th className="p-4 text-left">TOTAL</th>
                    <th className="p-4 text-left">PAID</th>
                    <th className="p-4 text-left">DELIVERED</th>
                    <th className="p-4 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <React.Fragment key={order._id}>
                      {index === 0 ||
                      getMonthName(order.createdAt) !==
                        getMonthName(orders[index - 1].createdAt) ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-0.5  bg-gradient-to-r from-slate-100">
                            {getMonthName(order.createdAt)} 
                          </td>
                        </tr>
                      ) : null}

                      <tr className="border-b border-dashed">
                        <td className="p-4">
                          {order._id.substring(20, 24)}
                          {order.orderItems.length > 0 && (
                        <img
                          src={order.orderItems[0].image} // Assuming the first order item contains the product image
                          alt={order.orderItems[0].name} // Provide a meaningful alt text
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      )}  
                        </td>
                        <td className="p-4">
                          {order.user ? order.user.name : "DELETED USER"}
                        </td>
                        <td className="p-4">
                          <span>{getFormattedDate(order.createdAt)}</span>
                          <br />
                          <small
                            className={` bg-zinc-100 rounded-full px-2	${
                              isOrderOlderThanTwoDays(order.createdAt)
                                ? "bg-yellow-100"
                                : ""
                            }`}
                          >
                            {getElapsedTime(order.createdAt)}
                          </small>
                        </td>
                        <td className="p-4">₹{order.totalPrice}</td>
                        <td className="p-4">
                          {order.isPaid
                            ? `${order.paidAt.substring(0, 10)}`
                            : "not paid"}
                        </td>
                        <td className="p-4">
                          {order.isDelivered ? (
                            <span className="bg-lime-200 inline-flex items-center gap-1 px-2 rounded-full">
                              {order.deliveredAt.substring(0, 10)}{" "}
                              <TbDiscountCheck />
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              Not Delivered <PiSealWarningLight />
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <Link
                            href={`/order/${order._id}`}
                            passHref
                            className={`group gap-1 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
                              isOrderOlderThanTwoDays(order.createdAt)
                                ? "tag-for-old-order"
                                : ""
                            }`}
                          >
                            Details{" "}
                            <FiArrowUpRight className="transform group-hover:translate-x-1/3 group-hover:rotate-45 transition duration-300 h-full" />
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
