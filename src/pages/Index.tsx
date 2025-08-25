import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JobCard from "@/components/JobCard";
import MobileNavigation from "@/components/MobileNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Drawer } from "@/components/ui/drawer";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Home/SideBar";


const Index = () => {


  return (
    <div className="min-h-screen bg-background flex-row  md:flex  w-screen">
      <div className="flex flex-row">
       <div className="hidden md:flex"> 
        <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
     
      </main>
    </SidebarProvider>
    </div>
 <div className="flex-col  mr-10">
      <Header />      
      <HeroSection/>
      <JobCard/>
      </div>
      </div>
      
      {/* Job Listings Section */}
      <section className="container mx-auto px-1 py-2">
        <div className="text-center mb-2">
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 md:mb-8">
          
        </div>
      </section>

      <MobileNavigation />
    </div>
  );
};

export default Index;
