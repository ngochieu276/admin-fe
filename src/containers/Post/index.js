import React, { useEffect, useState } from "react";
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

const Editor = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const { posts, loading } = useSelector((state) => state.post);
  const [post, setPost] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, []);

  const submitCreatePost = () => {
    dispatch(createPost({ postContent: post, postTitle: title }));
    setShow(false);
  };

  const renderCkEditor = (
    <NewModal
      show={show}
      handleClose={() => setShow(false)}
      onSubmit={submitCreatePost}
      modalTitle={"Add new post"}
    >
      <div className='Editor'>
        <h2>Create New Post</h2>
        <Input
          placeholder="Enter post's title "
          value={title}
          type='text'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
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
        {/* <Col>
          <Input
            placeholder='Search for user'
            value={query}
            type='text'
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </Col>
        <Button onClick={searchForQuery}>Search</Button> */}
        <Col>
          <Button
            onClick={() => {
              setShow(true);
            }}
          >
            Add new Post
          </Button>
        </Col>
      </Row>
      <DataTable data={posts} />
      {renderCkEditor}
    </Layout>
  );
};

export default Editor;
