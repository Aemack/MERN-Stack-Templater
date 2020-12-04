import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { host } from '../envVariables';

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:"",
            logo:"",
            tagLine:""
        }
    }


    componentDidMount() {
        axios.get(host+'/content/header')
            .then(response => {
                this.setState( response.data[0] );
            })
            .catch(function (error){
                console.log(error);
            })
      }
    render() { 
        return ( 
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <img src={this.state.logo} alt="" id="nav-logo"/>
                    <h1 className="navbar-brand" >{this.state.name}</h1>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                        <div className="d-flex justify-content-around">
                            { navLink('Home', this.props.activeWindow) }
                            { navLink('About', this.props.activeWindow) }
                            { navLink('Blog', this.props.activeWindow) }
                        </div>
                        </ul>
                        <span className="navbar-text">
                            { this.state.tagline }
                        </span>
                    </div>
                    </nav>
                </div>
         );
    }
}
 

function navLink(loc,activeWindow){
    if (activeWindow === loc){
        return ( 
                <Link to={"/"+loc} className="nav-link" ><b>{loc}</b></Link>
        )
    } else {
        return ( 
            <li className="nav-item">
                <Link to={"/"+loc} className="nav-link">{loc}</Link>
            </li>
        )
    }


}

export default Header;