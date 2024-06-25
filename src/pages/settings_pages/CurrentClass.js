import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import strings from "../../i18n/definitions";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

import * as s from "../../components/FormPage.sc";
import * as scs from "../Settings.sc";

import { Error } from "../../teacher/sharedComponents/Error";

export default function CurrentClass({ api }) {
  const history = useHistory();
  const [inviteCode, setInviteCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentCohort, setCurrentCohort] = useState("");
  const [showJoinCohortError, setShowJoinCohortError] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    api.getStudent((student) => {
      if (student.cohort_id !== null) {
        api.getCohortName(student.cohort_id, (cohort) =>
          setCurrentCohort(cohort.name),
        );
      }
    });
  }, [user.session, api]);

  function handleInviteCodeChange(event) {
    setShowJoinCohortError(false);
    setInviteCode(event.target.value);
  }

  function saveStudentToClass() {
    api.joinCohort(
      inviteCode,
      (status) => {
        status === "OK"
          ? history.push("/articles/classroom")
          : setShowJoinCohortError(true);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  const studentIsInCohort = currentCohort !== "";

  return (
    <>
      <div>
        <NavLink to="/account_settings/options">
          <ArrowBackRoundedIcon />
        </NavLink>{" "}
        Current Class
      </div>

      <s.FormContainer>
        <scs.StyledSettings>
          <form className="formSettings">
            <h5>{errorMessage}</h5>

            <div>
              <p className="current-class-of-student">
                <b>
                  {studentIsInCohort
                    ? strings.yourCurrentClassIs + currentCohort
                    : strings.youHaveNotJoinedAClass}
                </b>
              </p>
              <label className="change-class-string">
                {studentIsInCohort ? strings.changeClass : strings.joinClass}
              </label>
              <input
                type="text"
                placeholder={
                  studentIsInCohort
                    ? strings.insertNewInviteCode
                    : strings.insertInviteCode
                }
                value={inviteCode}
                onChange={(event) => handleInviteCodeChange(event)}
              />

              {showJoinCohortError && (
                <Error message={strings.checkIfInviteCodeIsValid} />
              )}
            </div>

            <s.FormButton onClick={saveStudentToClass}>
              <span>
                {studentIsInCohort ? strings.changeClass : strings.joinClass}
              </span>
            </s.FormButton>
          </form>
        </scs.StyledSettings>
      </s.FormContainer>
    </>
  );
}
