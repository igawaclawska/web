import { zeeguuOrange } from "../colors";
import styled from "styled-components";

const CheckboxWrapper = styled.div`
  margin-top: -0.8em;
  align-self: start;
  display: grid;
  grid-template-columns: 1em auto;
  align-items: flex-start;
  gap: 0.5em;
  @media (max-width: 576px) {
    margin-top: -0.5em;
  }
  label {
    font-size: 0.9em;
    line-height: 1.35;
  }
  input[type="checkbox"] {
    margin-top: 0.1em;
    width: 1.2em;
    height: 1.2em;
    accent-color: ${zeeguuOrange};
    @media (max-width: 576px) {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export { CheckboxWrapper };
