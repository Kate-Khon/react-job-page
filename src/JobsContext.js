import { createContext } from "react";

export const JobsContext = createContext({
  contextJobs: null,
  setContextJobs: () => {},
});
