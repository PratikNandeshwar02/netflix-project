import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null); 

    const [checkType , setCheckType ] = useState("password");
    const [showHideText, setShowHideText] = useState(FaEye);
    const [passValue, setPassValue] = useState(0);
    const [authUser, setAuthUser] = useState("");

    const handelShow_HidePassword = (e) => {
        const getType = e.target.value;
        // console.log(getType)
        if (getType === "password") {
            setCheckType("text"); 
            setShowHideText(FaEyeSlash)
        } else {
            setCheckType("password");
            setShowHideText(FaEye)
        }
        console.log(showHideText);
    };
    const handelIcon =(e) => {
        let password = e.target.value;
        setPassValue(password)
    };

        const signUp = (e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            )
            .then((authUser) => {
                console.log(authUser);
                alert("Your account was created successfully.")
            })
            .catch(error => {
                alert(error.message);
            })
        };
        const signIn = (e) => {
            e.preventDefault();
                signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            )
            .then((authUser) => {
                console.log(authUser);
                alert("You signed in successfully.");
                window.location.assign("/home");
            })
            .catch(error => {
                alert(error.message);
            })
        };

        useEffect(() => {
            const listen = onAuthStateChanged(auth, (user) => {
              if (user) {
                  setAuthUser(user)
              } else {
                  setAuthUser(null);
              }
            });
            return () => { listen() };
        },[]);

    return (
        <div className="signUpScreen__background">
            <header className="loginScreen_header">
            <div className="left login_logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" 
                    onClick={() => navigate("/")}
                />
            </div>
            </header>

            <div className="loginScreen__body">
               {
                authUser === null ?
                <>
                 <div className="signUpScreen">
                    <form  >
                        <h1>Sign In</h1>
                        <div className="email_input">

                            <input required={true} ref={emailRef}
                            type="email" placeholder="Email or Phone number"/>
                        </div>
                        
                        <div className="password_input">

                            <input required={true}  ref={passwordRef}
                                onKeyUp={(e) => handelIcon(e)}
                                type={checkType} placeholder="Password" className="password"
                            />

                            <button type="button" 
                                value={checkType} onClick={(e) => handelShow_HidePassword(e)}
                            >
                                { passValue.length > 0 ?  ( checkType === "password" ? <FaEyeSlash/> : <FaEye/> ) : " ?"}
                            </button>
                        </div>
                    

                        <button onDoubleClick={() => navigate("/home")} 
                                className="loginButton btn btn-danger" type="submit"
                                onClick={signIn}
                            >
                                Sign In
                            </button>

                        <span>New to Netflix? 
                            <b 
                                onClick={signUp}
                            > 
                                Sign Up now.
                            </b>
                        </span>
                        <hr className="hr"/>
                        <small>This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more.</b></small>
                    </form>
                </div>
                </>
                :
                <>
                <div className="signUpScreen">
                    <form  >
                    <h1>Explore now</h1>
                    <button className="btn btn-outline-success" onClick={()=>navigate("/home")}><FaRegArrowAltCircleRight/></button>
                    </form>
                </div>
                </>
               }
            </div>
        </div>
    )
}

export default Login