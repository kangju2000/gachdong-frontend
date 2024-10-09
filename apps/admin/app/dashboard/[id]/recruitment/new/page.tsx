'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Plus, X, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface QuestionType {
  value: string;
  label: string;
}

const questionTypes: QuestionType[] = [
  { value: 'short', label: '단답형' },
  { value: 'long', label: '장문형' },
  { value: 'multiple', label: '객관식' },
  { value: 'checkbox', label: '체크박스' },
];

interface PostInfo {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  processes: string[];
}

interface Question {
  type: string;
  title: string;
  description: string;
  required: boolean;
  maxLength: number;
  options: string[];
}

export default function RecruitmentPostCreation() {
  const router = useRouter();
  const [postInfo, setPostInfo] = useState<PostInfo>({
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    processes: ['서류 심사'],
  });
  const [questions, setQuestions] = useState<Question[]>([]);

  const handlePostInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostInfo({ ...postInfo, [name]: value });
  };

  const addProcess = () => {
    setPostInfo({ ...postInfo, processes: [...postInfo.processes, ''] });
  };

  const updateProcess = (index: number, value: string) => {
    const newProcesses = [...postInfo.processes];
    newProcesses[index] = value;
    setPostInfo({ ...postInfo, processes: newProcesses });
  };

  const removeProcess = (index: number) => {
    const newProcesses = postInfo.processes.filter((_, i) => i !== index);
    setPostInfo({ ...postInfo, processes: newProcesses });
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
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

  const updateQuestion = (index: number, field: keyof Question, value: string | boolean | number) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options = newQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
    setQuestions(newQuestions);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newQuestions = Array.from(questions);
    const [reorderedItem] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, reorderedItem);
    setQuestions(newQuestions);
  };

  const handleSaveDraft = () => {
    console.log('임시 저장:', { postInfo, questions });
    // TODO: Implement save draft functionality
  };

  const handlePublish = () => {
    console.log('공고 게시:', { postInfo, questions });
    // TODO: Implement publish functionality
    router.push('/recruitment');
  };

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case 'short':
        return <Input className="mt-2 border-gray-600 bg-gray-700 text-gray-100" disabled placeholder="단답형 답변" />;
      case 'long':
        return (
          <Textarea className="mt-2 border-gray-600 bg-gray-700 text-gray-100" disabled placeholder="장문형 답변" />
        );
      case 'multiple':
        return (
          <div className="mt-2 space-y-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" disabled />
                <span className="text-gray-300">{option}</span>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="mt-2 space-y-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox disabled />
                <span className="text-gray-300">{option}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card className="border-gray-700 bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100">모집 공고 생성</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-200">
              제목
            </Label>
            <Input
              id="title"
              name="title"
              value={postInfo.title}
              onChange={handlePostInfoChange}
              className="border-gray-600 bg-gray-700 text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-200">
              공고 내용
            </Label>
            <Textarea
              id="content"
              name="content"
              value={postInfo.content}
              onChange={handlePostInfoChange}
              className="min-h-[200px] border-gray-600 bg-gray-700 text-gray-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-gray-200">
                시작 날짜
              </Label>
              <div className="relative">
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={postInfo.startDate}
                  onChange={handlePostInfoChange}
                  className="border-gray-600 bg-gray-700 pl-10 text-gray-100"
                />
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-gray-200">
                마감 날짜
              </Label>
              <div className="relative">
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={postInfo.endDate}
                  onChange={handlePostInfoChange}
                  className="border-gray-600 bg-gray-700 pl-10 text-gray-100"
                />
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200">프로세스 설정</Label>
            {postInfo.processes.map((process, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={process}
                  onChange={e => updateProcess(index, e.target.value)}
                  className="border-gray-600 bg-gray-700 text-gray-100"
                  placeholder={`프로세스 ${index + 1}`}
                />
                <Button
                  onClick={() => removeProcess(index)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addProcess} variant="outline" className="mt-2">
              <Plus className="mr-2 h-4 w-4" /> 프로세스 추가
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-700 bg-gray-800 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-100">지원서 템플릿</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <Eye className="mr-2 h-4 w-4" /> 미리보기
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-gray-100">
              <DialogHeader>
                <DialogTitle>지원서 미리보기</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-6">
                {questions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-semibold">{question.title}</h3>
                    <p className="text-sm text-gray-400">{question.description}</p>
                    {renderQuestionPreview(question)}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button onClick={addQuestion} className="bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> 질문 추가
          </Button>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {questions.map((question, index) => (
                    <Draggable key={`question-${index}`} draggableId={`question-${index}`} index={index}>
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="rounded-lg border border-gray-700 p-4"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <ArrowUp
                                className="h-4 w-4 cursor-pointer text-gray-400"
                                onClick={() => {
                                  if (index > 0) {
                                    const newQuestions = [...questions];
                                    [newQuestions[index - 1], newQuestions[index]] = [
                                      newQuestions[index],
                                      newQuestions[index - 1],
                                    ];
                                    setQuestions(newQuestions);
                                  }
                                }}
                              />
                              <ArrowDown
                                className="h-4 w-4 cursor-pointer text-gray-400"
                                onClick={() => {
                                  if (index < questions.length - 1) {
                                    const newQuestions = [...questions];
                                    [newQuestions[index], newQuestions[index + 1]] = [
                                      newQuestions[index + 1],
                                      newQuestions[index],
                                    ];
                                    setQuestions(newQuestions);
                                  }
                                }}
                              />
                            </div>
                            <Button onClick={() => removeQuestion(index)} variant="destructive" size="sm">
                              삭제
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-200">질문 유형</Label>
                            <Select value={question.type} onValueChange={value => updateQuestion(index, 'type', value)}>
                              <SelectTrigger className="border-gray-600 bg-gray-700 text-gray-100">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {questionTypes.map(type => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="mt-2 space-y-2">
                            <Label className="text-gray-200">질문 제목</Label>
                            <Input
                              value={question.title}
                              onChange={e => updateQuestion(index, 'title', e.target.value)}
                              className="border-gray-600 bg-gray-700 text-gray-100"
                            />
                          </div>
                          <div className="mt-2 space-y-2">
                            <Label className="text-gray-200">질문 설명</Label>
                            <Textarea
                              value={question.description}
                              onChange={e => updateQuestion(index, 'description', e.target.value)}
                              className="border-gray-600 bg-gray-700 text-gray-100"
                            />
                          </div>
                          {(question.type === 'short' || question.type === 'long') && (
                            <div className="mt-2 space-y-2">
                              <Label className="text-gray-200">최대 글자 수</Label>
                              <Input
                                type="number"
                                value={question.maxLength}
                                onChange={e => updateQuestion(index, 'maxLength', parseInt(e.target.value))}
                                className="border-gray-600 bg-gray-700 text-gray-100"
                              />
                            </div>
                          )}
                          {(question.type === 'multiple' || question.type === 'checkbox') && (
                            <div className="mt-2 space-y-2">
                              <Label className="text-gray-200">옵션</Label>
                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <Input
                                    value={option}
                                    onChange={e => updateOption(index, optionIndex, e.target.value)}
                                    className="border-gray-600 bg-gray-700 text-gray-100"
                                  />
                                  <Button
                                    onClick={() => removeOption(index, optionIndex)}
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-gray-100"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button onClick={() => addOption(index)} variant="outline" size="sm">
                                옵션 추가
                              </Button>
                            </div>
                          )}
                          <div className="mt-2 flex items-center space-x-2">
                            <Switch
                              checked={question.required}
                              onCheckedChange={checked => updateQuestion(index, 'required', checked)}
                            />
                            <Label className="text-gray-200">필수 항목</Label>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          onClick={handleSaveDraft}
          variant="outline"
          className="border-gray-600 bg-gray-700 text-gray-100 hover:bg-gray-600"
        >
          임시 저장
        </Button>
        <Button onClick={handlePublish} className="bg-blue-600 text-white hover:bg-blue-700">
          공고 게시
        </Button>
      </div>
    </div>
  );
}
