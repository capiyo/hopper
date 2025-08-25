import { User, Clock, Plus, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Post } from "./Footer/Post";
import Pending from "./Footer/Pending";
import {useDispatch,useSelector} from 'react-redux'
import { Chats } from "./Footer/Chatslist";

import { useCallback ,useEffect} from "react";
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  reset,
  incrementAsync 
} from '../components/ReduxPages/slices/counterSlice'
import { useAppDispatch, useAppSelector } from '../components/ReduxPages/reducers/store';
import {Account} from './Footer/Account'








interface footerLay {
  footerOverlay: string;

}

const MobileNavigation = () => {

  const location = useLocation();
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const[myValue,setValue]=useState("")
//   const dispatch = useDispatch()
       // const  Value=useSelector((state)=>state.footerOverlay)
        //const footerLay: footerLay = useSelector<footerLay>((state) => state.footerOverlay);
          const dispatch = useAppDispatch();
  const { value, status } = useAppSelector((state) => state.counter);

      const handleChange = ( newValue:string) => {
        setActiveDrawer(newValue)
      

             dispatch({type:"footerOverlay",payload:newValue})
             setValue(newValue);
        

       // setHeight("h-[50px]");
  
      console.log(newValue)

    };
const handleIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);









        useEffect(() => {
          console.log(value)
          
            
             
                
    
          
        }, [value])
        






  const navItems = [
    {
      icon: User,
      label: "Account",
      id: 'account',
      isActive: location.pathname === "/account",
    },
    {
      icon: Clock,
      label: "Pending",
      id: 'pending',
      isActive: location.pathname === "/pending",
    },
    {
      icon: Plus,
      label: "Post Job",
      id: "post-job",
      isActive: location.pathname === "/post-job",
    },
    {
      icon: MessageCircle,
      label: "Chats",
      id: "chats",
      isActive: location.pathname === "/chats",
    },
  ];

  const getDrawerContent = (id: string) => {
    console.log(id)
    switch (id) {
      case "account":
        return {
        
          content: (
            <div className="p-6 space-y-4 overflow-y-auto  ">
            <Account/>
            </div>
          )
        };
      case "pending":
        return {
          title: "Pending Applications",
          description: "Track your job applications",
          content: (
            <div className="p-6 space-y-4 overflow-y-auto">
              <Pending/>
          
            </div>
          )
        };
      case "post-job":
        return {
          title: "Post a Job",
          description: "Create a new job posting",
          content: (
            <div className="p-6 space-y-4">
            <Post/>
            </div>
          )
        };
      case "chats":
        return {
          title: "Chats",
          description: "Your messages and conversations",
          content: (
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <Chats/>
                
              </div>
            </div>
          )
        };
      default:
        return { title: "", description: "", content: null };
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-card border-t border-border shadow-strong">
          <div className="grid grid-cols-4 gap-1 px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleChange(item.id)}
                  className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                    activeDrawer === item.id
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-primary hover:text-primary-dark hover:bg-accent"
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Drawers for each navigation item */}
      {navItems.map((item) => {
        const drawerContent = getDrawerContent(item.id);
        return (
          <Drawer
            key={item.id}
            open={activeDrawer === item.id}
            onOpenChange={(open) => !open && handleChange("null")}
          >
            <DrawerContent className="h-[600px] transition-transform duration-500 ease-out">
              <DrawerHeader>
                <DrawerTitle>{drawerContent.title}</DrawerTitle>
                <DrawerDescription>{drawerContent.description}</DrawerDescription>
              </DrawerHeader>
              {drawerContent.content}
            </DrawerContent>
          </Drawer>
        );
      })}
    </>
  );
};

export default MobileNavigation;