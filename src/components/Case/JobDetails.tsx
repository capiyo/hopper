import React, { useState, useEffect } from 'react';
import { Info } from './Info';
import { Chats } from './Chats';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Applicants } from './Applicants';

// Define TypeScript interfaces
interface Job {
  id: string;
  status: string;
  // Add other job properties as needed
}

interface RootState {
  gigStatus: string;
  // Add other state properties as needed
}

export const JobDetails: React.FC = () => {
  const [people, setPeople] = useState<[]>([]);
  const gigStatus = useSelector((state: RootState) => state.gigStatus);
  const [job, setJob] = useState<Job | undefined>();
  const [status, setStatus] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetch(`https://solvus-api-4.onrender.com/jobs/current-job/${id}`)
        .then(res => res.json())
        .then((data: Job) => { 
          setStatus(data.status);
          setJob(data);
          console.log(gigStatus);
        })
        .catch((error: Error) => {
          console.error('Error fetching job details:', error);
        });
    }
  }, [id, gigStatus]);

  return (
    <div className='flex w-full lg:flex-row justify-evenly h-[1000px]'>
      <div>
        {gigStatus !== "Open" ? (
          <div className='overflow-auto md:flex h-screen'>
            <Info />
          </div>
        ) : (
          <div className='overflow-auto md:flex h-screen'>
            <Chats/>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-evenly">
        {gigStatus === "pending" ? (
          <div className='overflow-auto md:flex hidden h-screen'>
            <Info />
          </div>
        ) : (
          <div>
            <div className='overflow-auto border-r-4 sm:w-screen lg:w-[600px] hidden md:flex'>
              <Info />
            </div>
          </div>
        )}
      </div>

      <div className='overflow-y-auto items-center h-screen lg:flex w-[500px] hidden'>
        <Applicants />
      </div>
    </div>
  );
};