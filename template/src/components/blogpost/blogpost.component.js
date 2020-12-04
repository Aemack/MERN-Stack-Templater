import React, { Component } from 'react';
import axios from 'axios';
import { host } from '../../envVariables'

import Header from '../header.component'
import Footer from '../footer.component'
import { makeColumns } from '../../utils/formatting'


class BlogPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            author:"",
            date:"",
            title:"",
            image:"",
            content:""
        }

    }

    
    //Get blog content from server
    componentDidMount() {
        axios.get(host+'/content/blog/'+window.location.pathname.slice(10))
            .then(response => {
                this.setState( response.data );
            })
            .catch(function (error){
                console.log(error);
            })
      }


    render() { 
        return ( 
            <div>
                <Header activeWindow="Blog"/>
                { formatBlogPost(window.location.pathname.slice(10), this.state) }
            </div>
         )
    }
}
 
export default BlogPost;


//Formats blog post
function formatBlogPost(pathname, postObject){
    if (postObject.content){
        return (
        <div className="d-flex justify-content-center flex-column w-75 mx-auto">
        
            <h1 className="display-3">{postObject.title}</h1>
            <img className="blog-post-image" alt="" src={postObject.image}/>
            <h3 className="text-muted"><i>{postObject.author}</i></h3>
            <p className="text-muted">{postObject.date}</p>
            {makeColumns(postObject.content)}
            <Footer />
        </div>
        )
    }
}
