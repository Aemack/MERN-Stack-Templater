import React, { Component } from 'react';
import { BrowserRouter as Router, Link  } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'

function makeCarouselItem(post){
    return (
            <Carousel.Item id="carousel-item" key={post._id}>
                    <Link className="text-decoration-none" to={{
                            pathname:"/BlogPost/"+post._id}} >
                        <img
                        id="carousel-image"
                        className="d-block"
                        src={post.image}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>{post.title}</h3>
                            <p>{post.content.slice(0,100)}...</p>
                        </Carousel.Caption>
                    </Link>
            </Carousel.Item>
    )
}

class HomeCarousel extends Component { 
    render() { 
        return ( 
        <div>
            <Carousel>
                {this.props.recentPosts.map((post)=> makeCarouselItem(post))}        
            </Carousel>
        </div> );
    }
}

export default HomeCarousel;