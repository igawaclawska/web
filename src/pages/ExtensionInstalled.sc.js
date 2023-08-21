import styled from "styled-components";
import { OrangeRoundButton } from "../components/allButtons.sc";
import { FormContainer } from "../components/FormPage.sc";
import {
  zeeguuOrange,
  zeeguuVarmYellow,
  zeeguuDarkOrange,
  zeeguuVeryLightYellow,
  zeeguuVeryLightOrange,
  zeeguuTransparentLightOrange,
} from "../components/colors";

const ExtensionInstalledWrapper = styled.div`
  text-align: center;
  img {
    width: 60%;
    border-radius: 0.25em;
  }
  h1 {
    margin-block-start: 0em;
    margin-block-end: 0em;
    font-size: 1.5em;
    font-weight: 600;
  }
  h4{
    font-size: 1.5em;
    margin-block-start: 0.3em;
    margin-block-end: 0.3em;
  }
  p {
    font-size: 1em;
    font-weight:600;
    /* margin-block-end: 0em; */
  }
`;

let LinkContainer = styled.div`
  margin: 0.8em;
  display: flex;
  justify-content: space-evenly;
`;

let ExtensionContainer = styled(FormContainer)`
  width: 40em;
  max-width: 80%;
  padding: 2em;
`;

const OrangeButton = styled(OrangeRoundButton)`
  padding: 0.8em 2em;
  width: 20em;
  border-radius: 4em;
  font-weight: 600;
  border-bottom: solid 0.2em ${zeeguuDarkOrange};

  a{
    font-weight: 600;
    color: white;
  }
`;

// const OrangeButton = styled.button`
//   min-height: 4em;
//   width: 20em;
//   margin: 0em 1em 0em 1em;
//   background: ${zeeguuOrange};
//   border: 0.3em solid ${zeeguuOrange};
//   border-radius: 7em;

//   a {
//     font-weight: 600;
//     font-size: 1.5em;
//     color: white;
//   }
// `;

let PageBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  margin-top: -1em;
  padding-top: 1em;
  padding-bottom: 1em;
  background: ${zeeguuOrange};
`;

let VideoLink = styled.p`
  margin: 0em;
  padding-bottom: 1em;
`

export {
  ExtensionInstalledWrapper,
  ExtensionContainer,
  LinkContainer,
  OrangeButton,
  PageBackground,
  VideoLink
};
