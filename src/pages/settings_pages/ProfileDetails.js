import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { saveUserInfoIntoCookies } from "../../utils/cookies/userInfo";
import LocalStorage from "../../assorted/LocalStorage";
import strings from "../../i18n/definitions";

import * as s from "../../components/FormPage.sc";
import * as scs from "../Settings.sc";

export default function ProfileDetails({ api, setUser }) {
  const [userDetails, setUserDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useContext(UserContext);

  useEffect(() => {
    api.getUserDetails((data) => {
      setUserDetails(data);
    });
  }, [user.session, api]);

  function updateUserInfo(info) {
    LocalStorage.setUserInfo(info);
    setUser({
      ...user,
      name: info.name,
      learned_language: info.learned_language,
      native_language: info.native_language,
    });

    saveUserInfoIntoCookies(info);
  }

  function handleSave(e) {
    e.preventDefault();
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

  return (
    <>
      <div>
        <NavLink to="/account_settings/options">
          <ArrowBackRoundedIcon />
        </NavLink>{" "}
        Profile Details
      </div>
      <s.FormContainer>
        <scs.StyledSettings>
          {" "}
          <form className="formSettings">
            <h5>{errorMessage}</h5>

            <label>{strings.name}</label>
            <input
              name="name"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
            <br />

            <label>{strings.email}</label>
            <input
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />

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
