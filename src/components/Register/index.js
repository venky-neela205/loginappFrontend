import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import './index.css'

class Register extends Component {

    state = {
        username : "",
        password : "",
        showSubmitErr : false,
        errorMsg : '',
        showSuccessMsg : false,
        successMsg : '',
    }

    onHandleUsername = (e) => {
        this.setState({username: e.target.value})
    }

    onHandlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    onSubmitForm = async (e) => {
        e.preventDefault()

        const {username, password} = this.state
        const userDetails = {username, password}
        console.log(username, password)
        const apiUrl = 'https://loginappbackend-c3x5.onrender.com/register'
        const options = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(userDetails)
        }
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        if(response.ok){
            console.log(data)
            this.setState({successMsg: data.message, showSuccessMsg:true})
        }else{
            this.setState({errorMsg: data.error, showSubmitErr:true})
        }
    }

    render(){
        const {username, password, showSubmitErr, errorMsg, showSuccessMsg, successMsg} = this.state

        return(
            <div className='bg-container'>
                <h1>REGISTER</h1>
                <form className='form' onSubmit={this.onSubmitForm}>
                <label className='label' htmlFor='username'>USERNAME</label>
                <input id='username' type='text' className='input' placeholder='username' onChange={this.onHandleUsername} value={username} required />
                <label className='label' htmlFor='password'>PASSWORD</label>
                <input id='password' type='text' className='input' placeholder='password' onChange={this.onHandlePassword} value={password} required/>
                {showSubmitErr && <p className='err'>*{errorMsg}</p>}
                {showSuccessMsg && <p className='success-msg'>{successMsg}</p>}
                <button className='btn' type='submit' >Register</button>
                <Link className='link' to="/">
                <button className='btn' type='button' >Login Now</button>
                </Link>
            </form>
            </div>
        )
    }
}

export default Register