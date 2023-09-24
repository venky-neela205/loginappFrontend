import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitErr: false,
    errorMsg: '',
    showSuccessMsg: false,
    successMsg: '',
  }

  onHandleUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  onHandlePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onSubmitForm = async (e) => {
    e.preventDefault()

    const { username, password } = this.state
    const userDetails = { username, password }
    console.log(username, password)
    const apiUrl = 'http://localhost:3001/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      if (data.error) {
        this.setState({ errorMsg: data.error, showSubmitErr: true })
      } else {
        this.setState({ successMsg: data.message, showSuccessMsg: true })
      }
    } else {
      this.setState({ errorMsg: data.error, showSubmitErr: true })
    }
  }

  render() {
    const { username, password, showSubmitErr, errorMsg, showSuccessMsg, successMsg } = this.state

    return (
      <div className='bg-container'>
        {showSuccessMsg ? (
          <p className='success-msg'>{successMsg}</p>
        ) : (
          <div className='bg-container'>
            <h1>LOGIN</h1>
            <form className='form' onSubmit={this.onSubmitForm}>
              <label className='label' htmlFor='username'>USERNAME</label>
              <input id='username' className='input' type='text' placeholder='username' onChange={this.onHandleUsername} value={username} required />
              <label className='label' htmlFor='password'>PASSWORD</label>
              <input id='password' className='input' type='password' placeholder='password' onChange={this.onHandlePassword} value={password} required />
              {showSubmitErr && <p className='err'>*{errorMsg}</p>}
              <button className='btn' type='submit'>Login</button>
              <Link className="link" to="/register" >
                <button className='btn' type='button'>Register Now</button>
              </Link>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
