import React, { useState } from 'react'
import './PreNavbar.css'
import { Link } from 'react-router-dom';

const PreNavbar = ({moreBarController,background}) => {
    const [searchData, setSearchData] = useState("");
    const [moreBar,setMoreBar] = useState(true);

  return (
    <div className="preNavbar-container center-row-left" id={background}>
        <Link to={"/"}><span className='web-logo center-row'><img src="https://i.ibb.co/Cb51LQ2/logo-Xcite.jpg" className='web-logo__img' alt="web-logo" /> | <span className="web-logo__name">Media House.</span></span></Link>
        <Link to={"/login"}><span className='user-login-container center-row preNavbar-navLink'><ion-icon name="person-outline"></ion-icon> <span className='navLink'>User Login</span></span></Link>
        <Link to={"/home"}><span className='pages-navLink center-row preNavbar-navLink'><span className='navLink'>Home</span></span></Link>
        <Link to={"/News"}><span className='pages-navLink center-row preNavbar-navLink'><span className='navLink'>News</span></span></Link>
        <Link to={"/Business"}><span className='pages-navLink center-row preNavbar-navLink'><span className='navLink'>Business</span></span></Link>
        <Link to={"/Sociology"}><span className='pages-navLink center-row preNavbar-navLink'><span className='navLink'>Sociology</span></span></Link>
        <Link to={"/Tech"}><span className='pages-navLink center-row preNavbar-navLink'><span className='navLink'>Tech</span></span></Link>
        <Link to={"/Economic"}><span className='pages-navLink center-row preNavbar-navLink'><span className='navLink'>Economic</span></span></Link>
        <Link to={"/Other"}><span className='pages-navLink center-row preNavbar-navLink'><span className='navLink'>Other</span></span></Link>
        <span className='moreBar-container center-row-left-right preNavbar-navLink' id={moreBar !== true ? "active" : null} onClick={() => {setMoreBar(!moreBar);moreBarController(moreBar)}}><span className='navLink'>More</span> <ion-icon name="caret-down-outline"></ion-icon></span>
        <div className='searchNews-Input center-row'><input type="text" placeholder='Search...' value={searchData} onChange={(e) => {setSearchData(e.target.value)}}/><span className="searchNews-Input__icon center-row"><ion-icon name="search-outline"></ion-icon></span></div>
    </div>
  )
}

export default PreNavbar