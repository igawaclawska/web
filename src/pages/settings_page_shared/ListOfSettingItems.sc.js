import styled, { css } from "styled-components";

const ListOfSettingItems = styled.ul`
  box-sizing: border-box;
  max-width: 600px;
  margin: 0;
  padding: 0;
  width: 100%;
  & li:first-child {
    border-radius: 6px 6px 0 0;
    /* border-bottom: none; */
  }
  & li:last-child {
    border-radius: 0 0 6px 6px;
  }

  & li:not(:first-child) {
    margin-top: -2px;
    /* border-bottom: 1px; */
  }

  & li:not(:last-child) {
    /* border-bottom: 1px; */
    /* box-shadow: 0 2px 0px 0px red; */
  }
`;

export { ListOfSettingItems };
