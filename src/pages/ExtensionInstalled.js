import * as s from "./ExtensionInstalled.sc";
import { getUserSession } from "../utils/cookies/userInfo";
import * as z from "../components/FormPage.sc";
import strings from "../i18n/definitions";
import { useEffect } from "react";
import LocalStorage from "../assorted/LocalStorage";

export default function ExtensionInstalled({ api }) {
  useEffect(() => {
    api.logUserActivity(api.OPEN_EXTENSION_INSTALLED);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <s.PageBackground>
      <z.LogoOnTop />
      <s.ExtensionContainer>
        <s.ExtensionInstalledWrapper>
          <h1>
            Extension installed!
            {/* {strings.congratulations} */}
          </h1>
          <p>
            Make sure to pin the extension for easier access
            {/* {strings.pinExtension} */}
          </p>
          {/* <s.VideoLink>Learn how it works by watching
            <a href="https://vimeo.com/715531198" 
            target="_blank" 
            rel="noreferrer" 
            onClick={() => LocalStorage.setClickedVideo()}> this video</a>
          </s.VideoLink> */}
          <img
            src={"../static/images/pin_extension.gif"}
            alt="How to pin Chrome Extension to Chrome Toolbar gif"
          />
          <s.LinkContainer>
            {getUserSession() ? (
              <a href="/articles">
                <s.OrangeButton>Go to Zeeguu</s.OrangeButton>
                {/* {strings.goToArticles} */}
              </a>
            ) : (
              <>
                <a href="/login">
                  <s.OrangeButton>{strings.login}</s.OrangeButton>
                </a>

                <a href="/create_account">
                  <s.OrangeButton>{strings.createAccount}</s.OrangeButton>
                </a>
              </>
            )}
          </s.LinkContainer>
        </s.ExtensionInstalledWrapper>
      </s.ExtensionContainer>
    </s.PageBackground>
  );
}
