import { useState, useEffect } from "react";
import * as s from "../Exercise.sc.js";
import SelectedSpeakButton from "../SelectedSpeakButton.js";
import strings from "../../../i18n/definitions";
import NextNavigation from "../NextNavigation";
import SolutionFeedbackLinks from "../SolutionFeedbackLinks";
import LoadingAnimation from "../../../components/LoadingAnimation.js";
import InteractiveText from "../../../reader/InteractiveText.js";
import shuffle from "../../../assorted/fisherYatesShuffle";
import removePunctuation from "../../../assorted/removePunctuation";
import { TranslatableText } from "../../../reader/TranslatableText.js";
import AudioTwoBotInput from "./AudioTwoBotInput";
import {
  zeeguuOrange,
  darkBlue,
  zeeguuRed,
  zeeguuViolet,
} from "../../../components/colors";

const EXERCISE_TYPE = "TypeL2W_in_AudioL2";
export default function AudioExerciseTwo({
  api,
  bookmarksToStudy,
  correctAnswer,
  notifyIncorrectAnswer,
  setExerciseType,
  isCorrect,
  setIsCorrect,
  moveToNextExercise,
  toggleShow,
  reload,
  setReload,
  inputFirstClick,
}) {
  const [incorrectAnswer, setIncorrectAnswer] = useState("");
  const [initialTime] = useState(new Date());
  const [buttonOptions, setButtonOptions] = useState(null);
  const [messageToAPI, setMessageToAPI] = useState("");
  const [articleInfo, setArticleInfo] = useState();
  const [interactiveText, setInteractiveText] = useState();
  const [choiceOptions, setChoiceOptions] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(false);
  const [firstTypeTime, setFirstTypeTime] = useState();
  const [firstSelection, setFirstSelection] = useState(0);
  useEffect(() => {
    setExerciseType(EXERCISE_TYPE);
    api.getArticleInfo(bookmarksToStudy[0].article_id, (articleInfo) => {
      setInteractiveText(
        new InteractiveText(bookmarksToStudy[0].context, articleInfo, api)
      );
      setArticleInfo(articleInfo);
    });
    consolidateChoice();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function notifyChoiceSelection(selectedChoice) {
    console.log("checking result...");
    if (
      selectedChoice ===
      removePunctuation(bookmarksToStudy[0].from.toLowerCase())
    ) {
      correctAnswer(bookmarksToStudy[0]);
      setIsCorrect(true);
      let concatMessage = messageToAPI + "C";
      handleAnswer(concatMessage);
    } else {
      setIncorrectAnswer(selectedChoice);
      notifyIncorrectAnswer(bookmarksToStudy[0]);
      let concatMessage = messageToAPI + "W";
      setMessageToAPI(concatMessage);
    }
  }

  function buttonSelectTrue() {
    if (currentChoice !== true) {
      setCurrentChoice(true);
    }
    console.log(currentChoice + " " + bookmarksToStudy[0].id);
  }

  function buttonSelectFalse() {
    if (currentChoice !== false) {
      setCurrentChoice(false);
    }
    console.log(currentChoice);
  }

  function handleShowSolution() {
    let pressTime = new Date();
    console.log(pressTime - initialTime);
    console.log("^^^^ time elapsed");
    let duration = pressTime - initialTime;
    let message = messageToAPI + "S";

    notifyIncorrectAnswer(bookmarksToStudy[0]);
    setIsCorrect(true);
    handleAnswer(message, duration);
  }

  function handleAnswer(message) {
    let pressTime = new Date();
    console.log(pressTime - initialTime);
    console.log("^^^^ time elapsed");

    api.uploadExerciseFeedback(
      message,
      EXERCISE_TYPE,
      pressTime - initialTime,
      bookmarksToStudy[0].id
    );
  }

  function consolidateChoice() {
    // Index 0 is the correct bookmark and index 1 and 2 are incorrect
    let listOfchoices = [0, 1, 2];
    let shuffledListOfChoices = shuffle(listOfchoices);
    setChoiceOptions(shuffledListOfChoices);
  }

  function handleCorrectAnswer(message) {
    console.log(new Date() - initialTime);
    console.log(firstTypeTime - initialTime);
    let duration = firstTypeTime - initialTime;

    correctAnswer(bookmarksToStudy[0]);
    setIsCorrect(true);
    api.uploadExerciseFeedback(
      message,
      EXERCISE_TYPE,
      duration,
      bookmarksToStudy[0].id
    );
  }

  function handleIncorrectAnswer() {
    notifyIncorrectAnswer(bookmarksToStudy[0]);
    setFirstTypeTime();
  }

  if (!articleInfo) {
    return <LoadingAnimation />;
  }

  const selectedButtonColor = {
    background: `${zeeguuOrange}`,
    color: "black",
    border: `0.15em solid ${zeeguuOrange}`,
  };
  const selectedButtonStyle = (id) => {
    if (firstSelection === id) {
      return selectedButtonColor;
    }
    return null;
  };

  function handleClick(id) {
    inputFirstClick();
    setFirstSelection(id);
    console.log(id + " selected");
  }

  return (
    <s.Exercise>
      <div className="headlineWithMoreSpace">
        {strings.audioExerciseTwoHeadline}
      </div>
      <div className="contextExample">
        <TranslatableText
          isCorrect={isCorrect}
          interactiveText={interactiveText}
          translating={true}
          pronouncing={false}
          bookmarkToStudy={bookmarksToStudy[0].from}
        />
      </div>
      <s.CenteredRow>
        {choiceOptions ? (
          choiceOptions.map((option) =>
            Number(0) !== option ? (
              <SelectedSpeakButton
                handleClick={buttonSelectFalse}
                onClick={(e) => handleClick("to", Number(e.target.id))}
                bookmarkToStudy={bookmarksToStudy[option]}
                api={api}
                id={option.id}
                style={selectedButtonStyle("to" + option.id)}
              />
            ) : (
              <SelectedSpeakButton
                handleClick={buttonSelectTrue}
                onClick={(e) => handleClick("from", Number(e.target.id))}
                bookmarkToStudy={bookmarksToStudy[option]}
                api={api}
                id={option.id}
                style={selectedButtonStyle("from" + option.id)}
              />
            )
          )
        ) : (
          <></>
        )}
      </s.CenteredRow>

      {isCorrect && <h1>{bookmarksToStudy[0].to}</h1>}
      {!isCorrect && (
        <AudioTwoBotInput
          buttonOptions={buttonOptions}
          currentChoice={currentChoice}
          notifyChoiceSelection={notifyChoiceSelection}
          incorrectAnswer={incorrectAnswer}
          setIncorrectAnswer={setIncorrectAnswer}
          handleShowSolution={handleShowSolution}
          toggleShow={toggleShow}
          handleCorrectAnswer={handleCorrectAnswer}
          handleIncorrectAnswer={handleIncorrectAnswer}
          messageToAPI={messageToAPI}
          setMessageToAPI={setMessageToAPI}
        />
      )}
      {isCorrect && (
        <NextNavigation
          api={api}
          bookmarksToStudy={bookmarksToStudy}
          moveToNextExercise={moveToNextExercise}
          reload={reload}
          setReload={setReload}
        />
      )}
      <SolutionFeedbackLinks
        handleShowSolution={handleShowSolution}
        toggleShow={toggleShow}
        isCorrect={isCorrect}
      />
    </s.Exercise>
  );
}
