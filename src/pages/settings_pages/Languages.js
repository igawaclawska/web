import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import strings from "../../i18n/definitions";
import { CEFR_LEVELS } from "../../assorted/cefrLevels";
import Select from "../../components/Select";

import LocalStorage from "../../assorted/LocalStorage";

import LoadingAnimation from "../../components/LoadingAnimation";

import UiLanguageSelector from "../../components/UiLanguageSelector";
import { saveUserInfoIntoCookies } from "../../utils/cookies/userInfo";

import * as s from "../../components/FormPage.sc";
import * as scs from "../Settings.sc";

export default function Languages({ api, setUser }) {
  const [errorMessage, setErrorMessage] = useState("");
  const user = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);
  const [languages, setLanguages] = useState();

  const [cefr, setCEFR] = useState("");

  useEffect(() => {
    api.getSystemLanguages((systemLanguages) => {
      setLanguages(systemLanguages);
    });

    api.getUserDetails((data) => {
      setUserDetails(data);
      setCEFRlevel(data);
    });
  }, [user.session, api]);

  function setCEFRlevel(data) {
    const levelKey = data.learned_language + "_cefr_level";
    const levelNumber = data[levelKey];
    setCEFR("" + levelNumber);
  }

  const modifyCEFRlevel = (languageID, cefrLevel) => {
    api.modifyCEFRlevel(
      languageID,
      cefrLevel,
      (res) => {
        console.log("Update '" + languageID + "' CEFR level to: " + cefrLevel);
        console.log("API returns update status: " + res);
      },
      () => {
        console.log("Connection to server failed...");
      },
    );
  };

  function updateUserInfo(info) {
    LocalStorage.setUserInfo(info);
    setUser({
      ...user,
      learned_language: info.learned_language,
      native_language: info.native_language,
    });

    saveUserInfoIntoCookies(info);
  }

  function nativeLanguageUpdated(e) {
    let code = e.target[e.target.selectedIndex].getAttribute("code");
    setUserDetails({
      ...userDetails,
      native_language: code,
    });
  }

  function handleSave(e) {
    e.preventDefault();

    modifyCEFRlevel(userDetails.learned_language, cefr);

    api.saveUserDetails(userDetails, setErrorMessage, () => {
      api.saveUserPreferences(() => {
        updateUserInfo(userDetails);
        // if (history.length > 1) {
        //   history.goBack();
        // } else {
        //   window.close();
        // }
      });
    });
  }

  if (!userDetails || !languages) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <div>
        <NavLink to="/account_settings/options">
          <ArrowBackRoundedIcon />
        </NavLink>{" "}
        Languages
      </div>

      <s.FormContainer>
        <scs.StyledSettings>
          {" "}
          <form className="formSettings">
            <h5>{errorMessage}</h5>
            <label>{strings.learnedLanguage}</label>
            <UiLanguageSelector
              languages={languages.learnable_languages}
              selected={language_for_id(
                userDetails.learned_language,
                languages.learnable_languages,
              )}
              onChange={(e) => {
                let code =
                  e.target[e.target.selectedIndex].getAttribute("code");
                setUserDetails({
                  ...userDetails,
                  learned_language: code,
                });
              }}
            />
            <label>{strings.levelOfLearnedLanguage}</label>{" "}
            <Select
              elements={CEFR_LEVELS}
              label={(e) => e.label}
              val={(e) => e.value}
              updateFunction={setCEFR}
              current={cefr}
            />
            <br />
            <br />
            <label>{strings.nativeLanguage}</label>
            <UiLanguageSelector
              languages={languages.native_languages}
              selected={language_for_id(
                userDetails.native_language,
                languages.native_languages,
              )}
              onChange={nativeLanguageUpdated}
            />{" "}
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

function language_for_id(id, language_list) {
  for (let i = 0; i < language_list.length; i++) {
    if (language_list[i].code === id) {
      return language_list[i].name;
    }
  }
}
