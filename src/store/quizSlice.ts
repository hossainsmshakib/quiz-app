import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "../types/Quiz";
import { RootState } from "../store/store";

interface QuizState {
  quizzes: Quiz[];
}

const initialState: QuizState = {
  quizzes: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    createQuiz(state, action: PayloadAction<Quiz>) {
      const existingQuiz = state.quizzes.find(quiz => quiz.id === action.payload.id);
      if (!existingQuiz) {
        state.quizzes.push({ ...action.payload, status: "inactive" });
      }
    },
    setQuizzes(state, action: PayloadAction<Quiz[]>) {
      state.quizzes = action.payload;
    },
    activateQuiz(state, action: PayloadAction<string>) {
      const quiz = state.quizzes.find((q: Quiz) => q.id === action.payload);
      if (quiz) {
        quiz.status = "active";
      }
    },
    endQuiz(state, action: PayloadAction<string>) {
      const quiz = state.quizzes.find((q: Quiz) => q.id === action.payload);
      if (quiz) {
        quiz.status = "ended";
      }
    },
    submitQuiz(state, action: PayloadAction<{ quizId: string; answers: any }>) {
      const { quizId, answers } = action.payload;
      const quiz = state.quizzes.find((q: Quiz) => q.id === quizId);
      if (quiz) {
        console.log(`Quiz submitted: ${quizId}`, answers);
      }
    },
  },
});

export const { createQuiz, setQuizzes, submitQuiz, activateQuiz, endQuiz } = quizSlice.actions;

export const selectQuiz = (state: RootState) => state.quiz;
export const selectQuizStatus = (state: RootState, quizId: string) =>
  state.quiz.quizzes.find((q: Quiz) => q.id === quizId)?.status;

export default quizSlice.reducer;