import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../helper/axios";
import Layout from "../../../components/Layout";
import { getOrderById, updateOrder } from "../../../actions";
import Card from "../../../components/UI/Card";

import { useDispatch, useSelector } from "react-redux";
import "./style.css";

/**
 * @author
 * @function OrderDetails
 **/

const OrderDetails = (props) => {
  let { orderId } = useParams();
  const { orders } = useSelector((state) => state.order);
  const selectedOrder = orders.find((order) => order._id === orderId);
  console.log("ha");
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = { orderId, type };
    dispatch(updateOrder(payload));
  };

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
      <Card
        style={{
          margin: "30px 0",
        }}
        headerLeft={selectedOrder._id}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "50px 50px",
            alignItems: "center",
          }}
        >
          <div>
            <div className='title'>Items</div>
            {selectedOrder.items.map((item, index) => (
              <div className='value' key={index}>
                {item.productId.name}
              </div>
            ))}
          </div>
          <div>
            <div className='title'>Quantity</div>
            {selectedOrder.items.map((item, index) => (
              <div className='value' key={index}>
                {item.purchaseQty}
              </div>
            ))}
          </div>
          <div>
            <div className='title'>PayablePrice</div>
            {selectedOrder.items.map((item, index) => (
              <div className='value' key={index}>
                {item.payablePrice}
              </div>
            ))}
          </div>
          <div>
            <span className='title'>Total Price</span>
            <br />
            <span className='value'>{selectedOrder.totalAmount}</span>
          </div>
          <div>
            <span className='title'>Payment Type</span> <br />
            <span className='value'>{selectedOrder.paymentType}</span>
          </div>
          <div>
            <span className='title'>Payment Status</span> <br />
            <span className='value'>{selectedOrder.paymentStatus}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            boxSizing: "border-box",
            padding: "100px",
            alignItems: "center",
          }}
        >
          <div className='orderTrack'>
            {selectedOrder.orderStatus.map((status) => {
              return (
                <div
                  className='orderStatus'
                  className={`orderStatus ${
                    status.isCompleted ? `active` : null
                  }`}
                >
                  <div
                    className={`point ${status.isCompleted ? `active` : null}`}
                  ></div>
                  <div className='orderInfo'>
                    <div className='status'>{status.type}</div>
                    <div className='date'>{formatDate(status.date)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* select input to apply order action */}
          <div style={{ padding: "0 50px", boxSizing: "border-box" }}>
            <option value={""}>Select type</option>
            <select onClick={(e) => setType(e.target.value)}>
              {selectedOrder.orderStatus.map((status, key) => {
                return (
                  <>
                    {!status.isCompleted ? (
                      <option key={status.type} value={status.type}>
                        {status.type}
                      </option>
                    ) : null}
                  </>
                );
              })}
            </select>
          </div>
          {/* confirm button */}
          <div style={{ padding: "0 50px", boxSizing: "border-box" }}>
            <button onClick={() => onOrderUpdate(selectedOrder._id)}>
              Confirm
            </button>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default OrderDetails;
