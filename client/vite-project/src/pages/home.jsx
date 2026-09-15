import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Heart, MessageCircle, Share2, Sparkles } from 'lucide-react'
import JoVoLogo from '../components/JoVoLogo'
import api from '../axiosCalls/axios'

const Home = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get('/users/me')
        setCurrentUser(res.data.user)
      } catch (e) {
        const cached = localStorage.getItem('jovo_user')
        if (cached) setCurrentUser(JSON.parse(cached))
      }
    }
    fetchMe()
  }, [])

  const handleLogout = async () => {
    try {
      await api.post('/users/logout')
    } catch (e) {
      console.error(e)
    }
    localStorage.removeItem('jovo_user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#121214]/90 backdrop-blur-xl border-b border-white/[0.08] px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <JoVoLogo className="w-9 h-9" />
          <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-[#ffd600] via-[#ff0069] to-[#d300c5] bg-clip-text text-transparent">
            JoVo
          </span>
        </div>

        <div className="flex items-center gap-3">
          {currentUser && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                {currentUser.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-xs font-medium text-zinc-300">
                @{currentUser.username || 'user'}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-800 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-400 border border-zinc-700 hover:border-rose-500/40 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Feed */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="rounded-2xl p-6 bg-[#121214] border border-white/[0.08] text-center sm:text-left flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#ffd600] via-[#ff0069] to-[#d300c5] p-0.5 shrink-0">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xl font-bold">
              ✌️
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold">Welcome to JoVo, {currentUser?.name || 'Friend'}!</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Your peaceful social feed is ready. Moments from close friends appear here.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home