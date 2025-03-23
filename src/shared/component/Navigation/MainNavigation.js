import React, {useState} from "react";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../../../users/components/UIElements/Backdrop";
import naturenest from '../../../assets/images/naturenest.png';

const MainNavigation = props => {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = ()=>{
        setDrawerIsOpen(true);
    }
    const closeDrawer = ()=>{
        setDrawerIsOpen(false);
    }
    return (
        <React.Fragment>
            {drawerIsOpen? <Backdrop onClick={closeDrawer}></Backdrop>: null}
           <SideDrawer show={drawerIsOpen}>
            <nav className="main-navigation__drawer-nav">
                <NavLinks/>
            </nav>
        </SideDrawer>
        {/* <--main nav bar--> */}
        <div className="fixed top-0 left-0 w-full shadow-md z-50 bg-white flex flex-row items-center justify-between px-8 py-3">
    {/* Left section - "Your Spaces" */}
    <div className="flex items-center space-x-4">
        <img src={naturenest} alt="logo" className="w-20 h-30 rounded-full mb-4"/>
    </div>

    {/* Right section - Navigation links */}
    <div className="flex items-center space-x-6">
        <NavLinks />
    </div>
</div>
        
    {/* <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}> 
            <span></span>
            <span></span>
            <span></span>

        </button>
        <h1 className="main-navigation__title">
           <Link to="/">Your Places</Link> 
        </h1>
        <nav className="main-navigation__header-nav">
            <NavLinks></NavLinks>
        </nav>

    </MainHeader> */}
    </React.Fragment>);
    
}
export default MainNavigation;