import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import DataTable from "./components/DataTable";
import { getCustomerOrders } from "../../actions/order.action";

/**
 * @author
 * @function Orders
 **/

export const Order = (props) => {
  const { orders } = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerOrders());
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return (
        <div style={{ marginTop: "15px" }}>
          <div>{`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`}</div>
          <div>{`${d.getHours()}:${d.getMinutes()}`}</div>
        </div>
      );
    }
    return "";
  };

  return (
    <Layout sidebar>
      <DataTable data={orders} />
    </Layout>
  );
};

export default Order;

// <Layout sidebar>
//   {order.orders.map((orderItem, index) => {
//     return (
//       <Card
//         style={{
//           margin: "10px 0",
//         }}
//         key={index}
//         headerLeft={orderItem._id}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             padding: "50px 50px",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <div className='title'>Items</div>
//             {orderItem.items.map((item, index) => (
//               <div className='value' key={index}>
//                 {item.productId.name}
//               </div>
//             ))}
//           </div>
//           <div>
//             <span className='title'>Total Price</span>
//             <br />
//             <span className='value'>{orderItem.totalAmount}</span>
//           </div>
//           <div>
//             <span className='title'>Payment Type</span> <br />
//             <span className='value'>{orderItem.paymentType}</span>
//           </div>
//           <div>
//             <span className='title'>Payment Status</span> <br />
//             <span className='value'>{orderItem.paymentStatus}</span>
//           </div>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             boxSizing: "border-box",
//             padding: "100px",
//             alignItems: "center",
//           }}
//         >
//           <div className='orderTrack'>
//             {orderItem.orderStatus.map((status) => {
//               return (
//                 <div
//                   className='orderStatus'
//                   className={`orderStatus ${
//                     status.isCompleted ? `active` : null
//                   }`}
//                 >
//                   <div
//                     className={`point ${
//                       status.isCompleted ? `active` : null
//                     }`}
//                   ></div>
//                   <div className='orderInfo'>
//                     <div className='status'>{status.type}</div>
//                     <div className='date'>{formatDate(status.date)}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {/* select input to apply order action */}
//           <div style={{ padding: "0 50px", boxSizing: "border-box" }}>
//             <option value={""}>Select type</option>
//             <select onClick={(e) => setType(e.target.value)}>
//               {orderItem.orderStatus.map((status, key) => {
//                 return (
//                   <>
//                     {!status.isCompleted ? (
//                       <option key={status.type} value={status.type}>
//                         {status.type}
//                       </option>
//                     ) : null}
//                   </>
//                 );
//               })}
//             </select>
//           </div>
//           {/* confirm button */}
//           <div style={{ padding: "0 50px", boxSizing: "border-box" }}>
//             <button onClick={() => onOrderUpdate(orderItem._id)}>
//               Confirm
//             </button>
//           </div>
//         </div>
//       </Card>
//     );
//   })}
// </Layout>
