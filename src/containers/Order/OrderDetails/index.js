import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../../../helper/axios";
import Layout from "../../../components/Layout";
import { getOrderById, updateOrder } from "../../../actions";
import Card from "../../../components/UI/Card";
import Spinner from "../../../components/UI/Spinner";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Steps } from "antd";
import { BsFillCheckCircleFill } from "react-icons/bs";
import "./style.css";

const { Step } = Steps;

/**
 * @author
 * @function OrderDetails
 **/

const OrderDetails = (props) => {
  let { orderId } = useParams();
  const { selectedOrder, orders, loading } = useSelector(
    (state) => state.order
  );
  const [type, setType] = useState("");

  const [orderStatus, setOrderStatus] = useState([]);
  const [items, setItems] = useState([]);

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

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orders]);

  useEffect(() => {
    setOrderStatus(selectedOrder.orderStatus);
    setItems(selectedOrder.items);
  }, [selectedOrder]);

  if (loading) {
    return (
      <Layout sidebar>
        <Spinner />
      </Layout>
    );
  }
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
            padding: "20px 50px",
            alignItems: "center",
          }}
        >
          <div>
            <div className='title'>Items</div>
            {items &&
              items.map((item, index) => (
                <div className='value' key={index}>
                  {item.productId.name}
                </div>
              ))}
          </div>
          <div>
            <div className='title'>Quantity</div>
            {items &&
              items.map((item, index) => (
                <div className='value' key={index}>
                  {item.purchaseQty}
                </div>
              ))}
          </div>
          <div>
            <div className='title'>PayablePrice</div>
            {items &&
              items.map((item, index) => (
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
            boxSizing: "border-box",
            padding: " 50px 100px 50px 100px",
            alignItems: "center",
          }}
        >
          <div className='orderTrack'>
            {orderStatus &&
              orderStatus.map((status) => {
                return (
                  <div
                    className='orderStatus'
                    className={`orderStatus ${
                      status.isCompleted ? `active` : null
                    }`}
                  >
                    <BsFillCheckCircleFill
                      className={`point ${
                        status.isCompleted ? `active` : null
                      }`}
                    />

                    <div className='orderInfo'>
                      <div className='status'>{status.type.toUpperCase()}</div>
                      <div className='date'>{formatDate(status.date)}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* select input to apply order action */}
          <div style={{ padding: "0 50px", boxSizing: "border-box" }}>
            <option value={""}>Select type</option>
            <select
              onClick={(e) => setType(e.target.value)}
              style={{
                border: "1px solid #cdcdcd",
                borderRadius: "2px",
                padding: "3px 5px",
              }}
            >
              {orderStatus &&
                orderStatus.map((status, key) => {
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
            <Button onClick={() => onOrderUpdate(selectedOrder._id)}>
              Confirm
            </Button>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default OrderDetails;
