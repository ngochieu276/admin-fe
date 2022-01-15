import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Table from "../../../components/UI/Table";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getInSliderProducts, getIsHotProducts } from "../../../actions";
import { useDispatch } from "react-redux";
import { BsPin } from "react-icons/bs";
import { useSelector } from "react-redux";

const Styles = styled.div`
  padding: 1rem;
`;

function App(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getIsHot = () => {
    console.log("sd");
    dispatch(getIsHotProducts());
  };

  const getInslider = () => {
    console.log("sd");
    dispatch(getInSliderProducts());
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: " Avatar",
            accessor: "avatar",
          },
          {
            Header: " Name",
            accessor: "name",
          },
          {
            Header: "Listed Price",
            accessor: "listedPrice",
          },
          {
            Header: "Discount Price",
            accessor: "discountPrice",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Quantity",
            accessor: "quantity",
          },
          {
            Header: (
              <div>
                <p>Is Hot</p>
                <BsPin
                  style={{ cursor: "pointer" }}
                  onClick={() => getIsHot()}
                />
              </div>
            ),
            accessor: "is_hot",
          },
          {
            Header: (
              <div>
                <p>In Slider</p>
                <BsPin
                  style={{ cursor: "pointer" }}
                  onClick={() => getInslider()}
                />
              </div>
            ),
            accessor: "in_slider",
          },
          {
            Header: "Tags",
            accessor: "tags",
          },
        ],
      },
      {
        Header: "Details",
        columns: [
          {
            Header: "Details",
            accessor: "update",
          },
          {
            Header: "Delete",
            accessor: "delete",
          },
        ],
      },
    ],
    []
  );

  const deleteHandler = (productId) => {
    props.onDelete(productId);
  };

  const makeData = (data) => {
    return data.map((product) => {
      return {
        ...product,
        avatar: (
          <img
            className='avatar'
            src={product.avatar}
            style={{ width: "100%" }}
          />
        ),
        tags: (
          <div>
            {product.tags.map((tag) => (
              <span className='tag'>{tag}</span>
            ))}
          </div>
        ),
        is_hot: product.is_hot ? <BsFillCheckCircleFill /> : "",
        in_slider: product.in_slider ? <BsFillCheckCircleFill /> : "",
        update: (
          <Button>
            <Link to={`/product/${product._id}`}>Details</Link>
          </Button>
        ),
        delete: (
          <Button
            disabled={!auth.user.isMng}
            onClick={() => deleteHandler(product._id)}
          >
            Delete
          </Button>
        ),
      };
    });
  };

  return (
    <Styles>
      <Table columns={columns} data={makeData(props.data)} />
    </Styles>
  );
}

export default App;
