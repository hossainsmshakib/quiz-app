import { createAction } from "@reduxjs/toolkit";

export const activateQuiz = createAction("quiz/activateQuiz");
export const endQuiz = createAction("quiz/endQuiz");
export const submitQuiz = createAction<{
  studentId: string;
  answers: { [key: string]: string };
}>("quiz/submitQuiz");
