import logo from './logo.svg';
import './App.css';
import emailjs from '@emailjs/browser';
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';

export function Header(props){
  return (
    <header>
      <h1>Avigail Castro</h1>
      <h2>{props.title}</h2>
	  </header>
  )
}
export function Tabs(){
  return(
    <nav className='headerTab headerTabCom'>
        <Link className='tab' to="/">
          <img width={70} src={require("./images/homeIcon.png")} alt='Home'/>
          
          <p>Home</p>
        </Link>

			  <Link className='tab' to="/blogs">
          <img width={70} src={require("./images/notebookIcon.png")} alt='Blogs'/>
          
          <p>Blogs</p>
        </Link>

        <Link className='tab' to="/contact">
          <img width={70} src={require("./images/contactIcon.png")} alt='Contact'/>
          <p>Contact</p>
        </Link>
        
      </nav>
  )
}

export function Home() {
  return (
    <article>
      <img className='profileImg' src={require('./images/Profile.webp')} alt='profilePicHere' />
      <p>
      I am like a butterfly. A butterfly who decided to be reckless and leave her cocoon. Her cocoon was full of wonders. She wondered what was happening outside if things were different, those things she was unable to see from the inside of her cocoon. A butterfly who enjoys learning from other human beings, she also loves to listen and connect with others from different cultures. A butterfly who learned to love those around her with the grace of God. She is the butterfly who is never giving up and reminds herself why she loves to wonder and explore. As a morpho butterfly who changes shape as they’re flying. 
“I am with you always” (Matthew 28:20). 

      </p>
    </article>
  );
}

export function Blogs(){
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const url = "https://sheets.googleapis.com/v4/spreadsheets/13efjcCsUrNfkoq_ZLEa5b-ZmGWfkf6TVQR18P_zHT3Y/values/Sheet1?alt=json&key=AIzaSyDCcqhhN89QIKDBqYmgQedsszRwKPwqdEg";
    useEffect(() => {
      fetch(url).then(function(response){
        return response.json();
      })
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError)
      // .catch(function(error){
      //   console.log(error);
      // }).then(setData);
    }, []);

    if(loading) return <article>Loading Blogs...</article>;
    if(error) return <article>An Error has occured when loading blogs. Please try again</article>
    if(!data) return null;


    
      return(
        <article className='blogs'>
          {data.values.slice(1).reverse().map((blog, index)=>(
            <Link className='Blog' to={blog[1]+"-"+blog[0]}>
              <img className='blogImage' src={blog[4]} alt='Blog Image' />
              <section className='blogInfo'>
                <h3>{blog[1]}</h3>
                <sub>By: {blog[6]}</sub><br/>
                <small>{blog[5]}</small>
                
                <p>{blog[2].slice(0,200)}...</p>
              </section>

            </Link>
          ))}
        </article>
      )
}

export function Blog(){
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = "https://sheets.googleapis.com/v4/spreadsheets/13efjcCsUrNfkoq_ZLEa5b-ZmGWfkf6TVQR18P_zHT3Y/values/Sheet1?alt=json&key=AIzaSyDCcqhhN89QIKDBqYmgQedsszRwKPwqdEg";
    useEffect(() => {
      setLoading(true);
      fetch(url).then(function(response){
        return response.json();
      })
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError)
      // .catch(function(error){
      //   console.log(error);
      // }).then(setData);
    }, []);

    if(loading) return <article>Loading Blog...</article>;
    if(error) return <article>An Error has occured when loading blog. Please try again</article>
    if(!data) return null;
  
    var array;

    var blogCredentials = window.location.href.split('/')[4].replaceAll('%20','').split('-');
    console.log(blogCredentials[0]);
    
    data.values.map((blog)=>{
      console.log(blog[1].replaceAll(' ','')===blogCredentials[0]&& blog[0]==blogCredentials[1]);
      if(blog[1].replaceAll(' ','')===blogCredentials[0]&& blog[0]==blogCredentials[1]){
        array = blog;
      }
    })

    return(
      <article>
        <img className='blogPageImage' src={array[4]} alt='Thumbnail is here' />
        <section className='blogPageDesc'>
        <h3>{array[1]}</h3>
        <sub>By: {array[6]}</sub>
        <div dangerouslySetInnerHTML={{__html:array[3]}}></div>
        </section>
      </article>
    )
  // var parse = require('html-react-parser');
  // stringHTML = parse(stringHTML);

}

export function Contact(){
  const form = useRef();
    const sendEmail = (e) => {
      e.preventDefault();

      // console.log(form.current[1].value);
  
      emailjs.sendForm(`${process.env.REACT_APP_SERVICE_ID}`, `${process.env.REACT_APP_TEMPLATE_ID}`, form.current, `${process.env.REACT_APP_PUBLIC_KEY}`)
        .then((result) => {
            console.log(result.text);
            console.log(form.current);
            window.alert('Your message has been sent!')
        }, (error) => {
            console.log(error.text);
            window.alert('An error occured when sending your message. Please try again')
        });
      // form.current[1].value = "";
    };

  return(
    <article>
      <h3>Have something you would like to tell me about? Fill out this form and I'll get right back with you as soon as I see your message!</h3>
      <form ref={form} onSubmit={sendEmail}>
        <section className='formElement'>
        <label htmlFor='name'> Full Name: </label>
        <br/>
        <input type='text' name='name' required />
        </section>

        <section className='formElement'>
        <label htmlFor='email'> Email: </label>
        <br/>
        <input type='email' name='email' required/>
        </section>

        <section className='formElement'>
        <label htmlFor='number'> Phone Number: </label>
        <br/>
        <input type='number' name='number' required/>
        </section>

        <section className='formElement'>
        <label htmlFor='subject'> Subject: </label>
        <br/>
        <input type='text' name='subject' required/>
        </section>

        <section className='formElement'>
        <label htmlFor='message'> Your Message: </label>
        <br/>
        <textarea style={{minHeight:'60px', resize:'vertical'}} name='message' required/>
        <br />
        </section>
        <button type='submit'>Send</button>
        
      </form>
    </article>
  )
}

export default Home;
