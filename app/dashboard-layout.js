"use client";

import Link from "next/link";
import { useAuthContext } from "./use-auth-context";

export default function DashboardLayout({ children }) {
  const { logout } = useAuthContext();
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <nav class="navbar">
        <div class="navbar-brand">My Website</div>
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link href="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link href="/about">About</Link>
          </li>
          <li class="nav-item">
            <Link href="/services">Services</Link>
          </li>
          <li class="nav-item">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div class="sidebar">
        <ul class="sidebar-nav">
          <li class="sidebar-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="sidebar-item">
            <a href="#">Profile</a>
          </li>
          <li class="sidebar-item">
            <a href="#">Settings</a>
          </li>
          <li class="sidebar-item">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        <div className="page-child">{children}</div>
      </div>
    </div>
  );
}
