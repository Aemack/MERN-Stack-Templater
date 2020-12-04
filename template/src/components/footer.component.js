import React, { Component } from 'react';
import axios from 'axios';
import { host } from '../envVariables'


class Footer extends Component {
    constructor(props){
        super(props)
        this.state = {
            footerContent:{  
                email:"",
                phone:"",
                website:"",
                address:{
                    building:"",
                    street:"",
                    town:"",
                    postcode:""}
                }
           }
    }

    componentDidMount() {
        axios.get(host+'/content/footer')
            .then(response => {
                this.setState({ footerContent: response.data[0] });
            })
            .catch(function (error){
                console.log(error);
            })
      }

    render() { 
        return ( 
            <footer className="fixed-bottom bg-light">
                <ul className="d-flex flex-row text-light justify-content-around list-unstyled">
                    <li ><p><a className="text-dark" href={"mailto:"+this.state.footerContent.email}>{this.state.footerContent.email}</a></p></li>
                    <li ><p className="text-dark">{this.state.footerContent.phone}</p></li>
                    <li><p className="text-dark">{this.state.footerContent.address.town}</p></li>
                </ul>
                
          </footer>
        );
    }
}
 
export default Footer;