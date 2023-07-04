import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import {Search, Thermometer, Droplet, Wind, Sunrise, Sunset, ArrowUp, ArrowDown } from 'react-feather';
import DatePicker from "react-datepicker";
import Knob from "knob";
import man from '../../assets/images/dashboard/profile.jpg';
import { Clock } from 'react-feather';
import { getFormattedWeatherData, getMotivationalQuote } from '../../api';




const fetchWeather = async () =>{
  const Weather_data = await getFormattedWeatherData({q: "chandigarh"});
  console.log(Weather_data); 
}

const fetchdata = async () => {
  let response = await getMotivationalQuote();
  console.log(response);
}



const authenticated = JSON.parse(localStorage.getItem("authenticated"));
const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"))


const Default = () => {

  const [profile, setProfile] = useState('');
  const [daytimes, setDayTimes] = useState()
  const [thought, setThought] = useState();
  const today = new Date()
  const curHr = today.getHours()
  const curMi = today.getMinutes()
  const [meridiem, setMeridiem] = useState("AM")
  const startDate = new Date();
  const handleChange = date => {
    new Date()
  };


const cities =[
  {
    id: 1,
    title: "Delhi"
  },
  {
    id: 2,
    title: "Punjab"
  },
  {
    id: 3,
    title: "Uttarakhand"
  },
]



 

  useEffect( async () =>  {

    setProfile(localStorage.getItem('profileURL') || man);

    if (curHr < 12) {
      setDayTimes('Good Morning')
    } else if (curHr < 18) {
      setDayTimes('Good Afternoon')
    } else {
      setDayTimes('Good Evening')
    }

    if (curHr >= 12) {
      setMeridiem('PM')
    } else {
      setMeridiem('AM')
    }

    var ordervalue1 = Knob({
      value: 60,
      angleOffset: 0,
      thickness: 0.3,
      width: 65,
      fgColor: "#7366ff",
      readOnly: false,
      dynamicDraw: true,
      tickColorizeValues: true,
      bgColor: '#eef5fb',
      lineCap: 'round',
      displayPrevious: false
    })
    document.getElementById('ordervalue1').appendChild(ordervalue1);

    var ordervalue2 = Knob({
      value: 60,
      angleOffset: 0,
      thickness: 0.3,
      fgColor: "#7366ff",
      readOnly: false,
      width: 65,
      dynamicDraw: true,
      lineCap: 'round',
      displayPrevious: false
    })
    document.getElementById('ordervalue2').appendChild(ordervalue2);


fetchWeather();
 let thoughts = await fetchdata();
 setThought(thoughts)

  }, [curHr])


  return (
    <Fragment>
      <Breadcrumb parent="Dashboard" title="WELCOME TO DASHBOARD" />
      <Container fluid={true}>
        <Row className="second-chart-list third-news-update">
          <Col xl="4 xl-50" lg="12" className="morning-sec box-col-12">
            <Card className="o-hidden profile-greeting">
              <CardBody>
                <div className="media">
                  <div className="badge-groups w-100">
                    <div className="badge f-12">
                      <Clock style={{ width: "16px", height: "16px" }} className="me-1" />
                      <span id="txt">{curHr}:{curMi < 10 ? "0" + curMi : curMi} {meridiem}</span>
                    </div>
                    <div className="badge f-12"><i className="fa fa-spin fa-cog f-14"></i></div>
                  </div>
                </div>
                <div className="greeting-user text-center">
                  {/* <div className="profile-vector"><img className="img-fluid" src={require("../../assets/images/dashboard/welcome.png")} alt="" /></div> */}
                  <div className="profile-vector"><img className="img-fluid m-auto media" src={authenticated ? auth0_profile.image : profile} alt="" /></div>
                  <h4 className="f-w-600"><span id="greeting">{daytimes}</span> <span className="right-circle"><i className="fa fa-check-circle f-14 middle"></i></span></h4>
                  <p><span> {}</span></p>
                  <p><span> { }</span></p>
                  <div className="whatsnew-btn"><button id="btn-motivational" className="btn btn-primary">{"Whats New !"}</button></div>
                  <div className="left-icon"><i className="fa fa-bell"> </i></div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="8 xl-100" className="dashboard-sec box-col-12">
            <Card className="earning-card">
              <CardBody className="p-0">
                <Row className="m-0">
                  <Col xl="4" className="earning-content p-0">
                    <Row className="m-0 chart-left">
                      <Col xl="12" className="p-0 left_side_earning">
                        <h5>Wednesday, 25 Jan 2023</h5>
                        <p className="font-roboto">Local Time: 12.52 PM</p>
                      </Col>
                      <Col xl="12" className="p-0 left_side_earning">
                        <h5>Mohali, IN</h5>
                      </Col>
                      <Col xl="12" className="p-0 left_side_earning">
                        <h5>Cloudy or whatever</h5>
                        {/* <p className="font-roboto">{"This Month Profit"}</p> */}
                      </Col>
                      <Col xl="12" className="p-0 left_side_earning d-flex justify-content-around">
                        <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                        <h5>95&#730;</h5>
                        <div>
                        <p className="font-roboto temp"><Thermometer size={18} /> Real Fell: 18&#730;</p>
                        <p className="font-roboto temp"><Droplet size={18}/> Humidity: 43&#x0025;</p>
                        <p className="font-roboto temp"><Wind size={18}/> Wind Speed: 3 km/h</p>
                        </div>
                        
                      </Col>
                      <Col xl="12" className="p-0 left_side_earning d-flex justify-content-around">
                      <p className="font-roboto temp"><Sunrise size={18}/> Rise: 06.45 AM</p>
                      <p className="font-roboto temp"><Sunset size={18}/> Set: 07.30 PM</p>
                      </Col>
                      <Col xl="12" className="p-0 left_side_earning d-flex justify-content-around">
                      <p className="font-roboto temp"><ArrowUp size={18}/> High: 21&#730; </p>
                      <p className="font-roboto temp"><ArrowDown size={18}/> Low: 16&#730; </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl="8" className="p-0">
                    <div className="chart-right">
                      <Row className="m-0 p-tb">
                        <Col xl="4" md="4" sm="4" className="col-12 p-0">
                          <div className="inner-top-left">
                            <ul className="d-flex list-unstyled cities">
                              {cities.map((city)=>(
                                <button key={city.id} className='cities'>{city.title}</button>
                              ))}
                            </ul>
                          </div>
                        </Col>
                        <Col xl="8" md="8" sm="8" className="col-12 p-0">
                          <div className="inner-top-right">
                            <ul className="d-flex list-unstyled justify-content-end header-search">
                             <p><input className='search_cities text-capitalize' type="text" placeholder='search city..'></input></p>
                             <a className='header-search'><Search size={20}/></a>
                            </ul>
                            
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl="12">
                          <CardBody className="p-0">

                          </CardBody>
                        </Col>
                      </Row>
                    </div>
                    <Row className="border-top m-0">
                      <Col xl="12" md="12" sm="12" className="ps-0">
                        <div className="media p-0">
                          <div className="media-body">
                            <h6>HOURLY FORECAST</h6>
                            <hr></hr>
                            <div className='hourly_temp_main'>
                            <div className='hourly_temp_sub'>
                            <p className='hourly_p'>03.30 PM</p>
                            <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                            <p className='hourly_p'>20&#730;</p>
                            </div>
                            <div className='hourly_temp_sub' >
                            <p className='hourly_p'>04.30 PM</p>
                            <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                            <p className='hourly_p'>18&#730;</p>
                            </div>
                            <div className='hourly_temp_sub' >
                            <p className='hourly_p'>05.30 PM</p>
                            <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                            <p className='hourly_p'>16&#730;</p>
                            </div>
                            <div className='hourly_temp_sub' >
                            <p className='hourly_p'>06.30 PM</p>
                            <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                            <p className='hourly_p'>17&#730;</p>
                            </div>
                            <div className='hourly_temp_sub' >
                            <p className='hourly_p'>07.30 PM</p>
                            <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                            <p>16&#730;</p>
                            </div>
                            </div>
                            
                          </div>
                        </div>
                      </Col>
                      <Col xl="12" md="12" sm="12" className="ps-0">
                        <div className="media p-0">
                          <div className="media-body">
                            <h6>DAILY FORECAST</h6>
                            <hr></hr>
                            <div className='hourly_temp_main'>
                            <div className='hourly_temp_sub'>
                            <p className='hourly_p'>03.30 PM</p>
                            <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                            <p className='hourly_p'>20&#730;</p>
                            </div>
                            <div className='hourly_temp_sub' >
                            <p className='hourly_p'>04.30 PM</p>
                            <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                            <p className='hourly_p'>18&#730;</p>
                            </div>
                            <div className='hourly_temp_sub' >
                            <p className='hourly_p'>05.30 PM</p>
                            <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                            <p className='hourly_p'>16&#730;</p>
                            </div>
                            <div className='hourly_temp_sub' >
                            <p className='hourly_p'>06.30 PM</p>
                            <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                            <p className='hourly_p'>17&#730;</p>
                            </div>
                            <div className='hourly_temp_sub' >
                            <p className='hourly_p'>07.30 PM</p>
                            <img className='weather_img' src='http://openweathermap.org/img/wn/01d@2x.png' alt=''></img>
                            <p>16&#730;</p>
                            </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50" lg="12" className="calendar-sec box-col-6">
            <Card className="gradient-primary o-hidden">
              <CardBody>
                <div className="default-datepicker">
                  <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    inline
                  />
                </div><span className="default-dots-stay overview-dots full-width-dots"><span className="dots-group"><span className="dots dots1"></span><span className="dots dots2 dot-small"></span><span className="dots dots3 dot-small"></span><span className="dots dots4 dot-medium"></span><span className="dots dots5 dot-small"></span><span className="dots dots6 dot-small"></span><span className="dots dots7 dot-small-semi"></span><span className="dots dots8 dot-small-semi"></span><span className="dots dots9 dot-small">                </span></span></span>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Default;