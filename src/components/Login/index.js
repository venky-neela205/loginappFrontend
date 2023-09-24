import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitErr : false,
    errorMsg : '',
  }

  onHandleUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  onHandlePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onSubmitForm = async (e) => {
    e.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://loginappbackend-9zp5.onrender.com/login'
    const options = {
        method : 'POST',
        body : JSON.stringify(userDetails)
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true){
        console.log(data)
    }else{
        this.setState({errorMsg:data.error, showSubmitErr:true})
    }
  }

  render() {
    const {username, password, showSubmitErr, errorMsg} = this.state

    return (
      <div className='bg-container'>
        <h1>LOGIN</h1>
        <form className='form' onSubmit={this.onSubmitForm}>
        <label className='label' htmlFor='username'>USERNAME</label>
        <input id='username' className='input' type='text' placeholder='username' onChange={this.onHandleUsername} value={username} required />
        <label className='label' htmlFor='username'>PASSWORD</label>
        <input id='password' className='input' type='password' placeholder='password' onChange={this.onHandlePassword} value={password} required />
        {showSubmitErr && <p>*{errorMsg}</p>}
        <button className='btn' type='submit'>Login</button>
        <Link className="link" to="/register" >
            <button className='btn' type='button'>Register Now</button>
        </Link>
      </form>
      </div>
    );
  }
}

export default Login;
