import React, { useState, useContext, Fragment, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
//import strings from "../i18n/definitions";
import { RoutingContext } from "../contexts/RoutingContext";
import EditTextInputFields from "./EditTextInputFields";
import {
  StyledButton,
  TopButtonWrapper,
  PopupButtonWrapper,
} from "./TeacherButtons.sc";
import * as s from "../components/ColumnWidth.sc";
import * as sc from "../components/TopTabs.sc";
import AddToCohortDialog from "./AddToCohortDialog";
import DeleteTextWarning from "./DeleteTextWarning";

export default function EditText({ api }) {
  const articleID = useParams().articleID;

  const [state, setState] = useState({
    article_title: "",
    article_content: "",
    language_code: "default",
  });

  const buttonDisabled =
    state.article_title === "" ||
    state.article_content === "" ||
    state.language_code === "default";

  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteTextWarning, setShowDeleteTextWarning] = useState(false);

  //The user is editing an already existing text...
  useEffect(() => {
    if (articleID !== "new") {
      api.getArticleInfo(articleID, (article) => {
        setState({
          article_title: article.title,
          article_content: article.content,
          language_code: article.language,
        });
      });
    }
    //eslint-disable-next-line
  }, []);

  //As there are two paths to EditTexts we are using RoutingContext to be able to go back on the right one on Cancel
  const { returnPath } = useContext(RoutingContext);
  const history = useHistory();

  const handleCancel = () => {
    history.push(returnPath);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value, //ie: article_title : "Harry Potter tickets sold out", article_content : "bla bla bla"
    });
  };

  //The LanguageSelector component returns the language selected by the user as a string (not an event like the other input fields)
  function handleLanguageChange(selectedLanguage) {
    setState({
      ...state,
      language_code: selectedLanguage,
    });
  }

  const uploadArticle = () => {
    api.uploadOwnText(
      state.article_title,
      state.article_content,
      state.language_code,
      (newID) => {
        console.log(`article created with id: ${newID}`);
      }
    );
    history.push("/teacher/texts");
  };

  const updateArticle = () => {
    api.updateOwnText(
      articleID,
      state.article_title,
      state.article_content,
      state.language_code,
      (result) => {
        if ((result = "OK")) {
          history.push("/teacher/texts");
        } else {
          console.log(result);
        }
      }
    );
  };

  const deleteText = () => {
    api.deleteOwnText(articleID, (res) => {
      if (res === "OK") {
        console.log("Article successfully deleted");
        history.push("/teacher/texts");
      } else {
        console.log(res);
      }
    });
  };

  const addArticleToCohort = () => {
    setShowDialog(true);
  };

  return (
    <Fragment>
      <s.NarrowColumn>
        <sc.TopTabs>
          <h1>STRINGSEditText</h1>
        </sc.TopTabs>
        <TopButtonWrapper>
          {articleID === "new" ? (
            <StyledButton
              primary
              onClick={uploadArticle}
              disabled={buttonDisabled}
            >
              Save text STRINGS
            </StyledButton>
          ) : (
            <StyledButton
              primary
              onClick={updateArticle}
              disabled={buttonDisabled}
            >
              Save changes STRINGS
            </StyledButton>
          )}
          <StyledButton
            primary
            onClick={addArticleToCohort}
            disabled={buttonDisabled}
          >
            Add to class STRINGS
          </StyledButton>
          <StyledButton secondary onClick={handleCancel}>
            STRINGSCancel
          </StyledButton>
        </TopButtonWrapper>
        <EditTextInputFields
          language_code={state.language_code}
          article_title={state.article_title}
          article_content={state.article_content}
          handleLanguageChange={handleLanguageChange}
          handleChange={handleChange}
        />
        {buttonDisabled && (
          <p style={{ color: "red" }}>
            You must fill out all the input fields. STRINGS
          </p>
        )}
        <PopupButtonWrapper>
          <Link to={`/teacher/texts/editText/${articleID}/studentView`}>
            <StyledButton secondary disabled={buttonDisabled}>
              STRINGSView as student
            </StyledButton>
          </Link>
          {articleID !== "new" && (
            <StyledButton secondary onClick={()=>setShowDeleteTextWarning(true)}>
              STRINGSDelete
            </StyledButton>
          )}
        </PopupButtonWrapper>
      </s.NarrowColumn>
      {showDialog && <AddToCohortDialog api={api} setIsOpen={setShowDialog} />}
      {showDeleteTextWarning && (
        <DeleteTextWarning
          deleteText={deleteText}
          setShowDeleteTextWarning={setShowDeleteTextWarning}
          articleTitle={state.article_title}
        />
      )}
    </Fragment>
  );
}