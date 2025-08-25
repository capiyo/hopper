
        import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/Context';
import { useDispatch, useSelector } from 'react-redux';
import { FaMessage, FaEye } from 'react-icons/fa6';
import { toast } from 'react-toastify';

// Define TypeScript interfaces
interface User {
  userId: string;
  userName: string;
  userEmail: string;
  phoneNumber?: string;
}

interface ChatList {
  jobTitle: string;
  role: string;
  budget: string;
  jobId: string;
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

interface RootState {
  caseData: {
    caseId: string;
    budget: string;
    caseTitle: string;
  };
  // Add other state properties as needed
}

export const Chats: React.FC = () => {
  const [chatlist, setChatlist] = useState<ChatList[]>([]);
  const loginData = useContext(LoginContext);
  const [myId, setMyId] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const user: User = JSON.parse(token);
      if (user) {
        setMyId(user.userId);
        fetch(`https://solvus-api-4.onrender.com/jobs/getChatlist`)
          .then(res => res.json())
          .then((data: ChatList[]) => {
            setChatlist(data);
          })
          .catch((error: Error) => console.log(error));
      }
    }
  }, []);

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  const closeOverlay = (): void => {
    dispatch({ type: "overlay", payload: "close" });
    dispatch({ type: "footerOverlay", payload: "close" });
  };

  const setChatPage = (): void => {
    dispatch({ type: "overlay", payload: "chatpage" });
  };

  return (
    <div 
      className='overflow-y-auto flex-col absolute bottom-10  bg-white'
      onClick={handleModalClick}
    >
      <div className='flex flex-row justify-evenly bg-green-200 rounded-t-lg h-10'>
        <h1 onClick={setChatPage} className='text-center text-sm flex flex-row ml-2 md:text-sm text-red-300'>
          <FaMessage/> View
        </h1>
        <h1 onClick={closeOverlay} className='text-base text-center cursor-pointer text-green-500'>
          close
        </h1>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-1 overflow-y-auto container mt-1 mx-auto px-4 bg-white rounded-xl'>
        {chatlist.map((people, key) => (
          <Card key={key} chatlist={people} />
        ))}
      </div>
    </div>
  );
};

interface CardProps {
  chatlist: ChatList;
}

const Card: React.FC<CardProps> = ({ chatlist }) => {
  const [assign, setAssign] = useState<boolean>(false);
  const [workerId, setWorkerId] = useState<string>('');
  const [posterId, setPosterId] = useState<string>("");
  const [workerName, setWorkername] = useState<string>("");
  const [loginData, setLoginData] = useState<User | null>(null);
  const [bossPhone, setBossPhone] = useState<string | undefined>();
  
  const dispatch = useDispatch();
  const caseId = useSelector((state: RootState) => state.caseData.caseId);
  const caseTitel = useSelector((state: RootState) => state.caseData.caseTitle);
  const mybudget = useSelector((state: RootState) => state.caseData.budget);

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
      message: `Congratulations you are assigned the gig of Angular dev from ${posterName}`,
      status: "Started"
    };

    fetch("https://solvus-api-4.onrender.com/case/addWorkerChats", {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(messageData)
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setAssign(false);
      toast.success("Notified successfully kindly wait for his reply in your inbox or check thread chat");
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

  const closeOverlay = (): void => {
    dispatch({ type: "overlay", payload: "close" });
    dispatch({ type: "footerOverlay", payload: "close" });
  };

  const setChatPage = (): void => {
    dispatch({ type: "overlay", payload: "chatpage" });
  };

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
    })
    .catch((error: Error) => {
      console.log(error);
      toast.error("Payment Failed kindly try again later");
      setAssign(false);
    });
  };

  // Placeholder for logoURL - you should define this properly
  const logoURL = "https://via.placeholder.com/50";

  return (
    <div className='border shadow-lg  rounded-xl flex-row bg-white card'>
      <div className='flex gap-3'>
        <div>
          <img src={logoURL} alt={chatlist.jobTitle} className='rounded-full w-12' />
        </div>
        <div>
          <div className='flex items-center'>
            <span className='pl-1 text-black'>{chatlist.jobTitle}</span>
            <Link to={`/current-job/${chatlist.jobId}`}>
              <div className='lg:block text-blue-900 mt-10'>
                <div onClick={closeOverlay} className='flex flex-row text-purple-400 sm:text-[9px] font-bold lg:text-base'>
                  <FaEye/>view
                </div>
              </div>
            </Link>
          </div>
          <h1 className='font-bold text-sm lg:text-lg text-black'>{chatlist.role}</h1>
        </div>
      </div>
      <div>
        <p className='text-sm py-1 text-black'>
          Hasokom is looking for Django developer to work on their api kindly send request
        </p>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <span className='pl-2 text-black'>{chatlist.budget}</span>
        </div>
      </div>
      <div className='flex flex-row justify-evenly w-100%'>
        <div>
          <button className='lg:block bg-green-100 text-black text-sm py-1 px-4 rounded-md'>Ksh 3000</button>
        </div>
        <div>
          <button onClick={confirmAssign} className='lg:block bg-blue-300 text-black text-sm py-1 px-4 rounded-md'>
            Live
          </button>
        </div>
      </div>
    </div>
  );
};