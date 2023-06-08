let zeeguuVeryLightYellow = "#fafad2";
let zeeguuVeryLightOrange = "hsl(46, 90%, 90%)";
let zeeguuTransparentLightYellow = "#ffe59e10";
let zeeguuLightYellow = "#ffe59e";
let zeeguuVarmYellow = "#ffd047";
let zeeguuSalmonOrange = "#f8bb86";
let zeeguuTransparentLightOrange = "hsl(54,100%,95%)";
let zeeguuTransparentMediumOrange = "#ffbe007a";
let zeeguuYellow = "#FABF26";
let zeeguuGreen = "#66CA56";
let zeeguuDark = "#0B0C0A";
let zeeguuOrange = "#ffbb54";
const zeeguuSecondOrange = "#FF912C";
const zeeguuGray = "#616161";
const zeeguuSecondGray = "#414141";
const zeeguuThirdGray = "#CBCBCB";
const iconsGray = "#B8B8C2";
let zeeguuDarkOrange = "#9c7130";
let lightBlue = "#54cdff";
let darkBlue = "#4492b3";
let veryLightGrey = "#efefef";
let lightGrey = "#c1c1c1";
let darkGrey = "#808080";
let veryDarkGrey = "#575757";
let almostBlack = "#444444";
let zeeguuRed = "#d7263d";
let errorRed = "red";
let zeeguuViolet = "#4a0d67";
let darkGreen = "#006400"
let alertGreen = "#4caf50"; //careful when changing this color. It is defined to match the color in the success-alert to undo feedback submits.
let matchGreen = "#B3F78F";
let blue = "#4A4964";
let blueDark = "#43435B";
let gray = "#CFCFD2";
let lightGray = "#e8e8e8";
let savedBG = "#DF6B00";

//black - the css standard color is used throughout the repo.
//white - the css standard color is used throughout the repo.

const setColors = (isOnStudentSide) => {
  let light_color = blue;
  let dark_color = blueDark;
  if (!isOnStudentSide) {
    light_color = lightBlue;
    dark_color = darkBlue;
  }
  return { light_color, dark_color };
};

export {
  zeeguuVeryLightYellow,
  zeeguuVeryLightOrange,
  zeeguuTransparentLightYellow,
  zeeguuLightYellow,
  zeeguuVarmYellow,
  zeeguuSalmonOrange,
  zeeguuTransparentLightOrange,
  zeeguuTransparentMediumOrange,
  zeeguuOrange,
  zeeguuDarkOrange,
  lightBlue,
  darkBlue,
  veryLightGrey,
  lightGrey,
  darkGrey,
  veryDarkGrey,
  almostBlack,
  zeeguuRed,
  errorRed,
  zeeguuViolet,
  darkGreen,
  alertGreen,
  matchGreen,
  setColors,
  zeeguuSecondOrange,
  zeeguuGray,
  zeeguuSecondGray,
  zeeguuThirdGray,
  iconsGray,
  zeeguuYellow,
  zeeguuGreen,
  zeeguuDark,
  blueDark,
  blue,
  gray,
  lightGray,
  savedBG,
};
