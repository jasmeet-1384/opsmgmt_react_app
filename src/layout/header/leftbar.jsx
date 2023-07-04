import React, { Fragment, useState, useLayoutEffect, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap'
import { X, Layers, GitPullRequest, User, Users, UserMinus, UserCheck, Airplay, Zap, Heart, Inbox, AlignCenter } from 'react-feather'
import { Link } from 'react-router-dom'
import { errorPages, authPages, usefullPages, comingsoonPages } from './pages'
import { BonusUi, MegaMenu, ErrorPage, Authentication, UsefullPages, ComingSoon, FileManager, SocialApp, UserEdit, UsersCards, UserProfile, KanbanBoard, Bookmark, LevelMenu } from '../../constant'
import { DefaultLayout } from '../theme-customizer';
import { getCheckStatus, updateCheckIn } from '../../api';

const Leftbar = ({ label }) => {
  const [isCheckedIn,setIsCheckedIn] = useState(false)
  const id = window.location.pathname.split('/').pop()
  const defaultLayout = Object.keys(DefaultLayout);
  const layout = id ? id : defaultLayout
  const [bonusui, setBonusUI] = useState(false)
  const [levelMenu, setLevelMenu] = useState(false)
  const [sidebartoggle, setSidebartoggle] = useState(true)
  const [megaboxtoggle1, setMegaboxtoggle1] = useState(true)
  const [megaboxtoggle2, setMegaboxtoggle2] = useState(true)
  const [megaboxtoggle3, setMegaboxtoggle3] = useState(true)
  const [megaboxtoggle4, setMegaboxtoggle4] = useState(true)
  const width = useWindowSize()

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }


  useEffect(() => {


    getStatus();



    var ignoreClick_On_Out_side_Element = document.getElementById('out_side_click');
    var ignoreClick_On_Main_Nav_Element = document.getElementById('sidebar-menu');
    document.addEventListener('click', function (event) {
      var isClickOutSideElement = ignoreClick_On_Out_side_Element.contains(event.target);
      var isClickMainNavElement = ignoreClick_On_Main_Nav_Element.contains(event.target);
      if (window.innerWidth <= 991 && !isClickOutSideElement && !isClickMainNavElement && document.getElementById("sidebar-wrapper")) {
        //Do something click is outside specified element
        document.querySelector(".page-header").className = "page-header close_icon";
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
      }
    });

    if (width <= 767) {
      setMegaboxtoggle1(true)
      setMegaboxtoggle2(true)
      setMegaboxtoggle3(true)
      setMegaboxtoggle4(true)
    } else {
      setMegaboxtoggle1(false)
      setMegaboxtoggle2(false)
      setMegaboxtoggle3(false)
      setMegaboxtoggle4(false)
    }

  }, [width])

  const responsiveMegaMenuclose = () => {
    setBonusUI(false)
    document.querySelector(".mega-menu-container").classList.remove("d-block")
  }

  const ToggleBonusUI = (value) => {
    setLevelMenu(false)
    if (value) {
      setBonusUI(!value)
      document.querySelector(".mega-menu-container").classList.remove("d-block")
    } else {
      setBonusUI(!value)
      if (width <= 991) {
        document.querySelector(".page-header").className = "page-header close_icon";
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
        document.querySelector(".mega-menu-container").classList.add("d-block")
      } else {
        document.querySelector(".mega-menu-container").classList.add("d-block")
      }
    }
  }

  const responsive_openCloseSidebar = (toggle) => {
    if (width <= 991) {
      setBonusUI(false)
      document.querySelector(".page-header").className = "page-header";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper "
    } else {
      if (toggle) {
        setSidebartoggle(!toggle);
        document.querySelector(".page-header").className = "page-header close_icon";
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
        document.querySelector(".mega-menu-container").classList.remove("d-block")
      } else {
        setSidebartoggle(!toggle);
        document.querySelector(".page-header").className = "page-header";
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper "
      }
    }
  };


  const responsiveMegaBox1 = (megabox) => {
    if (width <= 1199) {
      if (megabox) {
        setMegaboxtoggle1(!megabox);
      } else {
        setMegaboxtoggle1(!megabox);
      }
    }
  }
  const responsiveMegaBox2 = (megabox) => {
    if (width <= 1199) {
      if (megabox) {
        setMegaboxtoggle2(!megabox);
      } else {
        setMegaboxtoggle2(!megabox);
      }
    }
  }
  const responsiveMegaBox3 = (megabox) => {
    if (width <= 1199) {
      if (megabox) {
        setMegaboxtoggle3(!megabox);
      } else {
        setMegaboxtoggle3(!megabox);
      }
    }
  }
  const responsiveMegaBox4 = (megabox) => {
    if (width <= 1199) {
      if (megabox) {
        setMegaboxtoggle4(!megabox);
      } else {
        setMegaboxtoggle4(!megabox);
      }
    }
  }

  const OnLevelMenu = (menu) => {
    setBonusUI(false)
    document.querySelector(".mega-menu-container").classList.remove("d-block")
    setLevelMenu(!menu)
  }

  const updateCheckInOut = async (e) => {
    
    let status = e.target.checked;
    console.log(status);
    setIsCheckedIn(status);
    let en_ip =  await fetch('https://ipapi.co/ip/').then(r => r.text());
    
    let check_type = status == true ? 1 : 2 ;
    let updated = await updateCheckIn(check_type,en_ip);
  }

  const getStatus = async () =>{
    let status = await getCheckStatus();
    status= status.data;
    if(status.status_code == 1){
      setIsCheckedIn(status.data.checkin_status == 1);
      let ele = document.getElementById('myonoffswitch');

      if(status.data.checkin_status == 1){
        ele.setAttribute('checked',true);
      }
      return status.data.checkin_status;
    }
    
  }


  return (
    <Fragment>
      <div className="header-logo-wrapper col-auto p-0" id="out_side_click">
        <div className="logo-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/default/`}>
            <img className="img-fluid for-light" src={require("../../assets/images/logo/logo.png")} alt="" />
            <img className="img-fluid for-dark" src={require("../../assets/images/logo/logo_dark.png")} alt="" />
          </Link>
        </div>
        <div className="toggle-sidebar" onClick={() => responsive_openCloseSidebar(sidebartoggle)} style={window.innerWidth <= 991 ? { display: "block" } : { display: "none" }}>
          <AlignCenter className="status_toggle middle sidebar-toggle" id="sidebar-toggle" />
        </div>
      </div>
      <Col className="left-header horizontal-wrapper ps-0">
        <ul className="horizontal-menu">
          <li className="mega-menu outside">
            <div className='check-in-out-section'>
            <div className="onoffswitch">
    <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox"  onInput={(e)=>updateCheckInOut(e)} id="myonoffswitch"   />
    <label className="onoffswitch-label" htmlFor="myonoffswitch">
        <span className="onoffswitch-inner"></span>
        <span className="onoffswitch-switch"></span>
    </label>
</div>
<div>
{isCheckedIn ? 'Timer' : 'Stop Timer'}
</div>
  </div>
          </li>
        </ul>
      </Col>
    </Fragment>
  );
}

export default Leftbar;