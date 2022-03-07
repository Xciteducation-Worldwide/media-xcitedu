import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const SignUpAsUser = () => {
    const navigate = useNavigate();
    const [userSubmit,setUserSubmit] = useState({
        name : "",
        email : "",
        password : "",
        profilePicture : ""
    })


    const uploadImg = async(e) => {
        const formdata = new FormData();
        formdata.append("file",e.target.files[0]);
        formdata.append("upload_preset","mediaHouse");
        await axios.post("https://api.cloudinary.com/v1_1/webdevoliva/image/upload",formdata)
        .then((res) => {
            setUserSubmit({
                "name" : userSubmit.name,
                "email" : userSubmit.email,
                "password" : userSubmit.password,
                "profilePicture" : res.data.secure_url
            });

        })
    }

    


    const onUserSubmit = async(e) => {
        const {name,email,password,profilePicture} = userSubmit;
        e.preventDefault();
        if(!name || !email || !password){
            console.log(`Please Fill Up All Fields`);
        }else if(name.length < 4 ){
            console.log("Name Should be grater or equal to 4 char");
        }else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            console.log("Please Enter Your Correct Email");
        }else if(password.length < 8){
            console.log("Password should be grater than or equal to 8 char.");
        }else{
            await axios({
                method : "POST",
                url : "http://localhost:8080/user/userRegister",
                headers : {
                    "Content-Type" : "application/json"
                },
                data : JSON.stringify({
                    name ,
                    email,
                    password,
                    profilePicture
                })
            }).then((res) => {
                console.log(res);
                navigate('/login')
                
            }).catch((err) => {
                console.log(`Something Went Wrong : ${err}`);
                
            })
        }
        
    }



  return (
    <div className="divForUser">
                <div>
                    <span className='cardTitle'>Register For User</span>
                    <span className="cardDescription">Resgister your account as a user.</span>
                </div>
                <form onSubmit={onUserSubmit}>

                        <div className='input'>
                            <input type="text" placeholder='Enter Your Name*' value={userSubmit.name} onChange={(e) => {
                                setUserSubmit({
                                    "name" : e.target.value,
                                    "email" : userSubmit.email,
                                    "password" : userSubmit.password,
                                    "profilePicture" : userSubmit.profilePicture
                                })
                            }} />
                        </div>
                        
                        <div className='input'>
                            <input type="email" placeholder='Enter Your Email*'  onChange={(e) => {
                                setUserSubmit({
                                    "name" : userSubmit.name,
                                    "email" : e.target.value,
                                    "password" : userSubmit.password,
                                    "profilePicture" : userSubmit.profilePicture
                                })
                            }} value={userSubmit.email}/>
                        </div>

                        <div className='input'>
                            <input type="password" placeholder='Enter Your Password*' onChange={(e) => {
                                setUserSubmit({
                                    "name" : userSubmit.name,
                                    "email" : userSubmit.email,
                                    "password" : e.target.value,
                                    "profilePicture" : userSubmit.profilePicture
                                })
                            }} value={userSubmit.password}/>
                        </div>

                        <div className="profile">
                            <label htmlFor="Upload Your Profile Image">Upload Your Profile Image</label>
                            <input type="file"  accept='application/image' onChange={uploadImg}/>
                        </div>

                        <div className="submit">
                            <input type="submit" value="register"/>
                        </div>
                        
                    
                    </form>
                    <div className="hr"></div>
                    <p className='extraLine'>Already On Media House? <a href='/login'>Login</a></p>
                </div>
  )
}

export default SignUpAsUser