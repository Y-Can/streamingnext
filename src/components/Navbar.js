"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import loupe from "/public/loupe.svg";
import axios from "axios";
import  User  from '../models/user';
import {FiAlignRight,FiXCircle,FiChevronDown } from "react-icons/fi";


const Navbar = () => {
    const [search, setSearchTerm] = useState("");
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("/api/user", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
            
                    console.log(response.data); // Pour débogage
            
                    if(response.data){
                        try {
                            const user = new User(response.data);
                            setUser(user);
                        } catch (error) {
                            console.error("Erreur lors de la création de l'instance User :", error);
                        }
                    } else {
                        console.error("Les données de l'utilisateur ne sont pas complètes ou manquantes.");
                    }
                    
                } catch (error) {
                    console.error("Erreur lors de la récupération des données utilisateur:", error.response || error);
                    localStorage.clear("token");
                }
            }
            
        };
        fetchData();
    }, []);

    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
      setisMenu(isMenu === false ? true : false);
      setResponsiveclose(isResponsiveclose === false ? true : false);
  };
// NAVBAR DROPdown
    let boxClass = ["main-menu menu-right menuq1"];
    if(isMenu) {
        boxClass.push('menuq2');
    }else{
        boxClass.push('');
    }

    const [isMenuSubMenu, setMenuSubMenu] = useState(false);
      
    const toggleSubmenu = () => {
      setMenuSubMenu(isMenuSubMenu === false ? true : false);
    };
    
    let boxClassSubMenu = ["sub__menus"];
    if(isMenuSubMenu) {
        boxClassSubMenu.push('sub__menus__Active');
    }else {
        boxClassSubMenu.push('');
    }

   
    // const toggleMenu = () => {
    //     isOpen === true ? setIsOpen(false) : setIsOpen(true);
    // };


    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/api/films?search=${encodeURIComponent(search)}`);
            const data = res.data;
            router.push(`/?search=${encodeURIComponent(search)}`);
        } catch (error) {
            console.error("Error fetching search results", error);
        }
    };

    return (
        <nav className="navbar">

                {user ? (
                    
                    <header className="header__middle">
                    <div className="container">
                        <div className="row">
            
                            {/* Add Logo  */}
                            <div className="header__middle__logo">
                                <Link href="/" exact activeClassName='is-active' to="/">
                                </Link>
                            </div>

                            
                            <div className="header__middle__menus">
                                <nav className="main-nav " >
            
                                {/* Responsive Menu Button */}
                                {isResponsiveclose === true ? <> 
                                    <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} >
                                         <FiXCircle /> 
                                           </span>
                                </> : <> 
                                    <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} >
                                         <FiAlignRight />  
                                          </span>
                                </>}
            
            
                                <ul className={boxClass.join(' ')}>
                                <li  className="menu-item" >
                                    <Link href="/" exact activeClassName='is-active' onClick={toggleClass} to={`/`}> Home </Link> 
                                </li>
                                                            {/* SEARCHBAR */}
                            <div className="wrap-search">
                                <form onSubmit={handleSearch}>
                                    <div className="search">
                                    <input
                                        type="text"
                                        className="searchTerm"
                                        placeholder="What are you looking for?"
                                        value={search}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button type="submit" className="searchButton">
                                        <Image className="loupe" src={loupe} alt="Loupe" />
                                    </button>
                                    </div>
                                </form>
                            </div>
                                <li className="menu-item " ><Link href="/" onClick={toggleClass} activeClassName='is-active' to={`/About`}> About </Link> </li>
                                <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows" > <Link href="/" to="#"> Shop  </Link>
                                    <ul className={boxClassSubMenu.join(' ')} > 
                                        <li> <Link href="/" onClick={toggleClass} activeClassName='is-active'  to={`/Online`}> Online Shop </Link> </li>
                                        <li><Link href="/" onClick={toggleClass} activeClassName='is-active' to={`/Offline`}> Offline Shop </Link> </li>
                                    </ul>
                                </li>
                                <li className="menu-item " ><Link href="/" onClick={toggleClass} activeClassName='is-active' to={`/Contact`}> Contact </Link> </li>
            
                                </ul>
            
            
                                </nav>     
                            </div>   
            
            
            
                    
                    
                        </div>
                    </div>
                </header>
                ) : (
                    <div>
                        <Link href="/login">Se Connecter</Link>
                    </div>
                )}
        </nav>
    );
};

export default Navbar;

