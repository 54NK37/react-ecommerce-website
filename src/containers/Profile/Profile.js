import React, { Component } from 'react'
import axios from '../../axios'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: null
        }
    }
    componentDidMount() {
    let token = localStorage.getItem('token')
    axios.get('/users/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            this.setState({form : res.data})
            console.log(this.state.form)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <div>
                <h4>My Profile</h4>
            <div>
                <p><strong>Name : </strong>{this.state.form !== null ? (this.state.form.name.firstName +" "+ this.state.form.name.middleName +" "+ this.state.form.name.lastName) : null}</p>
            </div>

            <div>
                <p><strong>Email : </strong>{this.state.form !== null ? (this.state.form.email) : null}</p>

            </div>

            <div>
                <p><strong>Username : </strong>{this.state.form !== null ? (this.state.form.userName) : null}</p>

            </div>

            <div>
                <p><strong>Address : </strong>{this.state.form !== null ? (this.state.form.address.houseNo +" "+ this.state.form.address.city +" "+ this.state.form.address.pin) : null}</p>
            </div>
            </div>
        )
    }


    
}
export default Profile