import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {FaTimes} from "react-icons/fa"
import Auth from '../pages/Auth';

function AuthModel({onClose}) {
    const {userdata} = useSelector((state) => state.user);

    useEffect(() => {
        if(userdata){
            onClose();
        }
    }, [userdata, onClose]);

  return (
    <div className = "fixed inset-0 z-[999] flex items-center justify-center bg-black/10 backdrop-blur-sm px-4">

        <div className = "relative w-full max-w-md">
            <button 
            onClick = {onClose}
            className = "absolute top-8 right-5 text-gray-800 hover : text-black text-xl active:scale-65 transition">
                <FaTimes size={18}/>
            </button>

            <Auth isModel = {true} />
        </div>

    </div>
  )
}

export default AuthModel