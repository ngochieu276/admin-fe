import React, { useState, useRef } from "react";
import axios from "../../../helper/axios";
import { Button } from "react-bootstrap";
import NewModal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../actions";

/**
 * @author
 * @function ProductDetailsAndUpdate
 *
 **/

const ProductDetailsAndUpdate = (props) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [show, setShow] = useState(false);
  const [listedPrice, setListedPrice] = useState(
    selectedProduct ? selectedProduct.listedPrice : ""
  );
  const [discountPrice, setDiscountPrice] = useState(
    selectedProduct ? selectedProduct.discountPrice : ""
  );
  const [isHot, setIsHot] = useState(
    selectedProduct ? selectedProduct.is_hot : ""
  );
  const [inSlider, setInslider] = useState(
    selectedProduct ? selectedProduct.in_slider : ""
  );
  const [quantity, setQuantity] = useState(
    selectedProduct ? selectedProduct.quantity : ""
  );
  const [description, setDescription] = useState(
    selectedProduct ? selectedProduct.description : ""
  );
  const [supplier, setSupplier] = useState(
    selectedProduct ? selectedProduct.supplier : ""
  );
  const [imgUrl, setUrl] = useState(null);
  const imageInputRef = useRef();

  const dispatch = useDispatch();

  const updateUserHandler = (e) => {
    const payload = {
      updateProduct: {
        productId: selectedProduct._id,
        listedPrice,
        discountPrice,
        is_hot: isHot,
        in_slider: inSlider,
        quantity,
        description,
        supplier,
        avatar: imgUrl,
      },
    };
    dispatch(updateProduct(payload));
    setSelectedProduct({});
    resetInputForm();
    setShow(false);
  };
  const resetInputForm = () => {
    setListedPrice("");
    setDiscountPrice("");
    setIsHot("");
    setInslider("");
    setQuantity("");
    setDescription("");
    setSupplier("");
    imageInputRef.current.value = "";
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file, file.name);

    try {
      const res = await axios.post("/image", formData);

      if (res.data.success) {
        setUrl(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const options = [
    { value: true, name: "True" },
    { value: false, name: "No" },
  ];

  const renderUpdateProductModal = (user) => {
    return (
      <NewModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={updateUserHandler}
        modalTitle={"Product details"}
      >
        <Row>
          <Col>
            <input type='file' onChange={handleFileInput} ref={imageInputRef} />
            {imgUrl && <img className='avatar' alt='avatar' src={imgUrl} />}
            <Input
              label={"Listed Price"}
              value={listedPrice}
              placeholder={selectedProduct.listedPrice}
              onChange={(e) => setListedPrice(e.target.value)}
              className='form-control-sm'
            />
            <Input
              label={"Discount Price"}
              value={discountPrice}
              placeholder={selectedProduct.discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className='form-control-sm'
            />
            <Input
              type='select'
              label={"Is hot"}
              value={isHot}
              onChange={(e) => setIsHot(e.target.value)}
              options={options}
              className='form-control-sm'
            />
            <Input
              type='select'
              label={"In Slider"}
              value={inSlider}
              onChange={(e) => setInslider(e.target.value)}
              options={options}
              className='form-control-sm'
            />
            <Input
              label={"Quantity"}
              value={quantity}
              placeholder={selectedProduct.quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='form-control-sm'
            />
            <Input
              label={"Description"}
              value={description}
              placeholder={selectedProduct.description}
              onChange={(e) => setDescription(e.target.value)}
              className='form-control-sm'
            />
            <Input
              label={"Supplier"}
              value={supplier}
              placeholder={selectedProduct.supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className='form-control-sm'
            />
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <div>
      {props.selectedFlatRows &&
        props.selectedFlatRows.map((product) => (
          <div>
            {product.original.name}
            <Button style={{ margin: "3px" }}>View details</Button>
            <Button
              onClick={() => {
                setShow(true);
                setSelectedProduct(product.original);
              }}
            >
              Update
            </Button>
            {renderUpdateProductModal(product)}
          </div>
        ))}
    </div>
  );
};

export default ProductDetailsAndUpdate;
