import React, { useEffect, useState, Fragment } from "react";
import LoadingAnimation from "../components/LoadingAnimation";
import CohortList from "./CohortList";
import strings from "../i18n/definitions";
import * as s from "../components/ColumnWidth.sc";
import * as sc from "../components/TopTabs.sc";

function Home({ api }) {
  const [cohorts, setCohortsInfo] = useState([]);
  const [isLoadingCohorts, setIsLoadingCohorts] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    api.getCohortsInfo(setCohortsInfo);
    setIsLoadingCohorts(false);
    // eslint-disable-next-line
  }, [forceUpdate]);

  return (
    <Fragment>
      <s.NarrowColumn>
        <sc.TopTabs>
          <h1>{strings.myClasses}</h1>
        </sc.TopTabs>

        {isLoadingCohorts ? (
          <LoadingAnimation />
        ) : (
          <CohortList
            api={api}
            setForceUpdate={setForceUpdate}
            cohorts={cohorts}
          />
        )}
      </s.NarrowColumn>
    </Fragment>
  );
}

export default Home;
