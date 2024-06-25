import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import strings from "../../i18n/definitions";

import SessionStorage from "../../assorted/SessionStorage";
import Feature from "../../features/Feature";

import LocalStorage from "../../assorted/LocalStorage";

import LoadingAnimation from "../../components/LoadingAnimation";

import { saveUserInfoIntoCookies } from "../../utils/cookies/userInfo";

import * as s from "../../components/FormPage.sc";
import * as scs from "../Settings.sc";

export default function AudioExercises({ api, setUser }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [audioExercises, setAudioExercises] = useState(true);

  const user = useContext(UserContext);

  const [userDetails, setUserDetails] = useState(null);

  let preferenceNotSet =
    LocalStorage.getProductiveExercisesEnabled() === undefined;

  const [productiveExercises, setProductiveExercises] = useState(
    preferenceNotSet || LocalStorage.getProductiveExercisesEnabled(),
  );
  //TODO: Refactor using Zeeguu project logic

  useEffect(() => {
    api.getUserDetails((data) => {
      setUserDetails(data);
      // setCEFRlevel(data);
    });
    api.getUserPreferences((preferences) => {
      setAudioExercises(
        (preferences["audio_exercises"] === undefined ||
          preferences["audio_exercises"] === "true") &&
          SessionStorage.isAudioExercisesEnabled(),
      );
    });
  }, [user.session, api]);

  function handleAudioExercisesChange(e) {
    setAudioExercises((state) => !state);
  }

  function handleProductiveExercisesChange(e) {
    // Toggle the state locally
    setProductiveExercises((state) => !state);

    // Update local storage
    const newProductiveValue = !productiveExercises;
    localStorage.setItem(
      "productiveExercisesEnabled",
      JSON.stringify(newProductiveValue),
    );
  }

  function updateUserInfo(info) {
    LocalStorage.setUserInfo(info);
    setUser({
      ...user,
    });

    saveUserInfoIntoCookies(info);
  }

  function handleSave(e) {
    e.preventDefault();

    // strings.setLanguage(uiLanguage.code);
    // LocalStorage.setUiLanguage(uiLanguage);

    // modifyCEFRlevel(userDetails.learned_language, cefr);

    console.log("saving: productiveExercises: " + productiveExercises);
    SessionStorage.setAudioExercisesEnabled(audioExercises);
    api.saveUserDetails(userDetails, setErrorMessage, () => {
      api.saveUserPreferences(
        {
          audio_exercises: audioExercises,
          productive_exercises: productiveExercises,
        },
        () => {
          updateUserInfo(userDetails);
          // if (history.length > 1) {
          //   history.goBack();
          // } else {
          //   window.close();
          // }
        },
      );
    });
  }

  if (!userDetails) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <div>
        <NavLink to="/account_settings/options">
          <ArrowBackRoundedIcon />
        </NavLink>{" "}
        Audio Exercises
      </div>

      <s.FormContainer>
        <scs.StyledSettings>
          {" "}
          <form className="formSettings">
            <h5>{errorMessage}</h5>

            <label>Exercise Type Preferences</label>
            <div style={{ display: "flex" }} className="form-group">
              <input
                style={{ width: "1.5em" }}
                type={"checkbox"}
                checked={audioExercises}
                onChange={handleAudioExercisesChange}
              />
              <label>
                Include Audio Exercises{" "}
                {SessionStorage.isAudioExercisesEnabled()
                  ? ""
                  : "(Temporaly Disabled)"}
              </label>
            </div>
            {Feature.merle_exercises() && (
              <div style={{ display: "flex" }} className="form-group">
                <input
                  style={{ width: "1.5em" }}
                  type={"checkbox"}
                  checked={productiveExercises}
                  onChange={handleProductiveExercisesChange}
                />
                <label>Enable Productive Exercises</label>
              </div>
            )}
            <div>
              <s.FormButton onClick={handleSave}>
                <span>{strings.save}</span>
              </s.FormButton>
            </div>
          </form>
        </scs.StyledSettings>
      </s.FormContainer>
    </>
  );
}
