// pages/index.js
"use client"
import "./globals.css";
import Films from "./../pages/Films";
import Navbar from "../components/Navbar";
import { LoginForm, SignupForm } from "./login/page";
import Footer from "../components/Footer";

function Home() {
	return (
		<div className="app">
			<Films />
		</div>
	);
}
export default Home;
