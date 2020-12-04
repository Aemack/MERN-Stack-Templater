import React, { Component } from 'react';

class Photogrid extends Component {
    render() { 
        return ( 
            <div className="d-flex flex-wrap justify-content-center">
                { formatPhotogrid(this.props.photogridContent) }

                
            </div>
        );
    }
}

function makePhotoElement(photo) {
    return (
        <div key={photo.src}>
            <img  className="photoContainer" key={photo.src} src={photo.src} alt=""></img>
        </div>
    )
}

function formatPhotogrid (content){
    if (content){
        return (
            <div key="photogrid" className="d-flex flex-row flex-wrap justify-content-center">
                { content.map((photo)=> makePhotoElement(photo)) }
            </div>
        )
    }

}

export default Photogrid;