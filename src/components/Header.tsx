import { Bell, Menu, User,MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useCallback ,useEffect,useState} from "react";
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  reset,
  incrementAsync 
} from '../components/ReduxPages/slices/counterSlice'
import { useAppDispatch, useAppSelector } from '../components/ReduxPages/reducers/store';
import { count } from "console";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

import {useContext } from 'react'
import { Form, Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
  import { toast } from 'react-hot-toast';
  import { Notifications } from "./Footer/Notifications";









const Header = () => {
//  const dispatch=useDispatch()
  const dispatch = useAppDispatch();
  const { value, status } = useAppSelector((state) => state.counter);
    const [incrementAmount, setIncrementAmount] = useState("post-job");
    const [login,setLogin]=useState(false)
        const[bossId,setBossId]=useState("")
    const[posterName,setPosterName]=useState()
    const[bossPhone,setBossPhone]=useState()
    const[showLogin,setShowLogin]=useState(false)
     let timePosted=new Date().toLocaleTimeString()
    let datePosted=new Date().toLocaleDateString()
    const[notification,setNotifications]=useState(false)



      const handleChange = () => {
             dispatch({type:"footerOverlay",payload:"post-job"})
            

    };

    const hanldleNotfications=()=>{
      setNotifications(true)
    }


        //const { loginData, setLoginData } = useContext(LoginContext);
    //const dispatch=useDispatch()
    //const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()






        const onSubmit = async (data) => {
        console.log(data)
        // send data to backend API
        fetch("https://solvus-api-4.onrender.com/auth/login", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    localStorage.setItem("usertoken", result.token)
                    localStorage.setItem("user", JSON.stringify(result.user));

                   // setLoginData(result.token)
                    
                    toast.success('Successfully toasted!')
                    //navigate('/'); 
                }
                else
                  console.log("hellooo")
                    ////oast.error(result.error)
            })
            .catch((err) => {
               // toast.error("An error occured")
                console.log(err);
            })
    }






















    const changeLoging=()=>{
      setLogin(!login)
    }


     const handleIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const handleDecrement = useCallback(() => {
    dispatch(decrement());
  }, [dispatch]);

 const handleIncrementByAmount = useCallback((string: string) => {
    dispatch(incrementByAmount(string));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleIncrementAsync = useCallback((amount: number) => {
    dispatch(incrementAsync(amount));
  }, [dispatch]);


  






    useEffect(() => {
         const  token = localStorage.getItem("user");
        const user = JSON.parse(token);
       // setLoginData(user)  
        //console.log(user.userId)
        if(user){
          setShowLogin(true)
        setBossId(user._id)
        setPosterName(user.userName)
        setBossPhone(user.phoneNumber)
        }

      
        
         
            

      
    }, [])
    

















  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center justify-between space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">hp</span>
            </div>
            <span className="text-xl text-primary">hopper</span>
           
          </div>
          
          <div className="space-y-4 space-x-4"><Drawer>
           {showLogin !==  true?
  <DrawerTrigger>login</DrawerTrigger>:''}
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Login to proceed</DrawerTitle>
    </DrawerHeader>
    <form  className="ml-4 mr-4"  onSubmit={handleSubmit(onSubmit)}>
    <div className="">
                  <label className="block text-sm font-medium mb-2">email</label>
                  <input 
                  required {...register("userEmail")} 
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. Senior React Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">password</label>
                  <input 
                  required {...register("userPassword")} 
                    type="password" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
                <div>
                
                </div>
                   <DrawerFooter>
      <Button >Submit</Button>
      <DrawerClose>
        <Button  type="submit" variant="outline">New User Register</Button>
      </DrawerClose>
    </DrawerFooter>



                </form>

  </DrawerContent>
</Drawer>

  </div>

          

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Find Jobs
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Companies
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Post a Job
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
          </nav>

          {/* Right Side Actions */}

          <Drawer>
           
  <DrawerTrigger>
      <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle   style={{ color: 'limegreen' }}   className="h-5 w-5 " />
              <span  onClick={hanldleNotfications} className="absolute -top-1 -right-1 h-3 w-3  rounded-full">2</span>
            </Button>
            </div>
            <Notifications/>


  </DrawerTrigger>

</Drawer>






























        


        
           
          
          


            
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost">Sign In</Button>
              <Button variant="default">Sign Up</Button>
            </div>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden right-0">
              
            </Button>
          </div>
        </div>
      
    </header>
  );
};

export default Header;