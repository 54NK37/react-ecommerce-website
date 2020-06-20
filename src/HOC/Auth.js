import React from 'react'
const { Redirect } = require("react-router-dom")

const authenticate =(CustomComponent)=>{
return class Wrap extends React.Component{
    render() {
        // secure routes based on token
        let token = localStorage.getItem('token')
        if(token === null)
        {
            return <Redirect to='/login'/>
        }
        return ( <CustomComponent {...this.props} />)
    }
}
}

export default authenticate