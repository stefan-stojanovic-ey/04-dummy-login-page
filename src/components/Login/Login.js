import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const validEmail = enteredEmail.includes("@");
    const validPass = enteredPassword.length > 6;

    setFormIsValid(validEmail && validPass);
  }, [enteredEmail, enteredPassword]);

  // validacija email-a
  function validEmailCheck(val) {
    return val.includes("@");
  }

  // validacija password-a
  function validPassCheck(val) {
    return val > 6;
  }

  const emailChangeHandler = (e) => {
    const val = e.target.value;

    setEnteredEmail(val);
    setEmailIsValid(validEmailCheck(val));
  };

  const passwordChangeHandler = (e) => {
    const val = e.target.value;

    setEnteredPassword(val);
    setPasswordIsValid(validPassCheck(val));
  };

  const validateEmailHandler = () => {
    setEmailIsValid(validEmailCheck(enteredEmail));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
