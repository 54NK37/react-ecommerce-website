import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import classes from './Profile.css'
import authenticate from '../../HOC/Auth'

const Profile = (props) => {

    const [profileForm, setProfileForm] = useState({
        name : {
            firstName : '',
            middleName : '',
            lastName : ''
        },
        email : '',
        userName : '',
        address : {
            houseNo :'',
            city : '',
            pin : 0
        }
    })
    

    useEffect(() => {
        let token = localStorage.getItem('token')
        // get user profile from server if logged in
        axios.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
                console.log(res.data)
                setProfileForm(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <div className={classes.Profile}>
            <h4 style={{ 'color': 'Blue' }}>My Profile</h4>
            <hr />
            <div>
                <label><strong>Name : </strong></label>  <p>{profileForm !== null ? (profileForm.name.firstName + " " + profileForm.name.middleName + " " + profileForm.name.lastName) : null}</p>
            </div>

            <div>
                <label><strong>Email : </strong></label> <p> {profileForm !== null ? (profileForm.email) : null}</p>

            </div>

            <div>
                <label><strong>Username : </strong></label><p>  {profileForm !== null ? (profileForm.userName) : null}</p>

            </div>

            <div>
                <label><strong>Address : </strong></label><p>  {profileForm !== null ? (profileForm.address.houseNo + " " + profileForm.address.city + " " + profileForm.address.pin) : null}</p>
            </div>

        </div>
    )

}
export default authenticate(Profile)