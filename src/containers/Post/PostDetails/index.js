import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Layout from "../../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getPostById, updatePost } from "../../../actions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Spinner from "../../../components/UI/Spinner";
/**
 * @author
 * @function PostDetails
 **/

const PostDetails = () => {
  let { postId } = useParams();
  const { selectedPost, loading } = useSelector((state) => state.post);
  const [post, setPost] = useState(selectedPost.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(postId));
  }, []);

  const updatePostHandler = (e) => {
    const payload = {
      updatePost: {
        postId: selectedPost._id,
        post,
      },
    };
    dispatch(updatePost(payload));
  };

  const postContent = (
    <div dangerouslySetInnerHTML={{ __html: selectedPost.post }} />
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
      <Button onClick={updatePostHandler}>Update</Button>
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
    </Layout>
  );
};

export default PostDetails;
