import React, { Component } from 'react';
import axios from 'axios';
import { host } from '../../envVariables'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminHeader from './adminHeader.component';

//Toast message
const failed = (message) => toast.warning(message);

class AdminLogin extends Component {
    state = { 
        accessKey:""
     }
    loggedIn(){
    let accessKey = this.state.accessKey;
    if (accessKey.length > 0){
        return (
            <div>
                <AdminHeader ak={accessKey}/>
                <h1 className="text-center display-1">Welcome!</h1>
            </div>
        )
    } else {
        return (
            <div className="text-center border border-light p-5 w-50 mx-auto" action="#!">

            <p className="h4 mb-4">Sign in</p>

            <input type="username" id="username" className="form-control mb-4" placeholder="Username"/>

            <input type="password" id="password" className="form-control mb-4" placeholder="Password"/>

            <div className="d-flex justify-content-around">
                <div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember"/>
                        <label className="custom-control-label" htmlFor="defaultLoginFormRemember">Remember me</label>
                    </div>
                </div>
            </div>

            <button onClick={this.loginClicked} className="btn btn-info btn-block my-4" type="submit">Sign in</button>
        </div>
        )
    }
}
     

    loginClicked = () =>{
        //Get username and password from DOM
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value
        //Check if values are empty
        if (!username || !password){
            //Send a toast if no password or username
            failed("Please enter Username and Password")
            return;
        }
        axios.post(host+'/content/credentials/validate/'+username+"/"+password)
        .then(response => {
            if (response.data.accessKey !== ""){
                
                this.setState({accessKey:response.data.accessKey})
                
            } else {
                failed("Incorrect Login Details")
            }
        })
        .catch(function (error){
        })
    }
    
    render() { 
        return ( 
            <div>
                <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>

            { this.loggedIn() }

            </div>
         );
    }
}
 
 
export default AdminLogin;