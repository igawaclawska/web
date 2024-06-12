import styled from "styled-components";
import { blue100, blue400, lightGrey } from "../../components/colors";

const SettingsItem = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  border: 2px solid  ${lightGrey};
  height: 56px;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  /* margin-left: auto;
  margin-right: auto; */
  &:hover {
   border: 2px solid ${blue400};
  }
  &:active {
   border: 2px solid ${blue400};
   background-color:  ${blue100};
  }
`;

export { SettingsItem };
