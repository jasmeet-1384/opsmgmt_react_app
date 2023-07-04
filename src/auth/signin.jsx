import React, { useState, useEffect } from 'react';
import man from '../assets/images/dashboard/profile.jpg';
import { Container, Row, Col, Form, Input, Label, Button,  TabContent, TabPane } from 'reactstrap'
import { toast } from 'react-toastify';
import { Password, SignIn, Email, RememberPassword, SignUp } from '../constant';
import { useNavigate } from 'react-router';
import { classes } from '../data/layouts';
import { authLogin } from '../api';
import { gapi } from 'gapi-script';
import { Link } from 'react-router-dom';


const Logins = (props) => {

  const [email, setEmail] = useState("Jasmeet2@yopmail.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false)
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();

  const [value, setValue] = useState(
    localStorage.getItem('profileURL' || man)
  );
  const [name, setName] = useState(
    localStorage.getItem('Name')
  );

  useEffect(() => {

    localStorage.setItem('profileURL', value);
    localStorage.setItem('Name', name);
  }, [value, name]);

  const loginAuth = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {

      let response = await authLogin({
        "email": email,
        "password": password
      });

      let result = response.data ;

      if(result.status_code ==  1){
        setValue(man);
        setName(result.data.name);
        localStorage.setItem('auth0_profile',JSON.stringify(result.data));
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('authenticated', true);
        toast.success(result.message);
        history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        return;
      }
      else
      {
        toast.error(result.message);
        setLoading(false);
        return;
      }

    } catch (error) {
      setTimeout(() => {
        toast.error("Oppss.. Server Error.");
        setLoading(false);
      }, 200);
    }
  }


  // Render Google Sign-in button
function renderButton() {
  gapi.signin2.render('gSignIn', {
      'width': 30,
      'height': 30,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
  });
}

// renderButton();

// Sign-in success callback
function onSuccess(googleUser) {
  // Get the Google profile data (basic)
  //var profile = googleUser.getBasicProfile();
  console.log(googleUser,'s');
  // Retrieve the Google account data
  gapi.client.load('oauth2', 'v2', function () {
      var request = gapi.client.oauth2.userinfo.get({
          'userId': 'me'
      });
      request.execute(function (resp) {
          // Display the user details
          var profileHTML = '<h3>Welcome '+resp.given_name+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></h3>';
          profileHTML += '<img src="'+resp.picture+'"/><p><b>Google ID: </b>'+resp.id+'</p><p><b>Name: </b>'+resp.name+'</p><p><b>Email: </b>'+resp.email+'</p><p><b>Gender: </b>'+resp.gender+'</p><p><b>Locale: </b>'+resp.locale+'</p><p><b>Google Profile:</b> <a target="_blank" href="'+resp.link+'">click to view profile</a></p>';
          document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
          
          document.getElementById("gSignIn").style.display = "none";
          document.getElementsByClassName("userContent")[0].style.display = "block";
      });
  });
}

// Sign-in failure callback
function onFailure(error) {
  console.log(error);
  alert(error);
}



  return (
    <Container fluid={true} className="p-0">
    <Row>
    <Col xl="7" className="b-center bg-size" style={{ backgroundImage: `url(${require("../assets/images/login/2.jpg")})`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
            <img className="bg-img-cover bg-center" style={{display:"none"}} src={require("../assets/images/login/2.jpg")} alt="looginpage"/>
          </Col>
          <Col xl="5" className="p-0">
            <div className="login-card">
              <div>
              <div>
                <a className="logo" href="index.html">
                  <img className="img-fluid for-light" src={require("../assets/images/logo/login.png")} alt="" />
                  
                </a>
              </div>
            <div className="login-main login-tab">
              <TabContent  className="content-login">
                <TabPane className="fade show" >
                  <Form className="theme-form">
                    <h4> Sign in with OPSMGNT</h4>
                    <p>{"Enter your email & password to login"}</p>
                    <div className="mb-3">
                      <Label className="col-form-label">{Email}</Label>
                      <Input className="form-control" type="email" required="" onChange={e => setEmail(e.target.value)} defaultValue={email} />
                    </div>
                    <div className="mb-3 position-relative">
                      <Label className="col-form-label">{Password}</Label>
                      <Input className="form-control" type={togglePassword ? "text" : "password"} onChange={e => setPassword(e.target.value)} defaultValue={password} required="" placeholder="*********" />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                    </div>
                    <div className="login-btn mb-0">
                      <div className="checkbox ms-3">
                        <Input id="checkbox1" type="checkbox" />
                        <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                      </div>
                      {/* <a className="link" href="#javascript">{ForgotPassword}</a> */}
                     
                      <Button color="primary" disabled={loading ? loading : loading} onClick={(e) => loginAuth(e)}>{loading ? "LOADING..." : SignIn}</Button>
                        
                    </div>
                    <h6 className="text-muted mt-4 or">{"Or Sign in with"}</h6>
                    <div className="social mt-4">
                      <div className="btn-showcase">
                        <Button color="light" id='gSignIn'  >
                          <i className="fa fa-google txt-googleplus"></i>
                        </Button>
                      </div>
                    </div>
                    <p className="mt-4 mb-0">{"Don't have account?"}<Link className="ms-2" to={`${process.env.PUBLIC_URL}/register`}>{SignUp}</Link></p>
                  </Form>
                </TabPane>
                
              </TabContent>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
  );
}

// export default withRouter(Logins);
export default Logins;