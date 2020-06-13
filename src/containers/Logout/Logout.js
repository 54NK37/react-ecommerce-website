import React, { Component } from 'react'
import axios from '../../axios'
import { withRouter } from 'react-router-dom'
// import classes from 'react-confirm-alert/src/react-confirm-alert.css'


class Logout extends Component {
    yesHandler = () => {
        let token = localStorage.getItem('token')
        axios.post('/users/logoutAll',null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log('Logged out from all device');
            console.log(res.data)
            localStorage.removeItem('token')
         this.props.history.push('/products')


        })
            .catch(err => {
                console.log(err)
            })
    }

    noHandler = () => {
        let token = localStorage.getItem('token')
        axios.post('/users/logout', null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log('Logged out from this device');
            console.log(res.data)
            localStorage.removeItem('token')
         this.props.history.push('/products')

        })
            .catch(err => {
                console.log(err)
            });
    }

    cancelHandler = ()=>{
        this.props.history.push('/products')
    }
    render() {
        return (
            <div>
                <h3>Logging you out from this device</h3>
                <p>Do you also want to logout from all devices ?</p>
                <button onClick={this.yesHandler}>Yes</button>
                <button onClick={this.noHandler}>No</button>
                <button onClick={this.cancelHandler}>Cancel Logout</button>
            </div>
        )
    }



}

export default withRouter(Logout)