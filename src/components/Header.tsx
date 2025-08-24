import { Bell, Menu, User } from "lucide-react";
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









const Header = () => {
//  const dispatch=useDispatch()
  const dispatch = useAppDispatch();
  const { value, status } = useAppSelector((state) => state.counter);
    const [incrementAmount, setIncrementAmount] = useState("post-job");
    const [login,setLogin]=useState(false)

      const handleChange = () => {
             dispatch({type:"footerOverlay",payload:"post-job"})
            // setValue(myValue);
        

       // setHeight("h-[50px]");
  
     // console.log(myValue)

    };


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
      console.log(value)
      
        
         
            

      
    }, [value])
    

















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
          
          <div><Drawer>
  <DrawerTrigger>login</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Login to proceed</DrawerTitle>
    </DrawerHeader>
    <div>
                  <label className="block text-sm font-medium mb-2">email</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. Senior React Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">password</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
                <div>
                
                </div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">New User Register</Button>
      </DrawerClose>
    </DrawerFooter>
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
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
            </Button>
            
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost">Sign In</Button>
              <Button variant="default">Sign Up</Button>
            </div>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;