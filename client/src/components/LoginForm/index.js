import React, { useState } from "react";
import { Container, Row, Col } from '../../components/Grid';

function SignupForm() {
    const [userObject, setuserObject] = useState({
        email: "",
        password: "",
        redirectTo: ""
      })

    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setuserObject({
            ...userObject,
            [name]: value
        })
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        if (userObject.email && userObject.password) {
            API.saveUser({
               
                email: userObject.email,
                password: userObject.password
            })
                .then(() => setuserObject({
                    redirectTo: "'/"
                }))
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="login">
        <Container className="zindex1">
          <Row className="zindex1">
            <Col className="zindex1" size="md-3"></Col>
            <Col className="zindex1" size="md-6">
              <Card className="zindex1" title="Register for mycookbook">
                <form className="zindex1" style={{marginTop: 10}}>
                  <h1>Register for mycookbook!</h1>
                  <label htmlFor="username">First name: </label>
                  
                  <label htmlFor="username">email: </label>
                  <Input
                    type="text"
                    name="email"
                    value={userObject.username}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Password: </label>
                  <Input
                    type="password"
                    name="password"
                    value={userObject.password}
                    onChange={handleChange}
                  />
                  
                  <Link to="/">Register</Link>
                  <FormBtn onClick={handleFormSubmit}>login</FormBtn>
                </form>
              </Card>
            </Col>
            <Col size="md-3"></Col>
          </Row>
        </Container>
        
        </div>
          )
}
export default SignupForm