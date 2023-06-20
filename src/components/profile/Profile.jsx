import "./profile.css";
import Header from '../header/Header';
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; 
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Profile = () => {
    const [isClicked, setClicked] = useState(false); 
    const [authUser, setAuthUser] = useState("");

    const changeBackground_Black = () =>  {
        setClicked(true)
    }
    const changeBackground_White = () =>  {
        setClicked(false)
    }

    const userSignOut = () => {
        let isSignOut = window.confirm("You are sure to logout")
        if (isSignOut) {
            signOut(auth)
            .then(() => {
            alert("Signing out was successful.")
            window.location.assign("/");
            })
        };
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
        <div className={`profileScreen ${isClicked === true && "profileScreenWhite" } `}>
            <Header profileSetting={false} spanContent={false}/>
            <span className=" background__change gap-3">
                <FaMoon onClick={changeBackground_White}/> 
                <FaSun onClick={changeBackground_Black}/>
            </span>
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    
                    <div className="profileImg">
                        <img src="https://i.pinimg.com/736x/33/e4/07/33e407bc4b74d5d7d56eb4dc78c29164.jpg" alt="" />
                    </div>                    
                        <div className="profileScreen__details">
                            <h2>You sign in by {authUser.email}</h2>
                            <div className="profileScreen__plans">
                                <h3>Plans</h3>

                                <div className="pansScreen__plans">
                                    <div className='plansScreen'>
                                        <div className="plansScreen__info">
                                            <h5>Premium</h5>
                                            <h6>4K +HDR</h6>
                                        </div>
                                        <div>
                                        <button className="btn btn-warning">Subscribe</button>
                                        </div>
                                    </div>
                                    <div className='plansScreen'>
                                        <div className="plansScreen__info">
                                            <h5>Standard</h5>
                                            <h6>1080p</h6>
                                        </div>
                                        <div>
                                        <button className="btn btn-info">Subscribe</button>
                                        </div>
                                    </div>
                                    <div className='plansScreen'>
                                        <div className="plansScreen__info">
                                            <h5>Basic</h5>
                                            <h6>720p</h6>
                                        </div>
                                        <div >
                                        <button className="btn btn-success">Subscribe</button>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={userSignOut}
                                    className="profileScreen__signOut"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div> 
                </div>
            </div>
        </div>
    )
}

export default Profile;