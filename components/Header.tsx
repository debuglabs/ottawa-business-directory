import React from "react";
import SparkleIcon from "./icons/SparkleIcon";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white p-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SparkleIcon className="h-8 w-8 text-yellow-400 animate-pulse" />
          <h1 className="text-3xl font-bold tracking-tight">
            Ottawa Business Directory
          </h1>
        </div>
        <p className="text-sm text-purple-300 hidden md:block">
          Discover & Filter Company Data
        </p>
      </div>
    </header>
  );
};

export default Header;
