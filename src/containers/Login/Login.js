import React, { Component } from 'react'
import axios from '../../axios'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import * as cartActions from '../../store/actions/cart'

class Login extends Component {
    

    onSubmitHandler = (event) => {
        event.preventDefault()
        let form = {

            "userName": null,
            "password": null,

        }
        form.userName = document.getElementById('un').value
        form.password = document.getElementById('password').value

        axios.post('/users/login', form)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                this.setState({})
            })
            .catch(err => {
                console.log(err)
            })

            this.props.onChangeRedirect()

    }

  

    render() {
        console.log("ren")
        return (
            <div>
                <h4>Login</h4>
                {localStorage.getItem('token') !== null ? <Redirect to="/products" /> : null}
                <form id='form'>
                    <div>
                        <label>Username</label>
                        <input id='un' type={"text"} />
                    </div>

                    <div>
                        <label>Password</label>
                        <input id='password' type={"password"} />
                    </div>
                    <button type={'submit'} onClick={(event) => this.onSubmitHandler(event)}>Submit</button>

                </form>
            </div>
        )
    }

}

const mapStateToProps = state =>{
    return {

        redirect : state.redirect
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onChangeRedirect : ()=>dispatch(cartActions.changeRedirect())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)