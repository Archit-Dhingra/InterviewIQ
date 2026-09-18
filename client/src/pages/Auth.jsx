import React, { useState, useEffect } from 'react'
import { BsRobot } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { auth, provider } from "../utils/firebase"
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';


function Auth({isModel = false}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const syncUserWithBackend = async (user) => {
        const cleanServerUrl = ServerUrl ? (ServerUrl.endsWith("/") ? ServerUrl : `${ServerUrl}/`) : "";
        const result = await axios.post(
            cleanServerUrl + "api/auth/google",
            {
                name: user.displayName,
                email: user.email
            },
            {
                withCredentials: true
            }
        );

        dispatch(setUserData(result.data));
        if (!isModel) {
            navigate("/");
        }
    };

    useEffect(() => {
        // If the user authenticated in the popup but the popup had communication/COOP issues,
        // Firebase Auth state listener still catches the active user session.
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser && loading) {
                try {
                    await syncUserWithBackend(currentUser);
                } catch (err) {
                    console.error("Auto-sync error after auth state change:", err);
                    setErrorMessage("Logged in to Google, but could not sync with backend. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        });

        return () => unsubscribe();
    }, [loading]);

    const handleGoogleAuth = async () => {
        if (loading) return;
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await signInWithPopup(auth, provider);
            if (response && response.user) {
                await syncUserWithBackend(response.user);
            }
        } catch (error) {
            console.error("Google Authentication Error:", error);

            // Check if user actually signed in on Firebase despite popup closing warnings/COOP
            if (auth.currentUser) {
                try {
                    await syncUserWithBackend(auth.currentUser);
                    return;
                } catch (syncErr) {
                    console.error("Backend sync failed after login:", syncErr);
                    setErrorMessage("Google login succeeded, but server sync failed. Ensure backend is running.");
                    dispatch(setUserData(null));
                }
            } else if (error.code === 'auth/popup-closed-by-user') {
                setErrorMessage("Sign-in popup was closed before completing.");
            } else if (error.code === 'auth/popup-blocked') {
                setErrorMessage("Sign-in popup was blocked by your browser. Please allow popups.");
            } else if (error.code === 'auth/cancelled-popup-request') {
                // Ignore multiple clicks
            } else {
                setErrorMessage(error.message || "Authentication failed. Please try again.");
            }
            dispatch(setUserData(null));
        } finally {
            setLoading(false);
        }
    };


  return (
    <div className = {`
    w-full
    ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"} `}>
        <motion.div
            initial = {{opacity : 0, y : -40}}
            animate = {{opacity : 1, y : 0}}
            transition = {{duration : 1.5}}
         className = {`
            w-full
            ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
            bg-white shadow-2xl border border-gray-200
         `}>
            <div className = "flex items-center justify-center gap-3 mb-6">
                <div className = "bg-black text-white p-2 rounded-lg">
                    <BsRobot size = {18} />
                </div>
                <h2 className = "font-semibold text-lg">InterviewIQ.AI</h2>
            </div>

            <h1 className = "text-2xl md:text-3xl font-semiboldbold text-center leading-snug mb-4">
                Continue with
                <span className = "bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2">
                    <IoSparkles size = {16} />
                    AI Smart Interview
                </span>
            </h1>

            <p className = "text-gray-600 text-center text-sm md:text-base leading-relaxed mb-8">
                Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.
            </p>

            {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm rounded-xl text-center">
                    {errorMessage}
                </div>
            )}

            <motion.button
                onClick = {handleGoogleAuth}
                disabled = {loading}
                whileHover = {loading ? {} : {opacity : 0.9, scale : 1.03}}
                whileTap = {loading ? {} : {opacity : 1, scale : 0.98}}
                className = {`w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md transition ${
                    loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                }`}>
                {loading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing in...</span>
                    </div>
                ) : (
                    <>
                        <FcGoogle size = {25}/>
                        Continue with Google
                    </>
                )}
            </motion.button>
        </motion.div>
    </div>
  )
}

export default Auth