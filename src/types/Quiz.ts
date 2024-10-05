export interface Question {
    id: string;
    text: string;
    type: "MCQ" | "TrueFalse";
    options: string[];
  }
  
  export interface Quiz {
    id: string; 
    title: string;
    timeLimit: number;
    questions: Question[];
    status: string;
  }