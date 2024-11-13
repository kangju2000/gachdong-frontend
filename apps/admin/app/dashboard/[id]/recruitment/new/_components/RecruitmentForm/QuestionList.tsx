'use client';

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Question } from '../../types';
import { QuestionItem } from './QuestionItem';

interface QuestionListProps {
  questions: Question[];
  onUpdate: (index: number, field: keyof Question, value: string | boolean | number | string[]) => void;
  onRemove: (index: number) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  onAddOption: (questionIndex: number) => void;
  onUpdateOption: (questionIndex: number, optionIndex: number, value: string) => void;
  onRemoveOption: (questionIndex: number, optionIndex: number) => void;
}

export function QuestionList({
  questions,
  onUpdate,
  onRemove,
  onReorder,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: QuestionListProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="questions">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {questions.map((question, index) => (
              <QuestionItem
                key={`question-${index}`}
                question={question}
                index={index}
                onUpdate={onUpdate}
                onRemove={onRemove}
                onAddOption={onAddOption}
                onUpdateOption={onUpdateOption}
                onRemoveOption={onRemoveOption}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
