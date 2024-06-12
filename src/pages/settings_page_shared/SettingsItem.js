import React from "react";
import * as s from "./SettingsItem.sc";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function SettingsItem({ children }) {
  return (
    <s.SettingsItem>
      {children} <ArrowForwardRoundedIcon sx={{ color: "#808080" }} />
    </s.SettingsItem>
  );
}
