import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {  Link } from "react-router-dom";
import { host } from '../../envVariables'

import AdminHeader from './adminHeader.component';

const saved = (page) => toast.success(page+" saved!");


class AdminBlogList extends Component {
    constructor(props){
        super(props)
        this.state= {
            blogList:[],
            ak:props.history.location.state.ak
        }
    }

    // Gets blogs from DB
    componentDidMount() {
        axios.get(host+'/content/blog')
            .then(response => {
                this.setState({ blogList: response.data.sort(compare) });
            })
            .catch(function (error){
                console.log(error);
            })
      }

      //Link to new post
      newPost = () =>{
          return {
            pathname:"/admin/NewPost",
            state:{ak:this.state.ak}
          }
      }

      // Link to edit post
      editPost = (id) =>{
        return {
          pathname:"/admin/BlogPost/"+id,
          state:{ak:this.state.ak}
        }
    }

    render() { 
        return ( 
        <div>
            <AdminHeader activeWindow="Blog"  ak={this.state.ak}></AdminHeader>
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
            <h1 className="display-1 text-center">Blog Posts</h1>
            <div className="justify-content-center mx-auto my-2 border d-flex flex-column w-75">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center"><u>Title</u></th>
                            <th scope="col" className="text-center"><u>Author</u></th>
                            <th scope="col" className="text-center"><u>Date</u></th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.state.blogList.map((blog,i) => (
                    <tr key={blog._id} id={blog._id}>
                            <th scope="col" className="text-center">{blog.title}</th>
                            <th scope="col" className="text-center">{blog.author}</th>
                            <th scope="col" className="text-center">{blog.date}</th>
                            <th scope="col" className="text-center"><Link to={ this.editPost(blog._id) }>Edit</Link></th>
                    </tr>
                    ))}
                    </tbody>
                </table>
                <Link className="btn btn-primary mx-auto my-2" to={ this.newPost } >New</Link> 
            </div>
            </div>
             );
    }
}

//Compare dates and returns oldest first
function compare(a, b) {
    
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
 
export default AdminBlogList;