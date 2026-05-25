export interface GlossaryItem {
  id: string;
  num: string;
  term: string;
  acronym: string;
  description: string;
  metaphor: string;
  category: 'Fondations' | 'Architecture' | 'Fiabilité';
  exampleTag: string;
  exampleText: string;
  bgColorClass: string;
  textColorClass?: string;
}

export interface UseCase {
  id: string;
  num: string;
  title: string;
  description: string;
  mixTech: string;
}

export interface Pitfall {
  id: string;
  num: string;
  title: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
