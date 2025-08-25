import React from 'react'
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
import { Button } from "@/components/ui/button";

export const Notifications = () => {
  return (
    <div className='flex'>  <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
        </DrawerHeader>
        <form  className="ml-4 mr-4"  >
        <div className="">
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
    
      </DrawerContent></div>
  )
}
