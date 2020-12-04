import React, { Component } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { host } from '../../envVariables'
import AdminHeader from './adminHeader.component';

const saved = (page) => toast.success(page+" saved!");

class AdminBlogPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            ak:props.history.location.state.ak, 
            blogPost:{
            _id:"",
            author:"",
            date:"",
            title:"",
            image:"",
            content:""
            }
        }
    }


    componentDidMount() {
        //Update blog from matching id
        axios.get(host+'/content/blog/'+window.location.pathname.slice(16))
            .then(response => {
                this.setState( {blogPost: response.data} );
            })
            .catch(function (error){
                console.log(error);
            })
      }


    render() { 
        return ( 
            <div>
                <AdminHeader activeWindow="Blog" />
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
                <h1 className="display-1 text-center">Blog Post</h1>
                <div>
                        <div className="row m-2">
                            <label className="col" htmlFor="author">Author</label>
                            <input className="col-8" id="author" defaultValue={this.state.blogPost.author}></input>
                        </div>
                        
                        <div className="row m-2">
                            <label className="col" htmlFor="date">Date</label>
                            <input type="date" className="col-8" id="date" defaultValue={this.state.blogPost.date}></input>
                        </div>

                        
                        <div className="row m-2">
                            <label className="col" htmlFor="title">Title</label>
                            <input className="col-8" id="title" defaultValue={this.state.blogPost.title}></input>
                        </div>

                        
                        <div className="row m-2">
                            <label className="col" htmlFor="image">Image</label>
                            <input className="col-8" id="image" defaultValue={this.state.blogPost.image}></input>
                        </div>

                        
                        <div className="row m-2">
                            <label className="col" htmlFor="content">Content</label>
                            <textarea className="col-8" id="content" defaultValue={this.state.blogPost.content}></textarea>
                        </div>

                        <Link to={{pathname:"/admin/Blog",state:{ak:this.state.ak}}} ><button onClick={ this.savePost } className="btn-success btn btn-block">Save</button></Link>
                    </div>
                </div>
         );
    }

    // Formats post to save
    savePost =() =>{
        let blogContent = {
            _id:window.location.pathname.slice(16),
            author:document.getElementById("author").value,
            date:document.getElementById("date").value,
            title:document.getElementById("title").value,
            image:document.getElementById("image").value,
            content:document.getElementById("content").value
        }
    
        this.updateBlogDB(blogContent)
    }
    
    //Updates DB
    updateBlogDB = (content) => {
        axios.post(host+'/content/blog/update/'+content._id, {
            "ak":this.state.ak,
            "blogPostContent":content            
        }) //{blogPostContent:content, ak:this.state.ak}
            .then((resp) => {
                saved("Blog")              
    
            })
    }

}


export default AdminBlogPost;