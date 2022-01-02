import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import Spinner from "../../components/UI/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getNews, sendNew } from "../../actions/new.actions";
import DataTable from "./components/DataTable";
import NewModal from "../../components/UI/Modal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Input from "../../components/UI/Input";

/**
* @author
* @function New

**/

const New = (props) => {
  const { news, loading } = useSelector((state) => state.new);
  const [specNew, setSpecNew] = useState();

  const [show, setShow] = useState(false);
  const [showSpec, setShowSpec] = useState(false);
  const [title, setTitle] = useState("");
  const [newLetter, setNewLetter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, []);

  const submitSendNews = () => {
    dispatch(
      sendNew({
        newContent: newLetter,
        newTitle: title,
      })
    );
    setShow(false);
  };

  const showNewDetails = (specLetter) => {
    setSpecNew(specLetter);
    setShowSpec(true);
  };

  const renderCkEditor = (
    <NewModal
      size={"xl"}
      show={show}
      handleClose={() => setShow(false)}
      onSubmit={submitSendNews}
      modalTitle={"Send Email"}
    >
      <div className='Editor'>
        <h4>Email content</h4>
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
          data={newLetter}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setNewLetter(data);
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

  const renderSpecNew = (specNew) => {
    return (
      <NewModal
        size={"xl"}
        show={showSpec}
        handleClose={() => setShowSpec(false)}
        onSubmit={() => {
          console.log("hihi");
        }}
        modalTitle={specNew.title}
      >
        <CKEditor
          editor={ClassicEditor}
          data={specNew.new}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setNewLetter(data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <div>
          <h4>Send to: </h4>
          {specNew["receiver"].map((mail) => {
            return <span>{mail} ,</span>;
          })}
        </div>
      </NewModal>
    );
  };

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
            Send new email
          </Button>
        </Col>
      </Row>
      <DataTable data={news} showNewDetails={showNewDetails} />
      {renderCkEditor}
      {specNew && renderSpecNew(specNew)}
    </Layout>
  );
};

export default New;
