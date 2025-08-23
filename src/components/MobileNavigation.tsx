import { User, Clock, Plus, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Post } from "./Footer/Post";
import Pending from "./Footer/Pending";
import {useDispatch,useSelector} from 'react-redux'




interface footerLay {
  footerOverlay: string;

}

const MobileNavigation = () => {
  const location = useLocation();
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const[myValue,setValue]=useState("")
   const dispatch = useDispatch()
       // const  Value=useSelector((state)=>state.footerOverlay)
        const footerLay: footerLay = useSelector<footerLay>((state) => state.footerOverlay);

      const handleChange = ( newValue:string) => {
        setActiveDrawer(newValue)
             dispatch({type:"footerOverlay",payload:newValue})
             setValue(newValue);
        

       // setHeight("h-[50px]");
  
      console.log(newValue)

    };






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
    switch (id) {
      case "account":
        return {
          title: "Account",
          description: "Manage your profile and settings",
          content: (
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg hover:bg-accent">
                  Edit Profile
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-accent">
                  Settings
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-accent">
                  Logout
                </button>
              </div>
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
                <div className="flex items-center space-x-3 p-3 hover:bg-accent rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">HR</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">TechCorp HR</h4>
                    <p className="text-sm text-muted-foreground">Thanks for your application...</p>
                  </div>
                  <div className="text-xs text-muted-foreground">2h</div>
                </div>
                <div className="flex items-center space-x-3 p-3 hover:bg-accent rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">JM</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Jane Manager</h4>
                    <p className="text-sm text-muted-foreground">Interview scheduled for tomorrow</p>
                  </div>
                  <div className="text-xs text-muted-foreground">1d</div>
                </div>
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