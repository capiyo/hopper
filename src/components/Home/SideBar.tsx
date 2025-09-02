import { useState } from "react";
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Calendar, 
  MessageSquare, 
  ShoppingBag, 
  Heart, 
  Leaf 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import loga from "../../assets/laptop.jpeg"

const navigationItems = [
  { title: "Account", icon: Home },
  { title: "Pending", icon: BarChart3 },
  { title: "Post", icon: Users },
  { title: "Softwawre", url: "/documents", icon: FileText },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Products", url: "/products", icon: ShoppingBag },
  { title: "Favorites", url: "/favorites", icon: Heart },
  { title: "Nature", url: "/nature", icon: Leaf },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

   const handleClick = () => {
    console.log('i love idah')

  };

  const isActive = (path: string) => currentPath === path;
  const hasActiveItem = navigationItems.some((item) => isActive(item.url));

  return (
    <Sidebar className="bg-gradient-sidebar border-sidebar-border shadow-soft transition-all duration-30 ">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft">
            <img  src={loga}  className="rounded-full"/>
      
          </div>
          {open && (
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-sidebar-foreground">
                @capiyo
              </h2>
              <p className="text-xs text-muted-foreground">
                engineercpiyo@gmail.com
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium mb-2">
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton   
                      asChild 
                      className={`
                        group relative overflow-hidden rounded-lg transition-all duration-200 cursor-pointer 
                        ${active 
                          ? 'bg-gradient-accent text-primary-foreground shadow-soft font-medium   bg-primary' 
                          : 'hover:bg-gradient-hover hover:text-sidebar-accent-foreground hover:shadow-soft/50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 px-3 py-2.5">
                        <item.icon className={`
                          h-5 w-5 transition-transform duration-200 group-hover:scale-110
                          ${active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-sidebar-primary'}
                        `} />
                        {open && (
                          <span className="text-sm font-medium transition-colors duration-200" onClick={handleClick}>

                            {item.title}
                          </span>
                        )}
                        {active && (
                          <div className="absolute inset-0 bg-gradient-primary opacity-10 animate-pulse" />
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {open && (
          <div className="mt-8 p-4 bg-mint rounded-xl border border-sage">
            <h3 className="text-sm font-semibold text-forest mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start bg-background/80 hover:bg-sage border-sage text-forest hover:text-forest"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start bg-background/80 hover:bg-sage border-sage text-forest hover:text-forest"
              >
                <FileText className="h-4 w-4 mr-2" />
                Create Report
              </Button>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}