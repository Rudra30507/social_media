import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()

  // Jab tak /users/me se cookies verify ho rahi hain, tab tak loader dikhao
  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-zinc-700 border-t-pink-500 rounded-full animate-spin" />
          <span className="text-xs text-zinc-400">Verifying session...</span>
        </div>
      </div>
    )
  }

  // Agar user pehle se logged-in hai to seedha /home pe bhej do
  if (user) {
    return <Navigate to="/home" replace />
  }

  // Agar logged in nahi hai to public page (login, signup, etc.) render karo
  return children
}

export default PublicRoute
