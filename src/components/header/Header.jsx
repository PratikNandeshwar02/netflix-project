import { useEffect, useState } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Header = (props) => {
    const navigate = useNavigate();

    const [show, handleShow] = useState(false);   
    const [isClicked, setClicked] = useState(false);
    
    const [query, setQuery] = useState("");
    
    const searchQueryHandler = (event) => {
        if(event.key === "Enter" && query.length > 0){
           navigate(`/search/${query}`);
        }
    }
    // console.log(query)


    
    const transitionNavBar = () => {
        if (window.scrollY > 200) {
          handleShow(true)
        } else {
          handleShow(false)
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar)
        
    },[]);

    const userSignOut = () => {
        let isSignOut = window.confirm("You are sure to logout")
        if (isSignOut) {
            signOut(auth)
            .then(() => {
            alert("Signing out was successful.")
            window.location.assign("/");
            })
        };
    }

    const openSearchInput = ()=> {
        setClicked(true) 
    }
    const closeSearchInput = () => {
        setClicked(false)
    }

    return (
        <div className={`nav  ${show && "navBlack"}`}>
            <div className="left">
                <img onClick={() => navigate("/login")}
                    className="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" 
                />
                {
                    props.spanContent === false ? <></>
                    :
                    <div className="left__content">
                        <span className="" onClick={()=>navigate("/home")}>Home</span>
                        <span className="">TV Shows</span>
                        <span className="">Movies</span>
                        <span className="">New & Popular</span>
                        <span className="">List</span>
                    </div>
                }
            </div>  
                {
                    props.profileSetting === false ? <></>
                    :
                    <div className="right">
                
                        <i className="fa fa-search" aria-hidden="true" 
                            onClick={openSearchInput}
                        ></i>
                        <span className="navSearchInput" 
                            style={{display: isClicked &&  "flex"}}
                        >
                            <input onChange={(e)=> setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                                type="text" className="input" 
                                placeholder="Search for a movie or tv show..."
                            />
                            <i className="fa fa-times" aria-hidden="true"
                                onClick={closeSearchInput}
                            ></i>
                        </span>
                        
                        <i className="">Kids</i>
                        <i className="fa fa-bell" aria-hidden="true"></i>

                        
                        <span className="">
                            <img src="https://i.pinimg.com/736x/33/e4/07/33e407bc4b74d5d7d56eb4dc78c29164.jpg" alt="" 
                                className="text-white dropdown-toggle" aria-hidden="true" data-bs-toggle="dropdown" aria-expanded="false"
                            /> 

                            <i></i>
                            <ul className="dropdown-menu">
                                <li>
                                    <button className="dropdown-item" 
                                        onClick={() => navigate("/profile")}
                                    >Settings</button>
                                </li>
                                <li>
                                    <button className="dropdown-item"
                                         onClick={ userSignOut }
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </span>
                        
                    </div>  
                }    
            
        </div>
    )
}

export default Header;