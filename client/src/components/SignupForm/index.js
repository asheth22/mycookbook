import React, { useState } from "react";

function SignupForm() {
    const [userObject, setuserObject] = useState({
        firstName: "",
        lastName: "",
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
                firstName: userObject.firstName,
                lastName: userObject.lastName,
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
                  <Input
                    type="text"
                    name="firstName"
                    value={userObject.firstName}
                    onChange={handleChange}
                  />
                  <label htmlFor="username">Last name: </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={userObject.lastName}
                    onChange={handleChange}
                  />
                  <label htmlFor="username">Username: </label>
                  <Input
                    type="text"
                    name="username"
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
                  
                  <Link to="/">Login</Link>
                  <FormBtn onClick={handleFormSubmit}>Register</FormBtn>
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