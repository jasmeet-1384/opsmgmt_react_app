import React, { Fragment, useState, useEffect } from 'react';
import man from '../../assets/images/dashboard/profile.jpg'
import { FileText, LogIn, Mail, User, Bell, Maximize, Search } from 'react-feather';
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { English, Deutsch, Español, Français, Português, 简体中文, Notification, DeliveryProcessing, OrderComplete, TicketsGenerated, DeliveryComplete, CheckAllNotification, Admin, Account, Inbox, Taskboard, LogOut} from '../../constant'

import { classes } from '../../data/layouts';

const Rightbar = () => {

  const history = useNavigate();
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('')
  const [searchresponsive, setSearchresponsive] = useState(false)
  const [langdropdown, setLangdropdown] = useState(false)
  const [ setMoonlight] = useState(false)
  const [notificationDropDown, setNotificationDropDown] = useState(false)
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState('en');

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setSelected(lng);
  };


  const { logout } = useAuth0()
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"))

  useEffect(() => {
    setProfile(localStorage.getItem('profileURL') || man);
    setName(localStorage.getItem('Name'))
    if (localStorage.getItem("layout_version") === "dark-only") {
      setMoonlight(true)
    }
    i18n.changeLanguage('en');
  }, []);

  const Logout_From_Firebase = () => {
    localStorage.removeItem('profileURL')
    localStorage.removeItem('token');
    localStorage.removeItem("auth0_profile")
    localStorage.setItem("authenticated", false)
    // firebase_app.auth().signOut()
    history(`${process.env.PUBLIC_URL}/login`)
    // window.location.replace('/login')
  }

  const Logout_From_Auth0 = () => {
    localStorage.removeItem("auth0_profile")
    localStorage.setItem("authenticated", false)
    history(`${process.env.PUBLIC_URL}/login`)
    logout()
  }
  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const RedirectToChats = () => {
    history(`${process.env.PUBLIC_URL}/app/users/userProfile/${layout}`)
  }
  const RedirectToChat = () => {
    history(`${process.env.PUBLIC_URL}/app/chat-app/${layout}`)
  }

  const UserMenuRedirect = (redirect) => {
    history(redirect)
  }

  //full screen function
  function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const SeacrhResposive = (searchresponsive) => {
    if (searchresponsive) {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.add("open");
      document.querySelector(".more_lang").classList.remove("active");
    } else {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.remove("open");
    }
  }

  const LanguageSelection = (language) => {
    if (language) {
      setLangdropdown(!language)
    } else {
      setLangdropdown(!language)
    }
  }



  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          <li className="language-nav">
            <div className={`translate_wrapper ${langdropdown ? 'active' : ''}`}>
              <div className="current_lang">
                <div className="lang" onClick={() => LanguageSelection(langdropdown)}>
                  <i className={`flag-icon flag-icon-${selected === "en" ? "us" : selected === "du" ? "de" : selected}`}></i>
                  <span className="lang-txt">{selected}</span>
                </div>
              </div>
              <div className={`more_lang ${langdropdown ? 'active' : ''}`}>
                <div className="lang" onClick={() => changeLanguage('en')}><i className="flag-icon flag-icon-us"></i><span className="lang-txt">{English}<span> {"(US)"}</span></span></div>
                <div className="lang" onClick={() => changeLanguage('du')}><i className="flag-icon flag-icon-de"></i><span className="lang-txt">{Deutsch}</span></div>
                <div className="lang" onClick={() => changeLanguage('es')}><i className="flag-icon flag-icon-es"></i><span className="lang-txt">{Español}</span></div>
                <div className="lang" onClick={() => changeLanguage('fr')}><i className="flag-icon flag-icon-fr"></i><span className="lang-txt">{Français}</span></div>
                <div className="lang" onClick={() => changeLanguage('pt')}><i className="flag-icon flag-icon-pt"></i><span className="lang-txt">{Português}<span> {"(BR)"}</span></span></div>
                <div className="lang" onClick={() => changeLanguage('cn')}><i className="flag-icon flag-icon-cn"></i><span className="lang-txt">{简体中文}</span></div>
                <div className="lang" onClick={() => changeLanguage('ae')}><i className="flag-icon flag-icon-ae"></i><span className="lang-txt">{"لعربية"}<span> {"(ae)"}</span></span></div>
              </div>
            </div>
          </li>
          <li><span className="header-search"><Search onClick={() => SeacrhResposive(searchresponsive)} /></span></li>
          <li className="onhover-dropdown">
            <div className="notification-box" onClick={() => setNotificationDropDown(!notificationDropDown)}><Bell /><span className="badge rounded-pill badge-secondary">2</span></div>
            <div className={`notification-dropdown onhover-show-div ${notificationDropDown ? "active" : ""}`}>
              <h6 className="f-18 mb-0 dropdown-title">{Notification}</h6>
              <ul>
                <li className="b-l-primary border-4">
                  <p>{DeliveryProcessing} <span className="font-danger">{"10 min."}</span></p>
                </li>
                <li className="b-l-success border-4">
                  <p>{OrderComplete}<span className="font-success">{"1 hr"}</span></p>
                </li>
                <li className="b-l-info border-4">
                  <p>{TicketsGenerated}<span className="font-info">{"3 hr"}</span></p>
                </li>
                <li className="b-l-warning border-4">
                  <p>{DeliveryComplete}<span className="font-warning">{"6 hr"}</span></p>
                </li>
                <li><Link className="font-primary f-w-700" to={`${process.env.PUBLIC_URL}/app/ecommerce/orderhistory/${layout}`}>{CheckAllNotification}</Link>
                </li>
              </ul>
            </div>
          </li>
        


          <li className="maximize"><a className="text-dark" href="#javascript" onClick={goFull}><Maximize /></a></li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={authenticated ? auth0_profile.image : profile} alt="" />
              <div className="media-body"><span>{authenticated ? auth0_profile.name : name}</span>
                <p className="mb-0 font-roboto">{Admin} <i className="middle fa fa-angle-down"></i></p>
              </div>
            </div> 
            <ul className="profile-dropdown onhover-show-div">
              <li onClick={() => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/users/userProfile/${layout}`)}><User /><span>{Account} </span></li>
              <li onClick={() => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/email-app/${layout}`)}><Mail /><span>{Inbox}</span></li>
              <li onClick={() => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/todo-app/todo/${layout}`)}><FileText /><span>{Taskboard}</span></li>
              <li onClick={Logout_From_Firebase}><LogIn /><span>{LogOut}</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>

  );
}
// export default translate(Rightbar);
export default Rightbar;