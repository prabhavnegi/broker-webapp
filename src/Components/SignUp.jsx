import React, {useState,useEffect,useContext} from "react";
import {useHistory} from "react-router";
import { Link } from "react-router-dom";
import { auth, signUpWithGoogle, generateUserDocument, emailVerify } from "../firebase";
import {UserContext} from "../UserProvider/provider";
import board from './images/board.jpg';
import background from './images/background.jpg'
import {Container,Row,Col,Form,Button,Card} from 'react-bootstrap'
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/

const mySchema=Yup.object().shape({
  username: Yup.string()
      .required('Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().min(8,'Password must be atleast 8 characters')
      .required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')],'Passwords don\'t match')
      .required('Confirm Password is required'),
  phoneno: Yup.string().matches(phoneRegExp, 'Phone number is not valid').length(10)
      .required('Phone number is required')
});


const SignUp = () => {
  

  
  const [error, setError] = useState(null);
  const [flag,setFlag] = useState(true)
  const {userData,loading} = useContext(UserContext)
  let history = useHistory();

  useEffect(() => {
    if(!loading)
    {
      if(!userData)
        setFlag(true)
      else
        history.push("/")
    }
  }, [history,loading,userData])

  const createUserWithEmailAndPasswordHandler = async (displayName,email, password,phno) => {
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      await generateUserDocument(user,displayName,phno)
      await emailVerify(user);
      Window.alert("Check your Inbox")

    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
  };

  const signUpGoogle = async () => {
    try{
      await signUpWithGoogle()
    }
    catch (error)
    {
      console.log(error)
    }
    

  }

  return (
    !flag?"":
    <div style={{minHeight:"75vh",alignItems:"center",display:"flex",backgroundImage: `url(${background})`,backgroundSize:"100%"}}>
            <Container> 
                <Row className="justify-content-md-center">
                    <Col lg={8}>
                <Card style={{overflow:"hidden",border:"0"}}>
                <Formik
                    initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword:'',
                    phoneno: ''
                    }}
                    validationSchema={mySchema}
                    onSubmit={(values, { setSubmitting }) => {
                        createUserWithEmailAndPasswordHandler(values.username,values.email,values.password,values.phoneno)
                        setSubmitting(false);
                      }}
                    >
                    {({ errors, touched , handleSubmit }) => (

                    <Row noGutters style={{marginLeft:"0",marginRight:"0"}}>
                        <Col lg={4} md={4} style={{paddingLeft:"0",paddingRight:"0"}}>
                            <img src={board} style={{position:"absolute",width:"100%",height:"100%",objectFit:"cover"}} alt="lol"/>
                        </Col>
                        <Col lg={8} md={8}>
                            <Card.Body className="text-center"style={{marginTop:"8%",paddingBottom:"5rem"}}>
                                <h1 style={{fontSize:"3rem",fontWeight:"bold",color:"black"}}>BROKER.COM</h1>
                                <h3 style={{marginBottom:"1rem",fontWeight:"bold",color:"black"}}>Sign Up</h3>
                                  <Form style={{padding:"1rem"}} onSubmit={handleSubmit}>
                                  <Form.Group controlId="email">
                                      <label style={{float: "left"}}>Name:</label>
                                        <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}/>
                                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                      <label style={{float: "left"}}>Email:</label>                                       
                                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                      <label style={{float: "left"}}>Contact Number:</label>                                     
                                       <Field name="phoneno" type="text" className={'form-control' + (errors.phoneno && touched.phoneno ? ' is-invalid' : '')} />
                                       <ErrorMessage name="phoneno" component="div" className="invalid-feedback" />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                    <label style={{float: "left"}}>Password:</label>                    
                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </Form.Group>
                                    <Form.Group controlId="confirmpassword">
                                    <label style={{float: "left"}}>Confirm Password:</label>  
                                        <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </Form.Group>
                                            <Button variant="dark" type="submit" style={{paddingLeft:"15%",paddingRight:"15%",marginTop:"1rem",marginBottom: "1rem"}}>
                                                Sign Up
                                            </Button><br />
                                            <b><label style={{margin:"0"}} >or continue with</label></b><br />
                                            <Button  variant="light" type="button" style={{paddingLeft:"5%",paddingRight:"5%",marginTop:"1rem",backgroundColor: "#e8ffff",marginBottom: "25px"}} onClick={signUpGoogle}>
                                                <img className="social-btn-icon" alt="SignUp with Google" style={{height:"20px",width:"20px",marginRight:"5px"}} src="https://hrcdn.net/community-frontend/assets/google-colored-20b8216731.svg" />
                                                Sign Up With Google
                                            </Button>
                                </Form> 
                                    <b><label>Already a user?</label></b>
                                    <Link to="/"> Sign In!</Link>
                            </Card.Body>
                        
                        </Col>
                       
                    </Row>
                    )}
                  </Formik>
                </Card>
              </Col>
            </Row>
          </Container>
      </div> 
  );
};

export default SignUp;
