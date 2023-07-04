import React,{useState} from 'react';
import {Container,Row,Col,Form,Input,Label,Button} from 'reactstrap'
import { Password,SignIn, EmailAddress ,CreateAccount, YourName} from '../../constant';
import { Link } from 'react-router-dom';
import { newRegister } from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const RegisterWithBgImage = (props) => {


    const [togglePassword,setTogglePassword] = useState(false);
    const [password,setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();


    
    const HideShowPassword  = (tPassword) => {
      setTogglePassword(!tPassword)
    }

    const registerSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {

        let response = await newRegister({
          "name": name,
          "email": email,
          "password": password
        });

        let result = response.data ;
        if(result.status_code ==  1){
          toast.success(result.message);
         history(`${process.env.PUBLIC_URL}/login`);
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
  
    return (
      <Container fluid={true} className="p-0">
      <Row>
      <Col xl="7" className="b-center bg-size" style={{ backgroundImage: `url(${require("../../assets/images/login/2.jpg")})`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
            <img className="bg-img-cover bg-center" style={{display:"none"}} src={require("../../assets/images/login/2.jpg")} alt="registerpage"/>
          </Col>
        <Col xl="5" className="p-0"> 
          <div className="login-card">
            <div>
              <div><a className="logo" href="#javascript"><img className="img-fluid for-light" src={require("../../assets/images/logo/login.png")} alt="looginpage"/><img className="img-fluid for-dark" src={require("../../assets/images/logo/logo_dark.png")} alt="looginpage"/></a></div>
              <div className="login-main"> 
                <Form className="theme-form"  >
                  <h4>{"Create your account"}</h4>
                  <p>{"Enter your personal details to create account"}</p>
                  <div className="mb-3">
                      <Label className="col-form-label">{YourName}</Label>
                      <Input className="form-control" type="text" required="" onChange={e => setName(e.target.value)} defaultValue={name} placeholder="Enter Your Name" />
                    </div>
                  <div className="mb-3">
                      <Label className="col-form-label">{EmailAddress}</Label>
                      <Input className="form-control" type="email" required="" onChange={e => setEmail(e.target.value)} defaultValue={email} placeholder="Enter Your Valid Email" />
                    </div>
                  <div className="mb-3 position-relative">
                    <Label className="col-form-label ">{Password}</Label>
                    <Input className="form-control" type={togglePassword ?  "text" : "password" } onChange={e => setPassword(e.target.value)} defaultValue={password} required="" placeholder="*********"/>
                    <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                    </div>
                  <div className="mb-0">
                    <Button color="primary" disabled={loading ? loading : loading} onClick={(e) => registerSubmit(e)}>{loading ? "LOADING..." : CreateAccount}</Button>
                  </div>
                  <h6 className="text-muted mt-4 or">{"Or signup with"}</h6>
                  <div className="social mt-4">
                    <div className="btn-showcase">
                    <Button color="light" id='gSignIn'  >
                          <i className="fa fa-google txt-googleplus"></i>
                        </Button>
                    </div>
                  </div>
                  <p className="mt-4 mb-0">{"Already have an account?"}<Link className="ms-2" to={`${process.env.PUBLIC_URL}/login`}>{SignIn}</Link></p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      </Container>
    );
}

export default RegisterWithBgImage;