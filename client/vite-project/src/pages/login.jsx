import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import JoVoLogo from '../components/JoVoLogo'
import InstaCardsAnimation from '../components/InstaCardsAnimation'
import api from '../axiosCalls/axios'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { user, setUser, loading } = useAuth()
    // Password hide/show toggle ke liye UI state
    const [showPassword, setShowPassword] = useState(false)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    // Agar user pehle se logged in hai to direct home bhej do
    useEffect(() => {
        if (!loading && user) {
            navigate('/home', { replace: true })
        }
    }, [user, loading, navigate])

    // User details state for login
    const [form, setForm] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        if (error) setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        setError(null)

        try {
            const res = await api.post('/users/login', form)
            setLoader(false)
            console.log("Logged in successfully")
            if (res.data?.user) {
                setUser(res.data.user)
                localStorage.setItem('jovo_user', JSON.stringify(res.data.user))
            }
            navigate('/home')
        } catch (err) {
            setLoader(false)
            const msg = err.response?.data?.message || "Invalid credentials or login failed"
            setError(msg)
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#000000] text-white flex flex-col justify-between">
            {/* Main Split-Screen Section */}
            <div className="flex-1 w-full flex flex-col lg:flex-row">

                {/* LEFT SIDE (Instagram Branding & Animated Story Cards) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-6 sm:px-12 lg:px-20 py-10 lg:py-16">
                    <div className="w-full max-w-[480px] flex flex-col items-center lg:items-start text-center lg:text-left">

                        {/* Instagram Style Gradient Logo */}
                        <div className="flex items-center gap-3">
                            <JoVoLogo className="w-14 h-14" />
                            <span className="text-3xl font-bold tracking-wide bg-gradient-to-r from-[#ffd600] via-[#ff0069] to-[#d300c5] bg-clip-text text-transparent">
                                JoVo
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.2] mt-8 max-w-md">
                            See everyday moments from your{' '}
                            <span className="bg-gradient-to-r from-[#ff0069] via-[#d300c5] to-[#7638fa] bg-clip-text text-transparent">
                                close friends.
                            </span>
                        </h1>

                        {/* Staggered Story Cards with Surrounding Feature Symbols */}
                        <div className="mt-6 flex justify-center w-full">
                            <InstaCardsAnimation />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE (Instagram Dark Auth Panel) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-10 lg:py-16 bg-[#121214] lg:border-l border-white/[0.08]">
                    <div className="w-full max-w-[380px] flex flex-col">

                        {/* Header */}
                        <h2 className="text-white text-xl font-bold mb-6">
                            Log in to JoVo
                        </h2>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            {/* Error Alert */}
                            {error && (
                                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                                    {error}
                                </div>
                            )}

                            {/* Email */}
                            <div className="flex flex-col">
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    placeholder="email address"
                                    className="w-full bg-[#1c1c1e] text-white text-sm rounded-xl px-4 py-3.5 border border-[#363636] hover:border-[#555] focus:border-[#737373] transition-all duration-200 placeholder:text-zinc-500 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col">
                                <div className="relative flex items-center">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={form.password}
                                        placeholder="Password"
                                        className="w-full bg-[#1c1c1e] text-white text-sm rounded-xl pl-4 pr-11 py-3.5 border border-[#363636] hover:border-[#555] focus:border-[#737373] transition-all duration-200 placeholder:text-zinc-500 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 text-zinc-400 hover:text-white transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button (Instagram Blue) */}
                            <button
                                type="submit"
                                disabled={loader}
                                className={`w-full mt-2 py-3 rounded-xl bg-[#0064e0] hover:bg-[#1877f2] font-semibold text-white text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md ${loader ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loader ? "Logging in..." : "Log in"}
                            </button>
                        </form>

                        {/* Forgotten Password link */}
                        <div className="text-center mt-5">
                            <button
                                type="button"
                                className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                            >
                                Forgotten password?
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="my-6 border-t border-white/[0.08]" />

                        {/* Instagram Style Outline Button to Signup */}
                        <Link
                            to="/signup"
                            className="w-full py-2.5 rounded-full border border-[#0095f6] text-[#0095f6] hover:bg-[#0095f6]/10 font-semibold text-sm text-center transition-colors"
                        >
                            If you don't have an account in JoVo ?? sign up here
                        </Link>

                        {/* Bottom Meta-style Logo (JoVo) */}
                        <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-sm font-semibold mt-10">
                            <span className="text-base font-bold">∞</span>
                            <span>JoVo</span>
                        </div>

                    </div>
                </div>

            </div>

            {/* Instagram-style Footer */}
            <footer className="w-full py-6 px-4 border-t border-white/[0.06] text-center text-xs text-zinc-500 flex flex-col items-center gap-3">
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 max-w-4xl">
                    <span className="hover:text-zinc-300 cursor-pointer">JoVo</span>
                    <span className="hover:text-zinc-300 cursor-pointer">About</span>
                    <span className="hover:text-zinc-300 cursor-pointer">Blog</span>
                    <span className="hover:text-zinc-300 cursor-pointer">Jobs</span>
                    <span className="hover:text-zinc-300 cursor-pointer">Help</span>
                    <span className="hover:text-zinc-300 cursor-pointer">API</span>
                    <span className="hover:text-zinc-300 cursor-pointer">Privacy</span>
                    <span className="hover:text-zinc-300 cursor-pointer">Terms</span>
                    <span className="hover:text-zinc-300 cursor-pointer">Locations</span>
                    <span className="hover:text-zinc-300 cursor-pointer">Popular</span>
                    <span className="hover:text-zinc-300 cursor-pointer">JoVo Lite</span>
                    <span className="hover:text-zinc-300 cursor-pointer">JoVo AI</span>
                    <span className="hover:text-zinc-300 cursor-pointer">Threads</span>
                    <span className="hover:text-zinc-300 cursor-pointer">Contact uploading and non-users</span>
                    <span className="hover:text-zinc-300 cursor-pointer">JoVo Verified</span>
                </div>
                <div>
                    <span>© 2026 JoVo from Rudra</span>
                </div>
            </footer>
        </div>
    )
}

export default Login