import React from 'react'
const { Redirect } = require("react-router-dom")

const authenticate =(Component)=>{
return class Wrap extends React.Component{
    render() {
        let token = localStorage.getItem('token')
        if(token === null)
        {
            return <Redirect to='/login'/>
        }
        return ( <Component></Component>)
    }
}
}

export default authenticate