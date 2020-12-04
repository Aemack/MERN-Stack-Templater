import React, { Component } from 'react';
import axios from 'axios';

import Header from '../header.component'
import Footer from '../footer.component'
import BlogsList from './blogsList.component'

import { host } from '../../envVariables'

class Blog extends Component {
    constructor(props){
        super(props)
        this.state = {
            blogPicture:"",
            blogPosts:[]
        }

    }


    //Get blog content from server
    componentDidMount() {
        axios.get(host+'/content/blog')
            .then(response => {
                let blogArray = response.data;
                this.setState({ blogPosts: blogArray.sort(compare) });
                
            })
            .catch(function (error){
                console.log(error);
            })

            axios.get(host+'/content/about')
            .then(response => {
                this.setState({ blogPicture: response.data[0].image });
                
            })
            .catch(function (error){
                console.log(error);
            })
      }

    render() { 
        return ( 
            <div>
                <Header activeWindow="Blog" />
                <h1 className="display-1">Blog Posts</h1>
                <img id="about-image" className="w-100" src={this.state.blogPicture} alt=""/>
                <BlogsList blogPosts={ this.state.blogPosts }/>
                <Footer />
            </div>
         );
    }
}

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const postA = Date.parse(a.date);
    const postB = Date.parse(b.date);
  
    let comparison = 0;
    if (postA > postB) {
      comparison = 1;
    } else if (postA < postB) {
      comparison = -1;
    }
    return comparison * -1;
  }
 
export default Blog;