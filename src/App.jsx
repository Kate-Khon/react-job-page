import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Board } from './components/Board/Board';
import { JobDetails } from './components/JobDetails/JobDetails';
import { JobsContext } from './JobsContext';
import useLocalStorage from './hooks/useLocalStorage';
import { jobsApi } from './api/jobsApi';
import { localJobs } from './localData/localJobs';

const App = () => {
  const [jobs, setJobs] = useLocalStorage();

  const getJobs = async () => {
    let jobsList;

    try {
      jobsList = await jobsApi;
      console.log('Api fetched');
    } catch (error) {
      jobsList = localJobs;
      console.error('Api not fetched', error);
    }

    setJobs(jobsList);
  }

  useEffect(() => {
    if (!jobs) {
      getJobs();
    }
  }, [])

  return (
    <>
      <JobsContext.Provider value={{ jobs }}>
        <Routes>
          <Route path="/" element={() => {
            console.log();
            <Navigate to="/board" replace />
          }} />
          <Route path="/board">
            <Route index element={<Board />} />

              {jobs && (
                <Route path=":jobId" element={<JobDetails />} />
              )}
          </Route>
        </Routes>
      </JobsContext.Provider>
    </>
  )
}

export default App;
