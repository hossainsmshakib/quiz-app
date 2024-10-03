import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface QuizState {
  title: string;
  timeLimit: number;
  status: "inactive" | "active" | "ended";
  questions: Question[];
  submissions: { [studentId: string]: { [questionId: string]: string } };
}

const initialState: QuizState = {
  title: "",
  timeLimit: 0,
  status: "inactive",
  questions: [],
  submissions: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    createQuiz(
      state,
      action: PayloadAction<{
        title: string;
        timeLimit: number;
        questions: Question[];
      }>
    ) {
      state.title = action.payload.title;
      state.timeLimit = action.payload.timeLimit;
      state.questions = action.payload.questions;
      state.status = "inactive";
    },
    activateQuiz(state) {
      state.status = "active";
    },
    endQuiz(state) {
      state.status = "ended";
    },
    submitQuiz(
      state,
      action: PayloadAction<{
        studentId: string;
        answers: { [questionId: string]: string };
      }>
    ) {
      state.submissions[action.payload.studentId] = action.payload.answers;
    },
  },
});

export const { createQuiz, activateQuiz, endQuiz, submitQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
