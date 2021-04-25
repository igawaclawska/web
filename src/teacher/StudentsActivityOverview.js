import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StudentInfoLine from "./StudentInfoLine";
import { StyledButton, TopButtonWrapper } from "./TeacherButtons.sc";
import * as s from "../components/ColumnWidth.sc";
import * as sc from "../components/TopTabs.sc";

export default function StudentsActivityOverview({api}) {
  const cohortID = useParams().cohortID;
  const [cohortName, setCohortName] = useState("");
  const studentID = "StudentName(HARDCODED)";
  
  //TODO Would be nicer to have an api-call: api.getCohortName(cohortID){//returns the name of the cohort that has the cohortID} instead of the mess below
  useEffect(()=>{
    api.getCohortsInfo((res) => {
      const currentCohortArray = res.filter(
        (cohort) => cohort.id ===cohortID
        );
        setCohortName(currentCohortArray[0].name)
    });
    //eslint-disable-next-line
  },[])

  return (
    <Fragment>
      <s.WideColumn>
        <sc.TopTabs>
          <h1>{cohortName}</h1>
        </sc.TopTabs>
        <div>
          <br />
          <br />
          <TopButtonWrapper>
            <Link to="/teacher/texts/AddTextOptions">
              <StyledButton primary>STRINGS Add text</StyledButton>
            </Link>
            <StyledButton primary>STRINGS Add student</StyledButton>
          </TopButtonWrapper>
          <br />
          <br />
          <StudentInfoLine cohortID={cohortID} studentID={studentID} />
          <StudentInfoLine cohortID={cohortID} studentID={studentID} />
          <br />
          <br />
          ("Add student" and "X" will open a popup.)
        </div>
      </s.WideColumn>
    </Fragment>
  );
}
