import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";


class AdminHeader extends Component {
    constructor(props){
        super(props)
        this.state= {
            ak:this.props.ak
        }
    }

    render() { 
        return ( 
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <h1 className="navbar-brand" >Admin</h1>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                        <div className="d-flex justify-content-around">
                            { navLink('Home', this.props.activeWindow, this.props.ak) }
                            { navLink('About', this.props.activeWindow, this.props.ak) }
                            { navLink('Blog', this.props.activeWindow, this.props.ak) }
                        </div>
                        </ul>
                        <span className="navbar-text">
                        <a target="blank" href={"/"+this.props.activeWindow} >See it Live! </a>
                        </span>
                    </div>
                    </nav>

                </div>
         );
    }
}
 
//Navigation Links
function navLink(loc,activeWindow, accKey){
    if (activeWindow === loc){
        return ( 
                <Link to={{ pathname:"/admin/"+loc, state:{ak:accKey}}} className="nav-link" ><b>{loc}</b></Link>
        )
    } else {
        return ( 
            <li className="nav-item">
                <Link to={{ pathname:"/admin/"+loc, state:{ak:accKey}}} className="nav-link">{loc}</Link>
            </li>
        )
    }


}

export default AdminHeader;