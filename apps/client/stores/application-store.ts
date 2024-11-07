import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ApplicationForm {
  clubId: number;
  recruitId: number;
  name: string;
  phone: string;
  email: string;
  resume?: File;
  portfolio?: File;
  motivation: string;
  techStack: string[];
  preferredEnvironment: string;
  status: 'DRAFT' | 'SUBMITTED';
  createdAt: string;
}

interface ApplicationStore {
  draftApplications: Record<string, ApplicationForm>;
  submittedApplications: ApplicationForm[];
  saveDraft: (key: string, form: ApplicationForm) => void;
  submitApplication: (form: ApplicationForm) => void;
  getDraft: (key: string) => ApplicationForm | undefined;
  removeDraft: (key: string) => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      draftApplications: {},
      submittedApplications: [],

      saveDraft: (key, form) => {
        set(state => ({
          draftApplications: {
            ...state.draftApplications,
            [key]: { ...form, status: 'DRAFT', createdAt: new Date().toISOString() },
          },
        }));
      },

      submitApplication: form => {
        set(state => ({
          submittedApplications: [
            ...state.submittedApplications,
            { ...form, status: 'SUBMITTED', createdAt: new Date().toISOString() },
          ],
        }));
        // 제출 후 임시저장 삭제
        const key = `${form.clubId}-${form.recruitId}`;
        get().removeDraft(key);
      },

      getDraft: key => get().draftApplications[key],

      removeDraft: key => {
        set(state => {
          const { [key]: _, ...rest } = state.draftApplications;
          return { draftApplications: rest };
        });
      },
    }),
    {
      name: 'application-storage',
    }
  )
);
