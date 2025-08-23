import { MapPin, Clock, DollarSign, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface JobCardProps {
  jobTitle: string;
  company: string;
  location: string;
  budget: string;
  posterName: string;
  description: string;
  status:string,
  timePosted:string,
  deadline:string,



    
  }












const Pending = () => {

 const [jobs, setJobs] = useState<JobCardProps[]>([]);
 const[myId,setMyId]=useState("")
 const[myname,setMyname]=useState('')
 const[workerEmail,setWorkerEmail]=useState("")


 
 


useEffect(() => {
           const token:string = localStorage.getItem("user");
        const user = JSON.parse(token);
        //setLoginData(user)  
        //console.log(user.userId)
        if(user){
             setMyId(user._id)
        setMyname(user.userName)
       setWorkerEmail(user.userEmail)
        }

        

      
       // console.log(LoginContext["userId"])
       // console.log(typeof(LoginContext))
        //setBossId(loginData.userId)
       // console.log(bossId+"The capiyo")
    }, [])








  useEffect(() => {
        const getUsers = async () => {
          try {
            const data = await fetchUsers();
            setJobs(data);
            //console.log(jobs)
          } catch (err) {
            console.log(err)
           // setError("Error fetching users.");
          } finally {
            console.log("Capiyo")
            //setLoading(false);
          }
        };

        getUsers();
      }, []);



      async function fetchUsers(): Promise<JobCardProps[]> {
      try {
        const response = await fetch('https://solvus-api-4.onrender.com/jobs/all-jobs'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: JobCardProps[] = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error; // Re-throw to allow component to handle
      }
    }



















  return (
      <div className=' overflow-y-auto h-[600px]'  >
            
                      
                           
            <div className='grid sm:grid-cols-2 md:grid-cols-3  gap-1 overflow-y-auto h-[600px]' >
              {jobs.map((job, key) => <Carda    key={key} jobs={job} />)}
              

          
            
            </div>
        </div>
    
     

  );
};

function Carda({jobs}){

  return(
        <Card className="group hover:shadow-medium transition-all duration-300 animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
              {jobs.jobTitle}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{jobs.budget}</span>
            </div>
          </div>
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {jobs.location}
          </span>
        </div>
      </CardHeader>
       
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {jobs.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{jobs.posterName}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{jobs.postedTime}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{jobs.budget}</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm">
            Capiyo
          </Button>
          <Button variant="default" size="sm" className="flex-1 ">
            show interest
          </Button>
          {}
          <Button variant="outline" size="sm">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>

  )
}




export default Pending;