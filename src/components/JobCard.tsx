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












const JobCard = ({ title, company, location, salary, type, postedTime, description }: JobCardProps) => {
const [job,setJobs]=useState([])

function mapDbRowToUser(dbRow: string): JobCardProps {
      return {
        jobTitle: dbRow.jobTitle,
        location: dbRow.location,
        lastName: dbRow.last_name,
        email: dbRow.email_address,
      };
    }


      useEffect(() => {

         fetch("https://solvus-api-4.onrender.com/jobs/all-jobs").then(res => res.json()).then(
            data => {
                //const newData = data
                setJobs(data)
              console.log(data)
             
                
               
            }
        );

       

        
      



    }, []);

























  return (
    <Card className="group hover:shadow-medium transition-all duration-300 animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{company}</span>
            </div>
          </div>
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {type}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{salary}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{postedTime}</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm">
            Capiyo
          </Button>
          <Button variant="default" size="sm" className="flex-1 ">
            show interest
          </Button>
          <Button variant="outline" size="sm">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;