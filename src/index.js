import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './index.css';
import {Home, Header, Tabs, Blogs, Blog, Contact} from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  
  <Routes>
      <Route path='/' element={
      <React.Fragment>
        <Tabs />
        <Header title='Home' />
        <Home />
      </React.Fragment>
      }/>

      <Route path='/blogs' element={
      <React.Fragment>
        <Tabs />
        <Header title='Blogs' />
        <Blogs />
      </React.Fragment>
      }/>

      <Route path='/blogs/:blogId' element={
      <React.Fragment>
        <Tabs />
        <Header title='Blog' />
        <Blog />
      </React.Fragment>
      }/>

      <Route path='/Contact' element={
      <React.Fragment>
        <Tabs />
        <Header title='Contact' />
        <Contact />
      </React.Fragment>
      }/>

    </Routes>
    
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
