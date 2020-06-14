import React, { Component } from 'react'
import axios from '../../axios'
import { Redirect } from 'react-router-dom';

 

class Signup extends Component {

    onSubmitHandler = (event) => {
        event.preventDefault()
        let form = {
            "name": {
                "firstName": null,
                "middleName": null,
                "lastName": null
            },
            "userName": null,
            "password": null,
            "email": null,
            "address": {
                "houseNo": null,
                "city": null,
                "pin": null
            }
        };
    
        form.name.firstName = document.getElementById('fn').value
        form.name.middleName = document.getElementById('mn').value
        form.name.lastName = document.getElementById('ln').value
    
        form.userName= document.getElementById('un').value
        form.password= document.getElementById('password').value
        form.email= document.getElementById('email').value
    
        form.address.houseNo = document.getElementById('hno').value
        form.address.city = document.getElementById('city').value
        form.address.pin = parseInt(document.getElementById('pin').value)
    console.log(form)
    axios.post('/users/signup',form)
    .then(res=>{
        console.log(res.data)
        localStorage.setItem('token',res.data.token)
        this.setState({})
    })
    .catch(err=>{
        console.log(err)
    })
    }
    
    render() {
        return (
            <div>
                <h4>Signup</h4>
                {localStorage.getItem('token') !== null ? <Redirect to="/products" /> : null}
            <form id='form'>
                <div>
                    <label >Name</label>
                    <input id='fn' placeholder={"FirstName"} required />
                    <input id='mn' placeholder={"MiddleName"} required />
                    <input id='ln' placeholder={"LastName"} />
                </div>

                <div>
                    <label>Email</label>
                    <input id='email' type={"email"} />
                </div>

                <div>
                    <label>Username</label>
                    <input id='un' type={"text"} />
                </div>

                <div>
                    <label>Password</label>
                    <input id='password' type={"password"} />
                </div>

                <div>
                    <label >Address</label>
                    <input id="hno" placeholder={"House No"} />
                    <input id="city" placeholder={"City"} required />
                    <input id="pin" placeholder={"Pin"} required />
                </div>

                <button type={'submit'} onClick={(event) => this.onSubmitHandler(event)}>Submit</button>
            </form>
            </div>
        )
    }

  
}
export default Signup