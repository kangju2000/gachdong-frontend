import { useState } from 'react';
import { Question } from '../types';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        type: 'short',
        title: '',
        description: '',
        required: false,
        maxLength: 100,
        options: [],
      },
    ]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: Question[keyof Question]) => {
    setQuestions(prev => {
      const newQuestions = [...prev];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value,
      } as Question;
      return newQuestions;
    });
  };

  const removeQuestion = (index: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleQuestionReorder = (startIndex: number, endIndex: number) => {
    setQuestions(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed as Question);
      return result;
    });
  };

  const addOption = (questionIndex: number) => {
    setQuestions(prev => {
      const newQuestions = [...prev];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: [...(newQuestions[questionIndex]?.options || []), ''],
      } as Question;
      return newQuestions;
    });
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions(prev => {
      const newQuestions = [...prev];
      const newOptions = [...(newQuestions[questionIndex]?.options || [])];
      newOptions[optionIndex] = value;
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: newOptions,
      } as Question;
      return newQuestions;
    });
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    setQuestions(prev => {
      const newQuestions = [...prev];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: (newQuestions[questionIndex]?.options || []).filter((_, i) => i !== optionIndex),
      } as Question;
      return newQuestions;
    });
  };

  return {
    questions,
    addQuestion,
    updateQuestion,
    removeQuestion,
    handleQuestionReorder,
    addOption,
    updateOption,
    removeOption,
  };
}
