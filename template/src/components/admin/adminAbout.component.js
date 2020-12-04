import React, { Component, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { host } from '../../envVariables'
import AdminHeader from './adminHeader.component';


const saved = (page) => toast.success(page+" saved!");

class AdminAbout extends Component {
    constructor(props){
        super(props)
        this.state = {
            ak:props.history.location.state.ak,
            aboutContent:{
                image:"",
                aboutContent:""
            },
            headerContent:{
                name:"",
                logo:"",
                tagline:""
            },
            footerContent:{
                email:"",
                phone:"",
                website:"",
                address:{
                    building:"",
                    street:"",
                    town:"",
                    postcode:""
                }

            }
        }
    }


    componentDidMount() {
        //Get header, footer and about content from server
        axios.get(host+'/content/about')
            .then(response => {
                this.setState({ aboutContent: response.data[0] });
            })
            .catch(function (error){
                console.log(error);
            })

            axios.get(host+'/content/footer')
            .then(response => {
                this.setState({ footerContent: response.data[0] });
            })
            .catch(function (error){
                console.log(error);
            })

            axios.get(host+'/content/header')
            .then(response => {
                this.setState({ headerContent: response.data[0] });
            })
            .catch(function (error){
                console.log(error);
            })
      }

    render() { 
        return (

            <div>
                <AdminHeader ak={this.state.ak} activeWindow="About" />
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
                <h1 className="display-1 text-center">Edit About</h1>
                <div className="w-75 mx-auto d-flex flex-column justify-content-around h-100">
                    <div className="border m-2">
                        <div className="row m-2 mt-3">
                            <p className="col"><b>About Page</b></p>
                        </div>
                        <div className="row m-2">
                            <label className="col" htmlFor="image">Image</label>
                            <input className="col-8" id="image" defaultValue={this.state.aboutContent.image}></input>
                        </div>
                        <div className="row m-2">
                            <label className="col" htmlFor="content">Content</label>
                            <textarea className="col-8" id="content" defaultValue={this.state.aboutContent.aboutContent}></textarea>
                        </div>
                        <button onClick={ this.saveAbout } className="btn-success btn btn-block">Save</button>
                    </div>
                    <div className="border m-2">
                        <div className="row m-2 mt-3">
                            <p className="col"><b>Header Info</b></p>
                        </div>
                        <div className="row m-2">
                            <label className="col" htmlFor="name">Name</label>
                            <input className="col-8" id="name" defaultValue={this.state.headerContent.name}></input>
                        </div>
                        <div className="row m-2">
                            <label className="col" htmlFor="logo">Logo</label>
                            <input className="col-8" id="logo" defaultValue={this.state.headerContent.logo}></input>
                        </div>
                        
                        <div className="row m-2">
                            <label className="col" htmlFor="tagline">Tagline</label>
                            <input className="col-8" id="tagline" defaultValue={this.state.headerContent.tagline}></input>
                        </div>
                        <button onClick={ this.saveHeader } className="btn-success btn btn-block">Save</button>
                    </div>
                    <div className="border m-2">
                        <div className="row m-2 mt-3">
                            <p className="col"><b>Footer Info</b></p>
                        </div>
                        <div className="row m-2">
                            <label className="col" htmlFor="email">Email</label>
                            <input className="col-8" id="email" defaultValue={this.state.footerContent.email}></input>
                        </div>
                        
                        <div className="row m-2">
                            <label className="col" htmlFor="phone">Phone</label>
                            <input className="col-8" id="phone" defaultValue={this.state.footerContent.phone}></input>
                        </div>

                        
                        <div className="row m-2">
                            <label className="col" htmlFor="website">Website</label>
                            <input className="col-8" id="website" defaultValue={this.state.footerContent.website}></input>
                        </div>

                        <div className="row m-2 mt-3">
                            <p className="col"><i>Address</i></p>
                        </div>
                        <div className="row m-2">
                            <label className="col" htmlFor="building">Building</label>
                            <input className="col-8" id="building" defaultValue={this.state.footerContent.address.building}></input>
                        </div>
                        <div className="row m-2">
                            <label className="col" htmlFor="street">Street</label>
                            <input className="col-8" id="street" defaultValue={this.state.footerContent.address.street}></input>
                        </div>
                        <div className="row m-2">
                            <label className="col" htmlFor="town">Town</label>
                            <input className="col-8" id="town" defaultValue={this.state.footerContent.address.town}></input>
                        </div>
                        <div className="row m-2">
                            <label className="col" htmlFor="postcode">Postcode</label>
                            <input className="col-8" id="postcode" defaultValue={this.state.footerContent.address.postcode}></input>
                        </div>

                        <button onClick={ this.saveFooter } className="btn-success btn btn-block">Save</button>
                        
                    </div>
                </div>
            </div>
         );
    }


    // Format about object to save 
    saveAbout = () =>{
        let aboutContent = {
            aboutContent:document.getElementById("content").value,
            image:document.getElementById("image").value
        }
    
        this.updateAboutDB(aboutContent)
    }
    
    // Format header object to save 
    saveHeader = () => {
        let headerContent = {
            name:document.getElementById("name").value,
            tagline:document.getElementById("tagline").value,
            logo:document.getElementById("logo").value
        }
    
        this.updateHeaderDB(headerContent)
    }
    
    // Format footer object to save 
    saveFooter = () => {
        let footerContent = {
            email:document.getElementById("email").value,
            phone:document.getElementById("phone").value,
            website:document.getElementById("website").value,
            address:{
                building:document.getElementById("building").value,
                street:document.getElementById("street").value,
                town:document.getElementById("town").value,
                postcode:document.getElementById("postcode").value,
        
            }
        }
        this.updateFooterDB(footerContent)
    }
    
    
    // Updates the DB with new about content 
    updateAboutDB = (content) => {
        axios.post(host+'/content/about/update/', {
            ak:this.state.ak,
            aboutContent:{
                aboutContent:content.aboutContent,
                image:content.image
            }
          })
          .then((resp) => {
              saved("About")
              
          })
    }
    
    // Updates the DB with new header content
    updateHeaderDB = (content) => {
        axios.post(host+'/content/header/update/', {
            ak:this.state.ak,
            headerContent:{
                name:content.name,
                tagline:content.tagline,
                logo:content.logo}
          })
          .then((resp) => {
            saved("Header")
          })
    }
    
    // Updates the DB with new footer content
    updateFooterDB = (content) =>{
        axios.post(host+'/content/footer/update/', {
            ak:this.state.ak,
            footerContent:{
                email:content.email,
                phone:content.phone,
                website:content.website,
                address:content.address
            }
          })
          .then((resp) => {
              saved("Footer")
          })
    }

}
 



export default AdminAbout;