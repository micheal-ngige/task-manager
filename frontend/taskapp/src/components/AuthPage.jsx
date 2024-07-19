import React, { useState } from "react";
import SignIn from "./Signin";
import SignUp from "./Signup";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    navigate("/tasks");
  };

  const handleSignUpSuccess = () => {
    setIsSignIn(true); 
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          {isSignIn ? (
            <>
              <h2>Sign In</h2>
              <SignIn onSuccess={handleSignInSuccess} />
              <p>
                Don't have an account?{" "}
                <Button variant="link" onClick={() => setIsSignIn(false)}>
                  Sign Up
                </Button>
              </p>
            </>
          ) : (
            <>
              <h2>Sign Up</h2>
              <SignUp onSuccess={handleSignUpSuccess} />
              <p>
                Already have an account?{" "}
                <Button variant="link" onClick={() => setIsSignIn(true)}>
                  Sign In
                </Button>
              </p>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthPage;
