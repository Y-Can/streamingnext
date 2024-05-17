// pages/index.js
"use client"
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Card from "./../components/Card";
import "./globals.css";


const Home = () => {
 

	return (

			<div className="containerCol">
											<div className={'containerRowUne'}>
							
								
URL CONNEXION
							</div>
					{/* <Card films={films} type={"Films"} />
					<Card series={series} type={"Séries"} /> */}
			</div>

	);
};
export default Home;
