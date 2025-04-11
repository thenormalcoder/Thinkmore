import React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
  } from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "../ui/button"
import { MessageCircleCode } from "lucide-react"
import Workspacehistory from "./Workspacehistory"
import SideFooter from "./SideFooter"
 
  export function AppSidebar() {
    const {toggleSidebar}=useSidebar();
    return (
      <Sidebar >
        <SidebarHeader className="p-5">
       <Image src="/logo.png" alt="Logo" width={50} height={65} className='rounded-full cursor-pointer'/>
       <Button className="cursor-pointer mt-2"> <MessageCircleCode/>Start New Chat</Button>
       </SidebarHeader>
        <SidebarContent className="p-5">
            
          <SidebarGroup>
            <Workspacehistory/>
            </SidebarGroup> 
          {/* <SidebarGroup /> */}
        </SidebarContent>
        <SidebarFooter onClick={toggleSidebar}>
          <SideFooter/>
        </SidebarFooter>
      </Sidebar>
    )
  }
  