import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/home/home.component';
import Blog from './components/blog/blog.component';
import About from './components/about/about.component';
import BlogPost from './components/blogpost/blogpost.component'

import AdminLogin from './components/admin/adminLogin.component'
import AdminHome from './components/admin/adminHome.component'
import AdminAbout from './components/admin/adminAbout.component'
import AdminBlogList from './components/admin/adminBlogList.component'
import AdminBlogPost from './components/admin/adminBlogPost.component'
import AdminNewPost from './components/admin/adminNewPost.component'

function App() {
  return (
      <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Home" component={Home} />
            <Route path="/Blog" component={Blog} />
            <Route path="/BlogPost/" component={BlogPost} />
            <Route path="/About" component={About} />

            
            <Route path="/Admin/Login" component={AdminLogin} />
            <Route path="/Admin/Home" component={AdminHome} />
            <Route path="/Admin/About" component={AdminAbout} />
            <Route path="/Admin/Blog" component={AdminBlogList} />
            <Route path="/Admin/BlogPost/" component={AdminBlogPost} />
            <Route path="/Admin/NewPost/" component={AdminNewPost} />
          </Switch>
      </main>
  )
}


export default App;
