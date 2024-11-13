import { Question } from '../../types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface QuestionPreviewProps {
  questions: Question[];
}

export function QuestionPreview({ questions }: QuestionPreviewProps) {
  const renderQuestionInput = (question: Question) => {
    switch (question.type) {
      case 'short':
        return <Input className="mt-2 border-gray-600 bg-gray-700 text-gray-100" disabled placeholder="단답형 답변" />;
      case 'long':
        return (
          <Textarea className="mt-2 border-gray-600 bg-gray-700 text-gray-100" disabled placeholder="장문형 답변" />
        );
      case 'multiple':
        return (
          <RadioGroup className="mt-2 space-y-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} disabled />
                <Label className="text-gray-300">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'checkbox':
        return (
          <div className="mt-2 space-y-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox disabled />
                <Label className="text-gray-300">{option}</Label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 space-y-6">
      {questions.map((question, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">{question.title}</h3>
            {question.required && <span className="text-red-500">*</span>}
          </div>
          <p className="text-sm text-gray-400">{question.description}</p>
          {renderQuestionInput(question)}
        </div>
      ))}
    </div>
  );
}
