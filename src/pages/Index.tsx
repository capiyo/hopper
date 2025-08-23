import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JobCard from "@/components/JobCard";
import MobileNavigation from "@/components/MobileNavigation";

const Index = () => {
  const sampleJobs = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $180k",
      type: "Full-time",
      postedTime: "2 hours ago",
      description: "We're looking for a passionate Senior Software Engineer to join our growing team. You'll work on cutting-edge projects using React, Node.js, and cloud technologies."
    },
    {
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$90k - $140k",
      type: "Full-time",
      postedTime: "5 hours ago",
      description: "Lead product strategy and work cross-functionally with engineering, design, and marketing teams to deliver exceptional user experiences."
    },
    {
      title: "UX Designer",
      company: "Design Studio",
      location: "New York, NY",
      salary: "$70k - $100k",
      type: "Contract",
      postedTime: "1 day ago",
      description: "Create intuitive and beautiful user experiences for web and mobile applications. Work closely with product and engineering teams."
    },
    {
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Boston, MA",
      salary: "$95k - $150k",
      type: "Full-time",
      postedTime: "2 days ago",
      description: "Apply machine learning and statistical analysis to solve complex business problems. Experience with Python, R, and SQL required."
    },
    {
      title: "Marketing Manager",
      company: "Growth Co.",
      location: "Austin, TX",
      salary: "$65k - $95k",
      type: "Full-time",
      postedTime: "3 days ago",
      description: "Drive marketing initiatives and campaigns to increase brand awareness and customer acquisition. Experience with digital marketing preferred."
    },
    {
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Seattle, WA",
      salary: "$110k - $160k",
      type: "Full-time",
      postedTime: "4 days ago",
      description: "Manage cloud infrastructure and deployment pipelines. Experience with AWS, Docker, and Kubernetes essential."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection  />
      
      {/* Job Listings Section */}
      <section className="container mx-auto px-1 py-2">
        <div className="text-center mb-2">
          <h2 className="text-sm font-bold text-foreground mb-2">Latest Gigs Opportunities</h2>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 md:mb-8">
          
            <JobCard />
        </div>
      </section>

      <MobileNavigation />
    </div>
  );
};

export default Index;
