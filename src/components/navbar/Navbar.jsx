import { useState, useEffect } from "react"

export default function Navbar(){
  return<div className="navbar shadow z-40 bg-base-100">
    <div className="flex-2">
      <a className="btn btn-ghost normal-case text-xl">NHL Dashboard</a>
    </div>
      <label htmlFor="sidebar" className="btn m-1">Games</label>
  </div>
}