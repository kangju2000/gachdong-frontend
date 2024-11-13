'use client';

import { useRouter } from 'next/navigation';
import { PostInfoSection } from './PostInfoSection';
import { ProcessSection } from './ProcessSection';
import { ApplicationTemplate } from './ApplicationTemplate';
import { ActionButtons } from './ActionButtons';
import { usePostInfo } from '../../hooks/usePostInfo';
import { useQuestions } from '../../hooks/useQuestions';

export default function RecruitmentForm() {
  const router = useRouter();
  const { postInfo, handlePostInfoChange, addProcess, updateProcess, removeProcess } = usePostInfo();

  const {
    questions,
    addQuestion,
    updateQuestion,
    removeQuestion,
    handleQuestionReorder,
    addOption,
    updateOption,
    removeOption,
  } = useQuestions();

  const handleSaveDraft = async () => {
    try {
      // TODO: API 호출 구현
      console.log('임시 저장:', { postInfo, questions });
    } catch (error) {
      console.error('임시 저장 실패:', error);
      // TODO: 에러 처리
    }
  };

  const handlePublish = async () => {
    try {
      // TODO: API 호출 구현
      console.log('공고 게시:', { postInfo, questions });
      router.push('/recruitment');
    } catch (error) {
      console.error('공고 게시 실패:', error);
      // TODO: 에러 처리
    }
  };

  return (
    <div className="space-y-6">
      <PostInfoSection postInfo={postInfo} onChange={handlePostInfoChange} />

      <ProcessSection
        processes={postInfo.processes}
        onAdd={addProcess}
        onUpdate={updateProcess}
        onRemove={removeProcess}
      />

      <ApplicationTemplate
        questions={questions}
        onAdd={addQuestion}
        onUpdate={updateQuestion}
        onRemove={removeQuestion}
        onReorder={handleQuestionReorder}
        onAddOption={addOption}
        onUpdateOption={updateOption}
        onRemoveOption={removeOption}
      />

      <ActionButtons onSaveDraft={handleSaveDraft} onPublish={handlePublish} />
    </div>
  );
}
