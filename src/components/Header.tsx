import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch=useDispatch()

      const handleChange = () => {
             dispatch({type:"footerOverlay",payload:"post-job"})
            // setValue(myValue);
        

       // setHeight("h-[50px]");
  
     // console.log(myValue)

    };























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
             <span   onClick={handleChange}  className="text-xl  text-primary">login</span>
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