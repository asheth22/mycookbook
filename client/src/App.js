import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Jumbotron from "./components/Jumbotron";
import AUTH from './utils/AUTH';
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import { RecipeList, RecipeListItem } from "./components/RecipeList";
import { Container, Row, Col } from "./components/Grid";

function App() {

  const [recipes, setRecipes] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState("");
  const [userState, setuserState] = useState({
    loggedIn: false,
    user: null
  });

  const handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { value } = event.target;
    setRecipeSearch(value);
  };

  const handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getRecipes(recipeSearch)
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  };
  useEffect() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}
  logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			console.log('successfully logged out!');
			console.log(response.status);
			if (response.status === 200) {
			  setuserState({
          loggedIn: false,
          user: null
        })
			}

		});
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        // update the state
        setuserState({
          loggedIn: true,
          user: response.data.user
        })
      } 
    });

  return (
    <div>
      <Nav />
      <Jumbotron />
      <Container>
        <Row>
          <Col size="xs-12 md-5" id="searchHistory">
          <h3 className='text-left'> Search History </h3>
          </Col>
          <Col size="xs-12 md-6">
          <Row> 
          <h3 className='text-center'> New Recipe Search </h3>
          <Input
                      name="RecipeSearch"
                      value={recipeSearch}
                      onChange={handleInputChange}
                      placeholder="Search For a Recipe"
            />
          <Button
                      onClick={handleFormSubmit}
                      type="success"
                      className="input-lg"
                    >
                Search
          </Button>
          </Row>
            <Row>
            <Col size="xs-12` sm-10">
            {!recipes.length ? (
              <h1 className="text-center"> No Recipes to Display</h1>
            ) : (
              <RecipeList>
                {recipes.map(recipe => {
                  return (
                    <RecipeListItem
                      key={recipe.title}
                      title={recipe.title}
                      href={recipe.href}
                      ingredients={recipe.ingredients}
                      thumbnail={recipe.thumbnail}
                    />
                  );
                })}
              </RecipeList>
            )}
          </Col>
            </Row>   
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
