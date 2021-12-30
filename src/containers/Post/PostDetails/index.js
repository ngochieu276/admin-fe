import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Layout from "../../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getPostById, updatePost } from "../../../actions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Spinner from "../../../components/UI/Spinner";
import { useHistory } from "react-router-dom";
import { BsXSquare } from "react-icons/bs";
/**
 * @author
 * @function PostDetails
 **/

const PostDetails = () => {
  let { postId } = useParams();
  const { selectedPost, loadingSpec } = useSelector((state) => state.post);
  const [post, setPost] = useState(selectedPost.post);
  const [tags, setTags] = useState([]);
  const tagRef = useRef();

  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    dispatch(getPostById(postId));
  }, []);

  useEffect(() => {
    if (selectedPost) {
      setTags(selectedPost.tags);
    }
  }, [selectedPost]);

  const updatePostHandler = (e) => {
    const payload = {
      updatePost: {
        postId: selectedPost._id,
        post,
        tags,
      },
    };
    dispatch(updatePost(payload));
    history.goBack();
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

  if (loadingSpec) {
    return (
      <Layout sidebar>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout sidebar>
      <Button onClick={updatePostHandler}>Update</Button>
      <div>
        <input type='text' ref={tagRef} />
        <button onClick={handleTagsInput}>Add tag</button>
      </div>
      <div style={{ marginTop: "4px" }}>
        {tags &&
          tags.map((tag) => (
            <span className='tag'>
              {tag}
              <BsXSquare onClick={() => removeTag(tag)} />
            </span>
          ))}
      </div>
      <CKEditor
        editor={ClassicEditor}
        data={selectedPost.post}
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
