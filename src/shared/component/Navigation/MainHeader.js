import React from "react";
import './MainHeader.css';
const MainHeader = props =>{
    return <header className="flex flex-col h-16 space-x-4 space-y0items-center justify-center w-full position-fixed top-0 left-0 shadow-md z-5 md:flex-row
     md:justify-end md:space-y-4 md:space-x-0 p-8 bg-white">
        {props.children}
    </header>
}

export default MainHeader;