import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../envVariables'
import AdminHeader from './adminHeader.component'

const saved = (page) => toast.success(page+" saved!");

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
                ak:props.history.location.state.ak,  
                homeContent: {
                    about:{
                    name:"",
                    tagline:"",
                    aboutContent:"",
                    },
                photogridContent:[""]
              },
              
            }
    }
  componentDidMount() {
    //Get home content and sets state
    axios.get(host+'/content/home')
        .then(response => {
            this.setState({ homeContent:{
                                about:{
                                    name:response.data[0].about.name,
                                    tagline:response.data[0].about.tagline,
                                    aboutContent:response.data[0].about.aboutContent,
                                    },                    
                                photogridContent:response.data[0].photogridContent
            }  });
        })
        .catch(function (error){
            console.log(error);
        })
  }

    render() {
        return (
            <div>
              <AdminHeader activeWindow="Home" ak={this.props.history.location.state.ak}/>
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
                <h1 className="display-1 text-center">Edit Home</h1>
                <div className="w-75 h-100 mx-auto border">
                        <div className="row m-1" key="nameInput">
                            <label className="col" htmlFor="name">Website Name: </label>
                            <input id="name" className="col-8" defaultValue={ this.state.homeContent.about.name }></input>
                        </div>
                        
                        <div className="row m-1" key="taglineInput">
                            <label className="col" htmlFor="tagline">Tagline: </label>
                            <input className="col-8" id="tagline" defaultValue={ this.state.homeContent.about.tagline }></input>
                        </div>
                        
                        <div className="row m-1" key="contentInput">
                            <label className="col" htmlFor="content">Content: </label>
                            <textarea className="col-8" id="content" defaultValue={ this.state.homeContent.about.aboutContent }></textarea>
                        </div>

                        <div className="row m-1" key="photogridInput">
                            <label className="col" htmlFor="photogrid">Photogrid</label>
                            <div className="d-flex flex-column justify-content-between m-1">                         
                                <button onClick={deletePhoto} key="removeButton"  className="btn btn-danger">-</button>   
                                <button onClick={addPhoto} key="addButton" className="btn btn-primary">+</button>
                            </div>
                            <div className="col-8 d-flex flex-column"  key="photogrid" id="photogrid">
                            { this.state.homeContent.photogridContent.map((photo) => <input className="m-1 photogrid-photo" key={photo.src} defaultValue={photo.src}></input>) }
                            </div>
                        </div>
                        <button onClick={ this.saveHome } key="saveButton" className="btn btn-success btn-block" >Save</button>
                  
                </div>
            </div>    
            )                    
        }


        //Format content to save
        saveHome = () =>{
            let photogridArray = []
            let photoElems = document.querySelectorAll(".photogrid-photo")
            if (photoElems){
                photoElems.forEach((photo) => {
                    photogridArray.push({src:photo.value})
                })
                }
            
            let homeContent = {
               about:{
                   name:document.getElementById("name").value,
                   tagline:document.getElementById("tagline").value,
                   aboutContent:document.getElementById("content").value,
               },
               photogridContent:photogridArray
           } 
           
           this.updateDB(homeContent)
        
        }
        
        //Saves content to DB
        updateDB = (content) => {
            axios.post(host+'/content/home/update/', {
            ak:this.state.ak,    
            homeContent:{
                    about:content.about,
                    photogridContent:content.photogridContent
                }
              })
              .then((resp) => {
                  saved("Home")
        
              })
        }
         



}

//Removes the last photo element
function deletePhoto(){
    let photoElems = document.querySelectorAll(".photogrid-photo")
    photoElems[photoElems.length-1].remove()
}

//Adds a phot element
function addPhoto(){
    let inputElem = document.createElement("input")
    inputElem.classList.add("photogrid-photo")
    inputElem.classList.add("m-1")
    inputElem.setAttribute("key","blank")
    document.getElementById("photogrid").appendChild(inputElem)
}


export default Home;