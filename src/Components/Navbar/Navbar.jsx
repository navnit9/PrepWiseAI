import './Navbar.css'

function Navbar(){

    return( <nav className="navbar">

                <div className="logo">
                    <h2 className="brandname">PrepWise &nbsp;
                        <span className="ai-text">Ai</span> 
                        <span className="dot-text"></span>
                    </h2>
                </div>
                <div className="navbar-links">
                    <ul>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">How It Works</a></li>
                        <li><a href="#">Mock Tests</a></li>
                        <li><a href="#">AI Interview</a></li>
                    </ul>
                </div>
                <div className="loginbtn">
                    <button className="login-btn">Login</button>
                    <button className="signup-btn">Let's Get Started</button>
                </div>

            </nav>)

}
export default Navbar