import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from '../ContextProvider/Context';
import { useDispatch, useSelector } from 'react-redux';
import { FaMessage, FaEye } from 'react-icons/fa6';
import { RootState } from '../ReduxPages/reducers/store';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

// Define TypeScript interfaces
interface User {
  userId: string;
  userName: string;
  userEmail: string;
  phoneNumber?: string;
}

interface Notification {
  _id: string;
  caseTitle: string;
  budget: string | number;
  message: string;
  status?: string;
  caseId?: string;
  // Add other properties as needed
}

interface CaseData {
  caseId: string;
  caseTitle: string;
  budget: string | number;
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
  budget: string | number;
  phoneNumber?: string;
}

interface UpdateGigStatus {
  status: string;
  caseId: string;
}

export const Notifications: React.FC = () => {
  const [chatlist, setChatlist] = useState<Notification[]>([]);
  const loginData = useContext(LoginContext);
  const [myId, setMyId] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      try {
        const user: User = JSON.parse(token);
        if (user) {
          setMyId(user.userId);
          fetch(`https://solvus-api-4.onrender.com/case/getNotifications/${user.userId}`)
            .then(res => res.json())
            .then((data: Notification[]) => {
              setChatlist(data);
            })
            .catch((error: Error) => console.log(error));
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
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
    <Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>unread notifications</DrawerHeader>
    
    <div 
      className='cursor-pointer w-[400px] overflow-y-auto flex-col absolute bottom-10 h-[300px] bg-white'
      onClick={handleModalClick}
    >
      
      <div className='grid sm:grid-cols-1 md:grid-cols-1 overflow-y-auto container mt-1 mx-auto px-4 bg-white rounded-xl'>
        {chatlist.map((people, key) => (
          <Card key={key} chatlist={people} />
        ))}
      </div>
    </div>
    
  </DrawerContent>
</Drawer>
  );
};

interface CardProps {
  chatlist: Notification;
}

const Card: React.FC<CardProps> = ({ chatlist }) => {
  const [assign, setAssign] = useState<boolean>(false);
  const [workerId, setWorkerId] = useState<string>('');
  const [posterId, setPosterId] = useState<string>("");
  const [workerName, setWorkername] = useState<string>("");
  const [loginData, setLoginData] = useState<User | null>(null);
  const [bossPhone, setBossPhone] = useState<string | undefined>();
  
  const dispatch = useDispatch();
  const caseId = useSelector((state: RootState) => state.caser.caseData.caseId);
  const caseTitel = useSelector((state: RootState) => state.caser.caseData.caseTitle);
  const mybudget = useSelector((state: RootState) => state.caser.caseData.budget);

  const [myId, setMyId] = useState<string>("");
  const [posterName, setPostername] = useState<string>("");
  const [posterEmail, setPosterEMail] = useState<string>("");

  // Notification counter logic
  let notCounter = 0;
  if (chatlist.status && chatlist.status !== "agent") {
    notCounter += 1;
  }

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
      message: "Congratulations you are assigned the gig of Angular dev from @Capiyo",
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
      try {
        const user: User = JSON.parse(token);
        setMyId(user.userId);
        setPostername(user.userName);
        setPosterEMail(user.userEmail);
        setBossPhone(user.phoneNumber);
        setLoginData(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const closeOverlay = (): void => {
    dispatch({ type: "overlay", payload: "close" });
    dispatch({ type: "footerOverlay", payload: "close" });
  };

  const setChatPage = (): void => {
    dispatch({ type: "overlay", payload: "chatpage" });
  };

  const acceptTask = (myCase: string): void => {
    dispatch({ type: "overlay", payload: "close" });
    dispatch({ type: "footerOverlay", payload: "close" });

    const updateGigStatus: UpdateGigStatus = {
      status: "agent",
      caseId: myCase
    };

    fetch(`https://solvus-api-4.onrender.com/case/current-case/update`, {
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

  const getGigData = (gigTitle: string, gigId: string, budget: string | number, status: string): void => {
    const data: CaseData = {
      caseTitle: gigTitle,
      caseId: gigId,
      budget: budget
    };

    dispatch({ type: "caseData", payload: data });
    dispatch({ type: "gigStatus", payload: status });
    console.log(data);
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

  return (
    <div className='border shadow-lg  rounded-xl flex-row bg-white card'>
      <div className='flex gap-3'>
        <div>
        
        </div>
        <div>
          <div className='flex items-center'>
            <span className='pl-1 text-black'>{chatlist.caseTitle}</span>
            <div>
              <div className='lg:block text-blue-900 mt-10'>
                <div onClick={closeOverlay} className='flex flex-row text-purple-400 sm:text-[9px] font-bold lg:text-base'>
                  <FaEye/>decline
                </div>
              </div>
            </div>
          </div>
          <h1 className='font-bold text-sm lg:text-lg text-black'>{chatlist.budget}</h1>
        </div>
      </div>
      <div>
        <p className='text-sm py-1 text-black'>{chatlist.message}</p>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <span className='pl-2 text-black'>{chatlist.budget}</span>
        </div>
      </div>
      <div className='flex flex-row justify-evenly w-100%'>
        <div>
          <button className='lg:block bg-green-100 text-black text-sm py-1 px-4 rounded-md'>
            Ksh 3000
          </button>
        </div>
        <div>
          <Link to={`/current-job/${chatlist._id}`}>
            <div onClick={() => acceptTask(chatlist._id)} className='lg:block text-blue-900  text-sm'>
              <div className='flex flex-row text-blue-400 sm:text-[9px] font-bold lg:text-base'>
                <FaEye/>Accept
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
