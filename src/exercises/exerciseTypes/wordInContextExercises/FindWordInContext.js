import strings from "../../../i18n/definitions.js";
import WordInContextExercise from "./WordInContextExercise.js";
import { EXERCISE_TYPES } from "../../ExerciseTypeConstants.js";

//The user can either click on the correct translation of a given L1 word in a L2 context or type the correct translation of the L1 word in the bottom input.

export default function FindWordInContext({ ...props }) {
  return (
    <WordInContextExercise
      {...props}
      exerciseType={EXERCISE_TYPES.findWordInContext}
      exerciseHeadline={strings.findTheWordInContextHeadline}
      showBottomInput={true}
    />
  );
}
