import React, { useEffect, useState, useRef } from "react";
import axios from "../../helper/axios";
import { Row, Button, Col } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createPost } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../actions/index";
import Layout from "../../components/Layout";
import DataTable from "./components/DataTable";
import NewModal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import Spinner from "../../components/UI/Spinner";
import { BsXSquare } from "react-icons/bs";

const Editor = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [tags, setTags] = useState([]);
  const [imgUrl, setUrl] = useState(null);
  const dispatch = useDispatch();
  const imageInputRef = useRef();
  const tagRef = useRef();

  useEffect(() => {
    dispatch(getPost());
  }, []);

  const submitCreatePost = () => {
    dispatch(
      createPost({ postContent: post, postTitle: title, tags, avatar: imgUrl })
    );
    setShow(false);
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

  const handleTagsInput = () => {
    if (tagRef.current.value == "") return;
    setTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
    console.log(tagRef.current.value);
  };

  const removeTag = (value) => {
    setTags([...tags].filter((tag) => tag !== value));
  };

  const renderCkEditor = (
    <NewModal
      size={"xl"}
      show={show}
      handleClose={() => setShow(false)}
      onSubmit={submitCreatePost}
      modalTitle={"Add new post"}
    >
      <div className='Editor'>
        <h4>Avatar</h4>
        <input type='file' onChange={handleFileInput} ref={imageInputRef} />
        {imgUrl && <img className='avatar' alt='avatar' src={imgUrl} />}
        <Input
          placeholder="Enter post's title "
          value={title}
          type='text'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
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
        <CKEditor
          editor={ClassicEditor}
          data={post}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setPost(data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
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
      <Row>
        <Col>
          <Button
            onClick={() => {
              setShow(true);
            }}
          >
            Create post
          </Button>
        </Col>
      </Row>
      <DataTable data={posts} />
      {renderCkEditor}
    </Layout>
  );
};

export default Editor;
