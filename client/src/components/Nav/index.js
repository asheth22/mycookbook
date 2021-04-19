import React, { Fragment } from "react";
import "./style.css";
import image from '../../assets/computerChefLogo.png';

// function Nav(props) {
//   return (
//     <nav className="navbar navbar-dark bg-dark">
//       <a className="navbar-brand" href="/">
//         React Recipes
//       </a>
//     </nav>
    
// }
const Nav = (props) => {
  let greeting;

  // if (props.user === null) {
	// 	greeting = <p>Hello guest</p>
	// } else if (props.user.firstName) {
	// 	greeting = (
	// 		<Fragment>
	// 			Welcome, <strong>{props.user.firstName}</strong>
	// 		</Fragment>
	// 	)
	// } else if (props.user.username) {
	// 	greeting = (
	// 		<Fragment>
	// 			Welcome, <strong>{props.user.username} </strong>
	// 		</Fragment>
	// 	)
  // }
  
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/"><img src={image} height="80px" width="80px" alt=""/></a>
      
      <div className="collapse navbar-collapse mynavbar" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/favoriterecipes">My Recipes</a>
          </li>
        
        </ul>
        <div className="float-right">
          {greeting}&emsp;&emsp;  
          <a href="/" className="logout" onClick={props.logout}>Logout</a>
        </div>
      </div>
    </nav>    
  )
};
export default Nav;
