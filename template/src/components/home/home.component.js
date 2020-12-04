import React, { Component } from 'react';
import axios from 'axios';
import { host } from '../../envVariables'
import Header from '../header.component'
import Footer from '../footer.component'
import HomeCarousel from './home-carousel.component'
import HomeAbout from './home-about.components'
import Photogrid from './photogrid.component'


class Home extends Component {
    state = { 
              blogPosts:[],
              homeContent: {
                about:{
                  name:"",
                  tagline:"",
                  aboutContent:"",
                },
                photogridContent:[]
              },
              
            }


  componentDidMount() {
    axios.get(host+'/content/home')
        .then(response => {
            this.setState({ homeContent: response.data[0] });
            
        })
        .catch(function (error){
            console.log(error);
        })
    axios.get(host+'/content/blog')
    .then(response => {
        this.setState({ blogPosts: response.data });
        
    })
    .catch(function (error){
        console.log(error);
    })
  }

    render() { 
        return (
            <div>
              <Header activeWindow="Home"/>
                <h1 className="display-1 text-center">Home</h1>
                <div className="w-50 mx-auto">
                    <HomeCarousel id="home-carousel" className="m-5" recentPosts={this.state.blogPosts}/>
                    <HomeAbout aboutContent={this.state.homeContent.about} className="m-5"/>
                    <Photogrid photogridContent={this.state.homeContent.photogridContent} />
                </div>
                <Footer />
            </div>    
            )                    
        }
}
 
export default Home;