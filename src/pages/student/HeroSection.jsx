import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 dark:from-gray-900 dark:to-blue-950 py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-white text-5xl font-bold mb-6 leading-tight">
          Discover Your Perfect Learning Path
        </h1>
        <p className="text-blue-100 dark:text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
          Access thousands of expert-led courses and accelerate your career with personalized learning experiences
        </p>

        <form onSubmit={searchHandler} className="flex items-center bg-white/95 dark:bg-gray-800/90 rounded-lg shadow-xl overflow-hidden max-w-2xl mx-auto mb-8 border border-white/20 backdrop-blur-sm">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to learn today?"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-lg"
          />
          <Button 
            type="submit" 
            className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-6 hover:bg-blue-700 dark:hover:bg-blue-800 font-medium text-lg m-1 rounded-md"
          >
            Search
          </Button>
        </form>
        
        <div className="flex justify-center gap-4 mt-6">
          <Button 
            onClick={() => navigate(`/course/search?query`)} 
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium px-8 py-3"
          >
            Explore All Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;