import React, { Component } from 'react';
import { makeColumns } from '../../utils/formatting' 
import axios from 'axios';
import { host } from '../../envVariables'

import Footer from '../footer.component'
import Header from '../header.component'

class About extends Component {
    constructor(props){
        super(props)
        this.state = {
            aboutContent:{
                image:"",
                aboutContent:""
            }
        }
    }


    componentDidMount() {
        //Get content from server
        axios.get(host+'/content/about')
            .then(response => {
                this.setState({ aboutContent: response.data[0] });
            })
            .catch(function (error){
                console.log(error);
            })
      }
    
    render() { 
        return ( 
            <div>
                <Header activeWindow="About" />
                
                <div>
                    <h1 id="about-title" className="display-1 position-relative">About</h1>
                    <img id="about-image" className="mx-auto w-100" src={this.state.aboutContent.image} alt="" />                
                </div>
                <div className="d-flex w-75 flex-column mx-auto">
                    { makeColumns(this.state.aboutContent.aboutContent) }
                </div>
                
                <Footer />
                
            </div>
         );
    }
}
 
export default About;