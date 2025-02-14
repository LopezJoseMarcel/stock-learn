"use client"
import React from "react";
import { useUser } from "@/contexts/userContex";
import InfoPage from "@/components/pages/InfoPage";

function HomePage() {

 const { user } = useUser();
 
  
  return (
    
    <div className="min-h-screen bg-white flex flex-col">
     <InfoPage/>
    </div>
  );
}

export default HomePage;
