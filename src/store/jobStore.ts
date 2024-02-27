import { create } from "zustand";
import { defaultJobs } from "../constants/constants";
import { Jobs, Job } from "../constants/types";
import { produce } from "immer";

interface JobsStore {
  jobs: Jobs;
  addJob: (job: Job) => void;
  setJobs: (data: Jobs) => void;
}

const useJobStore = create<JobsStore>((set) => ({
  jobs: defaultJobs,
  addJob: (job) => {
    set(
      produce((state: JobsStore) => {
        state.jobs[job.section].name = defaultJobs[job.section].name;
        state.jobs[job.section].items.push(job);
      })
    );
  },
  setJobs: (data) => set({ jobs: data }),
}));

export default useJobStore;
