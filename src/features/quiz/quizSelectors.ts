import { RootState } from "../../store/store";

export const selectQuiz = (state: RootState) => state.quiz;
export const selectQuizStatus = (state: RootState) => state.quiz.status;
export const submitQuiz = (p0: { studentId: string; answers: { [key: string]: string; }; }) => {
    console.log("Quiz submitted");
};