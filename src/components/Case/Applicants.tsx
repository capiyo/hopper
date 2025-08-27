import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from '../../components/ContextProvider/Context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../ReduxPages/reducers/store'

// Define TypeScript interfaces
interface User {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  phoneNumber?: string;
}

interface Applicant {
  workerName: string;
  workerEmail: string;
  workerId: string;
  pSkill: string;
  // Add other properties as needed based on your API response
}

interface MessageData {
  workerId: string;
  posterId: string;
  caseId: string;
  caseTitle: string;
  workerEmail: string;
  workerName: string;
  posterName: string;
  posterEmail: string;
  message: string;
  status: string;
}

interface PaymentData {
  budget: string;
  phoneNumber?: string;
}

interface UpdateGigStatus {
  status: string;
  id: string | undefined;
  agentId: string;
}



interface ApplicantsProps {
  title?: string;
}

interface CardProps {
  applicants: Applicant;
  title?: string;
}

export const Applicants: React.FC<ApplicantsProps> = ({ title }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const { id } = useParams<{ id: string }>();
  const loginData = useContext(LoginContext);
  const [myId, setMyId] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const user: User = JSON.parse(token);
      setMyId(user._id);
      // Note: setLoginData might not work as expected since LoginContext is likely a context object
    }
  }, []);

  useEffect(() => {
    fetch("https://solvus-api-4.onrender.com/jobs/applicants")
      .then(res => res.json())
      .then((data: Applicant[]) => {
        const newData = data;
        setApplicants(newData);
        console.log(newData);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  return (
    <div className=''>
      <h1 className='text-center text-xl md:text-2xl font-bold text-primary'>All Applicants</h1>
      <div className='grid sm:grid-cols-1 md:grid-cols-1'>
        {applicants.map((people, key) => (
          <Card key={key} applicants={people} title={title} />
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ applicants, title }) => {
  const [assign, setAssign] = useState<boolean>(false);
  const [workerId, setWorkerId] = useState<string>('');
  const [posterId, setPosterId] = useState<string>("");
  const [workerName, setWorkername] = useState<string>("");
  const [loginData, setLoginData] = useState<User | null>(null);
  const [bossPhone, setBossPhone] = useState<string | undefined>();
 
  
  const { id } = useParams<{ id: string }>();
 const caseId = useSelector((state: RootState) => state.caser.caseData.caseId);
const caseTitel = useSelector((state: RootState) => state.caser.caseData.caseTitle);
  const mybudget = useSelector((state: RootState) => state.caser.caseData.budget);
//  const caseData = useSelector((state: RootState) => state.caseData);
console.log(caseId)

  const [myId, setMyId] = useState<string>("");
  const [posterName, setPostername] = useState<string>("");
  const [posterEmail, setPosterEMail] = useState<string>("");

  const confirmAssign = (): void => {
    setAssign(true);
  };

  const getMessApplicantsData = (userName: string, userId: string, userEmail: string): void => {
    const messageData: MessageData = {
      workerId: userId,
      posterId: myId,
      caseId: caseId,
      caseTitle: caseTitel,
      workerEmail: userEmail,
      workerName: userName,
      posterName: posterName,
      posterEmail: posterEmail,
      message: `Congratulations you are assigned the gig of ${caseTitel} from @${posterName}`,
      status: "unchecked"
    };

    fetch("https://solvus-api-4.onrender.com/case/addNotifications", {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(messageData)
    })
    .then((res) => res.json())
    .then((result) => {
      changeJobStatus();
    })
    .catch((error: Error) => {
      console.log(error);
      toast.error("Failed to Notify, Please try again");
      setAssign(false);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const user: User = JSON.parse(token);
      setMyId(user.userId);
      setPostername(user.userName);
      setPosterEMail(user.userEmail);
      setBossPhone(user.phoneNumber);
      setLoginData(user);
    }
  }, []);

  const asssignNow = (): void => {
    setAssign(false);
  };

  const cancelAssign = (): void => {
    setAssign(false);
  };

  const sendPayments = (username: string, userId: string, userEmail: string): void => {
    const paymentData: PaymentData = {
      budget: mybudget,
      phoneNumber: bossPhone
    };

    fetch("https://solvus-api-4.onrender.com/payment/stk/push", {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(paymentData)
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result) {
        getMessApplicantsData(username, userId, userEmail);
      }
    })
    .catch((error: Error) => {
      console.log(error);
      toast.error("Payment Failed kindly try again later");
      setAssign(false);
    });
  };

  const changeJobStatus = (): void => {
    const updateGigStatus: UpdateGigStatus = {
      status: "admin",
      id: id,
      agentId: myId
    };

    fetch(`https://solvus-api-4.onrender.com/jobs/current-job/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateGigStatus)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setAssign(false);
      console.log('Resource updated successfully:', data);
    })
    .catch((error: Error) => {
      console.error('Error updating resource:', error);
    });
  };

  return (
    <div className='border shadow-lg lg:w-[500px] rounded-xl flex-row card'>
      <div className='flex items-center gap-3'>
        <div>
          
        </div>
        <div>
          <div className='flex items-center'>
            <span className='pl-1 text-blue-800'>{applicants.workerEmail}</span>
          </div>
          <h1 className='font-bold text-md lg:text-lg'>{applicants.pSkill}</h1>
        </div>
      </div>
      <div>
        <p className='text-sm py-4'>{applicants.workerEmail}</p>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <span className='pl-2'>{applicants.workerEmail}</span>
        </div>
      </div>
      <div className='flex flex-row justify-evenly w-100%'>
        <div>
          <button className='lg:block bg-green-500 text-white text-sm py-1 px-4 rounded-md'>
            View Profile
          </button>
        </div>
        <div>
          <button onClick={confirmAssign} className='lg:block bg-green-500 text-white text-sm py-1 px-4 rounded-md'>
            Assign task
          </button>
        </div>
      </div>
      <div>
        {assign && (
          <div className='flex bg-white flex-col p-2 rounded-xl -rotate-20 sticky'>
            <div className='flex'>
              <div className='flex flex-row'>
                <p>
                  Confirm Payment before assigning gig to{' '}
                  <span className='font-bold text-red-800'>
                    {`@${applicants.workerName}`}
                  </span>
                  , once assigned No reassigning
                </p>
              </div>
           
            </div>
            <div className='flex flex-row justify-evenly w-100%'>
              <div>
                <button onClick={cancelAssign} className='lg:block bg-primary text-white text-sm py-1 px-4 rounded-md'>
                  Cancel
                </button>
              </div>
              <div>
                <button 
                  onClick={() => sendPayments(applicants.workerName, applicants.workerId, applicants.workerEmail)}
                  className='lg:block bg-primary text-white text-sm py-1 px-4 rounded-md'
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};