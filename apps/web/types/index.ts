export type Club = {
  id: number;
  name: string;
  category: string;
  recruiting: boolean;
  image: string;
  description: string;
  introduction: string;
  establishedYear: number;
  activities: string[];
};

export type Recruit = {
  id: number;
  title: string;
  club: string;
  content: string;
  category: string;
  startDate: string;
  endDate: string;
  views: number;
  daysLeft: number;
  image: string;
  recruitmentCount: string;
  activityPeriod: string;
};

export type Announcement = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  views: number;
};
