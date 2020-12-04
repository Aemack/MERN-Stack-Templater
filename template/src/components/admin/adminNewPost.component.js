import React, { Component } from 'react';
import axios from 'axios';
import AdminHeader from './adminHeader.component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { host } from '../../envVariables';
const saved = (page) => toast.success(page+" saved!");

class AdminNewPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            ak:props.history.location.state.ak
        }
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
            pauseOnHover />
            <div>
                <h1 className="display-1 text-center">New Blog Post</h1>
                    <div className="row m-2">
                        <label className="col" htmlFor="author">Author</label>
                        <input className="col-8" id="author"></input>
                    </div>
                    
                    <div className="row m-2">
                        <label className="col" htmlFor="date">Date</label>
                        <input type="date" className="col-8" id="date"></input>
                    </div>

                    
                    <div className="row m-2">
                        <label className="col" htmlFor="title">Title</label>
                        <input className="col-8" id="title" ></input>
                    </div>

                    
                    <div className="row m-2">
                        <label className="col" htmlFor="image">Image</label>
                        <input className="col-8" id="image" ></input>
                    </div>

                    
                    <div className="row m-2">
                        <label className="col" htmlFor="content">Content</label>
                        <textarea className="col-8" id="content" ></textarea>
                    </div>

                    <Link to={{pathname:"/admin/Blog",state:{ak:this.state.ak}}} onClick={ this.savePost } className="btn-success btn btn-block">Save</Link>
                </div>
            </div>
         );
    }

    //Format post to save
    savePost = () => {
        let blogContent = {
            author:document.getElementById("author").value,
            date:document.getElementById("date").value,
            title:document.getElementById("title").value,
            image:document.getElementById("image").value,
            content:document.getElementById("content").value
        }
    
        this.updateBlogDB(blogContent)
    }

    //Adds blogpost to DB
    updateBlogDB = (content) => {
        axios.post(host+'/content/blog/add', {blogPostContent:content, ak:this.state.ak})
            .then((resp) => {
                saved("Blog")
    
            })
    }
}


 
export default AdminNewPost;