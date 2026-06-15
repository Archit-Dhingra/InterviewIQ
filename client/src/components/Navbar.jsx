import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const {userdata} = useSelector((state) => state.user);
    const [showCreditPopup, setShowCreditPopup] = useState(false);
    const [showUserPopup, setShowUserPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try{
            await axios.get(ServerUrl + "api/auth/logout",
                {
                    withCredentials : true
                }
            )

            dispatch(setUserData(null));
            setShowUserPopup(false);
            setShowCreditPopup(false);
            navigate("/");
        }
        catch(error){
            console.error("Logout Error:", error);
        }
    }

  return (
    <div className = "bg-[#f3f3f3] flex justify-center px-4 pt-6">
        <motion.div 
            initial = {{opacity : 0, y : -40}}
            animate = {{opacity : 1, y : 0}}
            transition = {{duration : 0.6}}
            className = "w-full max-w-6xl flex items-center justify-between relative bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4">
                
            <div className = "flex items-center gap-3 cursor-pointer">
                <div className = "bg-black text-white p-2 rounded-lg">
                    <BsRobot size = {18} />
                </div>

                <h1 className = "font-semibold hidden md:block text-lg">InterviewIQ.AI</h1>
            </div>

            <div className = "flex items-center gap-6 relative">

                <div className = "relative">
                    <button
                        onClick = {() => {
                            if(!userdata){
                                setShowAuth(true);
                                return;
                            }
                            setShowCreditPopup(!showCreditPopup)
                            setShowUserPopup(false);
                        }}
                        className = "flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition"
                    >
                        <BsCoin size = {20} />
                        {userdata ? userdata.credits : 0}

                        {showCreditPopup && (
                            <div className = "absolute right-[-80px]  top-[45px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50">
                                <p className = "text-sm text-gray-600 mb-4">
                                    Need more credits to continue interviews?
                                </p>
                                <button 
                                    onClick = {() => navigate("/pricing")} 
                                    className = "w-full bg-black text-white py-2 rounded-lg text-sm">
                                    Buy more Credits
                                </button>
                            </div>
                        )}
                    </button>
                </div>

                <div className = "relative">
                    <button 
                    onClick = {() => {
                        if(!userdata){
                            setShowAuth(true);
                            return;
                        }
                        setShowUserPopup(!showUserPopup)
                        setShowCreditPopup(false);      
                    }}
                    className = " w-9 h-9 flex bg-black items-center gap-2 rounded-full text-white justify-center font-semibold">
                        {userdata? userdata.name.slice(0,1).toUpperCase() : <FaUserAstronaut size = {16} />}
                    </button>

                    {showUserPopup && (
                        <div className = "absolute right-[-80px] top-[43px] mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50">
                            
                            <p className = "text-md text-blue-500 font-medium mb-1 px-1">
                                {userdata? userdata.name : "Guest User"}
                            </p>

                            <button 
                            onClick = {() => navigate("/history")}
                            className="w-full text-left text-sm py-2 px-1 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition">
                                Interview History
                            </button>

                            <button 
                            onClick = {handleLogout}
                            className = "w-full text-left text-sm py-2 px-1 flex items-center gap-2 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-lg transition">
                                <HiOutlineLogout size = {16} />
                                Logout
                            </button>

                        </div>    
                    )}
                </div>

            </div>


         </motion.div>

         {showAuth && <AuthModel onClose = {() => setShowAuth(false)} />}
    </div>
  )
}

export default Navbar

// Exporting the Navpar and making new API endpoints for fetching user data and logging out the user has been implemented. The Navbar now also displays the user's credits and provides a popup to buy more credits or view interview history.