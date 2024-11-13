import { useState } from 'react';
import { PostInfo } from '../types';

export function usePostInfo() {
  const [postInfo, setPostInfo] = useState<PostInfo>({
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    processes: ['서류 심사'],
  });

  const handlePostInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostInfo(prev => ({ ...prev, [name]: value }));
  };

  const addProcess = () => {
    setPostInfo(prev => ({ ...prev, processes: [...prev.processes, ''] }));
  };

  const updateProcess = (index: number, value: string) => {
    setPostInfo(prev => {
      const newProcesses = [...prev.processes];
      newProcesses[index] = value;
      return { ...prev, processes: newProcesses };
    });
  };

  const removeProcess = (index: number) => {
    setPostInfo(prev => ({
      ...prev,
      processes: prev.processes.filter((_, i) => i !== index),
    }));
  };

  return {
    postInfo,
    handlePostInfoChange,
    addProcess,
    updateProcess,
    removeProcess,
  };
}
