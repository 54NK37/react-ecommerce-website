import React, { Component } from 'react'
import axios from '../../axios'
import classes from './Profile.css'

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
                this.setState({ form: res.data })
                console.log(this.state.form)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className={classes.Profile}>
                    <h4 style={{'color' : 'Blue'}}>My Profile</h4>
                    <hr/>
                    <div>
                        <label><strong>Name : </strong></label>  <p>{this.state.form !== null ? (this.state.form.name.firstName + " " + this.state.form.name.middleName + " " + this.state.form.name.lastName) : null}</p>
                    </div>

                    <div>
                        <label><strong>Email : </strong></label> <p> {this.state.form !== null ? (this.state.form.email) : null}</p>

                    </div>

                    <div>
                        <label><strong>Username : </strong></label><p>  {this.state.form !== null ? (this.state.form.userName) : null}</p>

                    </div>

                    <div>
                        <label><strong>Address : </strong></label><p>  {this.state.form !== null ? (this.state.form.address.houseNo + " " + this.state.form.address.city + " " + this.state.form.address.pin) : null}</p>
                    </div>

            </div>
        )
    }



}
export default Profile