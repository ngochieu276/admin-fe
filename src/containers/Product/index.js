import React, { useEffect, useState, useRef } from "react";
import axios from "../../helper/axios";
import { Button, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Layout from "../../components/Layout";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../../actions/product.action";
import TableData from "./components/DataTable";
import NewModal from "../../components/UI/Modal";
import Spinner from "../../components/UI/Spinner";
import { BsXSquare } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";

import "./style.css";
/**
 * @author
 * @function Product
 **/

const Product = (props) => {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [productToDel, setProductToDel] = useState("");

  const [name, setName] = useState("");
  const [listedPrice, setListedPrice] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [tags, setTags] = useState([]);
  const [imgUrl, setUrl] = useState(null);
  const [photos, setPhotos] = useState([]);
  const imageInputRef = useRef();
  const tagRef = useRef();

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(""));
  }, []);

  const searchForQuery = (e) => {
    e.preventDefault();
    console.log(query);
    dispatch(getProducts(query));
  };

  const addProductForm = (e) => {
    e.preventDefault();
    const product = {
      name,
      discountPrice,
      listedPrice,
      description,
      quantity,
      tags,
      avatar: imgUrl,
      photos,
    };
    setShow(false);
    dispatch(createProduct(product));
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
        setPhotos([...photos, res.data.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTagsInput = () => {
    if (tagRef.current.value == "") return;
    setTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
    console.log(tagRef.current.value);
  };

  const removeTag = (value) => {
    setTags([...tags].filter((tag) => tag !== value));
  };

  const onDelete = (productId) => {
    setShowDel(true);
    setProductToDel(productId);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(productToDel));
    setShowDel(false);
  };

  const renderAddProductModal = (
    <NewModal
      show={show}
      handleClose={() => setShow(false)}
      onSubmit={addProductForm}
      modalTitle={"Add new product"}
    >
      <Row>
        <Col>
          <h4>Avatar</h4>
          <input type='file' onChange={handleFileInput} ref={imageInputRef} />
          {imgUrl && <img className='avatar' alt='avatar' src={imgUrl} />}
          <Input
            value={name}
            placeholder={`Name`}
            onChange={(e) => setName(e.target.value)}
            className='form-control-sm'
          />
          <Input
            value={listedPrice}
            placeholder={`List Price`}
            onChange={(e) => setListedPrice(e.target.value)}
            className='form-control-sm'
          />
          <Input
            value={discountPrice}
            placeholder={`Discount Price`}
            onChange={(e) => setDiscountPrice(e.target.value)}
            className='form-control-sm'
          />
          <Input
            value={description}
            placeholder={`Description`}
            onChange={(e) => setDescription(e.target.value)}
            className='form-control-sm'
          />
          <Input
            value={quantity}
            placeholder={`Quantity`}
            onChange={(e) => setQuantity(e.target.value)}
            className='form-control-sm'
          />
          <div>
            <input type='text' ref={tagRef} />
            <button onClick={handleTagsInput}>Add tag</button>
          </div>
          <div style={{ marginTop: "4px" }}>
            {tags.map((tag) => (
              <span className='tag'>
                {tag}
                <BsXSquare onClick={() => removeTag(tag)} />
              </span>
            ))}
          </div>
          <h4>Photos</h4>
          <input type='file' onChange={handlePhotosInput} />
          <div style={{ display: "flex" }}>
            {photos.map((photo) => (
              <img className='avatar' alt='photo' src={photo} />
            ))}
          </div>
        </Col>
      </Row>
    </NewModal>
  );

  const renderConfirmDelete = (
    <NewModal
      show={showDel}
      handleClose={() => setShowDel(false)}
      onSubmit={() => {}}
      modalTitle={"This action can't be undone,sure ?"}
    >
      <Row>
        <Col>
          <Button onClick={confirmDelete}>Delete</Button>
          <Button onClick={() => setShowDel(false)}>Cancel</Button>
        </Col>
      </Row>
    </NewModal>
  );

  if (loading) {
    return (
      <Layout sidebar>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout sidebar>
      <div style={{ display: "flex", padding: "1rem" }}>
        <Input
          placeholder='Search for user'
          value={query}
          type='text'
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Button onClick={searchForQuery}>Search</Button>
        <Button
          onClick={() => {
            setShow(true);
          }}
        >
          Add new Product
        </Button>
      </div>

      <TableData data={products} onDelete={onDelete} />
      {renderAddProductModal}
      {renderConfirmDelete}
    </Layout>
  );
};

export default Product;
