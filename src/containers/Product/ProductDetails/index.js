import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import axios from "../../../helper/axios";
import Layout from "../../../components/Layout";
import { getProductById, updateProduct } from "../../../actions";
import Input from "../../../components/UI/Input";
import Spinner from "../../../components/UI/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import NewModal from "../../../components/UI/Modal";
import TimeLine from "../../../components/UI/TimeLine";
import "./style.css";
import { BsXSquare } from "react-icons/bs";

/**
 * @author
 * @function ProductDetails
 **/

const ProductDetails = (props) => {
  let { productId } = useParams();
  const { selectedProduct, loadingSpec, error, products } = useSelector(
    (state) => state.product
  );
  const auth = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const [listedPrice, setListedPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [isHot, setIsHot] = useState("");
  const [inSlider, setInslider] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [imgUrl, setUrl] = useState("");
  const [photos, setPhotos] = useState([]);
  const imageInputRef = useRef();
  const tagRef = useRef();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [products]);
  useEffect(() => {
    if (selectedProduct && selectedProduct.product) {
      setTags(selectedProduct.product.tags);
      setPhotos(selectedProduct.product.photos);
      setUrl(selectedProduct.product.avatar);
    }
  }, [selectedProduct]);

  const updateUserHandler = (e) => {
    const payload = {
      updateProduct: {
        productId: selectedProduct.product._id,
        listedPrice: listedPrice || selectedProduct.product.listedPrice,
        discountPrice: discountPrice || selectedProduct.product.discountPrice,
        is_hot: isHot || selectedProduct.product.is_hot,
        tags: tags || selectedProduct.product.tags,
        in_slider: inSlider || selectedProduct.product.in_slider,
        quantity: quantity || selectedProduct.product.quantity,
        description: description || selectedProduct.product.description,
        supplier: description || selectedProduct.product.supplier,
        photos: photos || selectedProduct.product.photos,
        avatar: imgUrl || selectedProduct.product.avatar,
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
        setPhotos([...photos, res.data.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removePhoto = (value) => {
    setPhotos([...photos].filter((photo) => photo !== value));
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

  const setEditable = () => {
    console.log("setEditable");
  };

  const options = [
    { value: "", name: "Choose condition" },
    { value: true, name: "True" },
    { value: false, name: "False" },
  ];

  const renderInputError = (field) => {
    if (error && field === error.path) {
      return (
        <div className='inputError' style={{ color: "red", textAlign: "left" }}>
          {error.kind} is required, please check your input
        </div>
      );
    }
  };

  const renderHistoryModal = (
    <NewModal
      size={"xl"}
      fullscreen={true}
      show={show}
      handleClose={() => setShow(false)}
      onSubmit={() => {
        console.log("haha");
      }}
      modalTitle={"Product update history"}
    >
      {selectedProduct && <TimeLine events={selectedProduct.histories} />}
    </NewModal>
  );

  if (loadingSpec) {
    return (
      <Layout sidebar>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout sidebar>
      <Container className='detail-card'>
        <h3>{selectedProduct.product.name}</h3>
        <Button className='detail-history' onClick={() => setShow(true)}>
          View update History
        </Button>
        <div className='card-input'>
          <Row>
            <Col>
              <h6>Edit avatar </h6>
              {auth.user.isMng && (
                <input
                  type='file'
                  onChange={handleFileInput}
                  ref={imageInputRef}
                />
              )}
              {imgUrl && <img className='avatar' alt='avatar' src={imgUrl} />}
              <Input
                label={"Listed Price"}
                value={listedPrice}
                placeholder={selectedProduct.product.listedPrice}
                onChange={(e) => setListedPrice(e.target.value)}
                className='form-control-sm'
              />
              {renderInputError("listedPrice")}
              <Input
                label={"Discount Price"}
                value={discountPrice}
                placeholder={selectedProduct.product.discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className='form-control-sm'
              />
              {renderInputError("discountPrice")}
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
                placeholder={selectedProduct.product.quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='form-control-sm'
              />
              {renderInputError("quantity")}
              <Input
                label={"Description"}
                value={description}
                placeholder={selectedProduct.product.description}
                onChange={(e) => setDescription(e.target.value)}
                className='form-control-sm'
              />
              <Input
                label={"Supplier"}
                value={supplier}
                placeholder={selectedProduct.product.supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className='form-control-sm'
              />
              {auth.user.isMng && (
                <div>
                  <input type='text' ref={tagRef} placeholder={"Edit tags"} />
                  <Button onClick={handleTagsInput}>Add tag</Button>
                </div>
              )}
              <div style={{ marginTop: "4px" }}>
                {tags &&
                  tags.map((tag) => (
                    <span className='tag'>
                      {tag}
                      <BsXSquare onClick={() => removeTag(tag)} />
                    </span>
                  ))}
              </div>
              <h4>Edits Photos</h4>
              {auth.user.isMng && (
                <input type='file' onChange={handlePhotosInput} />
              )}
              <div style={{ display: "flex" }}>
                {photos &&
                  photos.map((photo) => (
                    <div className='photo-item'>
                      <img className='avatar' alt='photo' src={photo} />
                      {auth.user.isMng && (
                        <BsXSquare
                          onClick={() => removePhoto(photo)}
                          className='icon'
                        />
                      )}
                    </div>
                  ))}
              </div>
              {auth.user.isMng && (
                <Button onClick={updateUserHandler}>Update</Button>
              )}
            </Col>
          </Row>
        </div>
        {renderHistoryModal}
      </Container>
    </Layout>
  );
};

export default ProductDetails;
