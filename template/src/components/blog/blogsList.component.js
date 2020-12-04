import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class BlogsList extends Component {
    render() { 
        return (                 
        <div className="mx-auto d-flex flex-row flex-wrap ">
        { this.props.blogPosts.map((post) => (

            <div key={post._id} className="card my-2 mx-auto blog-list-post">
            <Link className="text-decoration-none" to={{
                    pathname:"/BlogPost/"+post._id}} >
                
                <div className="card-header">
                    <h3 className="text-decoration-none card-title text-dark">{post.title}</h3>
                    <div className="d-flex justify-content-between">
                        <p className="text-muted">{post.author}</p> <p className="text-muted">{post.date}</p>
                    </div>
                </div>
                
                <img className="card-img-top w-100 blog-list-image" src={post.image} alt=""></img>
                <div className="card-body justify-content-center">
                    <p className="text-dark text-decoration-none overflow-hidden">{post.content.slice(0,600)}</p>
                </div>
            
                </Link>
            </div>
        ))}
    </div> );
    }
}
 
export default BlogsList;