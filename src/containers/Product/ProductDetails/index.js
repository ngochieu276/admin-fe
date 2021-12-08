import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import axios from "../../../helper/axios";
import Layout from "../../../components/Layout";
import { getProductById, updateProduct } from "../../../actions";
import Input from "../../../components/UI/Input";

import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import "./style.css";

/**
 * @author
 * @function ProductDetails
 **/

const ProductDetails = (props) => {
  let { productId } = useParams();
  const { products } = useSelector((state) => state.product);
  const selectedProduct = products.find(product => product._id === productId)

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
  const [photos, setPhotos] = useState(selectedProduct ? selectedProduct.photos : []);
  const imageInputRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(productId));
  }, []);

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

    resetInputForm();
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

  const handlePhotosInput = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file, file.name);

    try {
      const res = await axios.post("/image", formData);

      if (res.data.success) {
        setPhotos([...photos,res.data.data])
      }
    } catch (err) {
      console.log(err);
    }
  }

  const options = [
    { value: true, name: "True" },
    { value: false, name: "No" },
  ];



  return (
    <Layout sidebar>
      <Container className='detail-card'>
        <h3>{selectedProduct.name}</h3>
        <img className='avatar' src={selectedProduct.avatar} />
        <div className="card-input">
          <Row>
            <Col>
              <h4>Edit avatar </h4>
              <input
                type='file'
                onChange={handleFileInput}
                ref={imageInputRef}
              />
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
              <h4>Edits Photos</h4>
              <input type='file' onChange={handlePhotosInput} />
              <div style={{ display: 'flex' }}>
                {selectedProduct.photos.map(photo => <img className='avatar' alt='photo' src={photo} />)}
              </div>
              <Button onClick={updateUserHandler}>Update</Button>
            </Col>
          </Row>
        </div>
      </Container>
    </Layout>
  );
};

export default ProductDetails;
