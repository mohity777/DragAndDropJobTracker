import { defaultJobs } from './constants';

type JobStatus = keyof typeof defaultJobs;

export type Jobs = {
  [status in JobStatus]: {
    name: string;
    items: Job[];
  };
};

export interface Job {
  id: string;
  companyName: string;
  description?: string;
  jobTitle: string;
  section: JobStatus;
}
