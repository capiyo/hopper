
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Home/SideBar";
import { Menu } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Leaf, 
  Activity,
  Calendar,
  MessageSquare,
  ArrowUpRight 
} from "lucide-react";

const stats = [
  {
    title: "Total Projects",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Activity,
    description: "Active environmental projects"
  },
  {
    title: "Team Members",
    value: "156",
    change: "+8%",
    trend: "up", 
    icon: Users,
    description: "Contributing to sustainability"
  },
  {
    title: "Carbon Saved",
    value: "2.4T",
    change: "+23%",
    trend: "up",
    icon: Leaf,
    description: "CO2 equivalent this month"
  },
  {
    title: "Growth Rate",
    value: "18.2%",
    change: "+4.1%",
    trend: "up",
    icon: TrendingUp,
    description: "Monthly sustainability metrics"
  }
];

const recentActivities = [
  { action: "New sustainability report generated", time: "2 hours ago", type: "report" },
  { action: "Team meeting scheduled for green initiatives", time: "4 hours ago", type: "meeting" },
  { action: "Carbon footprint analysis completed", time: "1 day ago", type: "analysis" },
  { action: "New eco-friendly supplier added", time: "2 days ago", type: "supplier" }
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function HeroSection() {
  return (
 <div className=" hidden md:flex ">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground shadow-elevated ">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Hopper gigs</h1>
            <p className="text-primary-foreground/90 text-lg">
              Manage your sustainable initiatives and track environmental impact
            </p>
          </div>
          <div className="hidden md:block">
            <Leaf className="h-16 w-16 text-primary-foreground/20" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-background to-sage/30 border-sage hover:shadow-soft transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="secondary" 
                  className="bg-emerald-light text-forest text-xs"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
     
    </div>
  );
}