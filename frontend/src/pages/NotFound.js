import React from 'react'
import {Link} from 'react-router-dom'

function NotFound() {
  return (
    <div>
        <div id="auth-container">
            <h1 >Ooops!</h1>
                <h3>404-Page not found</h3>
                <p>Go to the Home page and try to check your browser internet connection and make sure your account is not blocked 
                    contact us: 0766298542 
                </p>
              <Link to="/" >
              <button className="btn-go-to-login">Go to Home</button></Link>  
        </div>
    </div>
  )
}

export default NotFound