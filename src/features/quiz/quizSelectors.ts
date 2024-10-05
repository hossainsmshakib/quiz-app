import { RootState } from "../../store/store";

export const selectQuiz = (state: RootState) => state.quiz;
export const selectQuizStatus = (state: RootState) =>
  state.quiz.quizzes[0]?.status;
