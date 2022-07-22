import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  console.error("Component rendered...");

  useEffect(() => {
    console.log("useEffect runs...");
    const timerId = setTimeout(() => {
      console.warn("isFormValid state will update...");
      const validEmail = enteredEmail.includes("@");
      const validPass = enteredPassword.length > 6;

      setFormIsValid((prev) => {
        const val = validEmail && validPass;
        console.log(
          prev === val
            ? "No new formIsValid state changes"
            : `formIsValid state: ${prev} ---> ${val}`
        );
        return val;
      });
    }, 1000);

    // debounce cleanup fn
    return () => {
      console.log("Cleanup fn runs...");
      clearTimeout(timerId);
    };
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

    setEnteredEmail((prev) => {
      console.log(`enteredEmail state: ${prev} ---> ${val}`);
      return val;
    });

    setEmailIsValid((prev) => {
      const valid = validEmailCheck(val);
      console.log(
        prev === valid
          ? "No new emailIsValid state changes"
          : `emailIsValid state: ${prev} ---> ${valid}`
      );
      return valid;
    });
  };

  const passwordChangeHandler = (e) => {
    const val = e.target.value;

    setEnteredPassword((prev) => {
      console.log(`enteredPassword state: ${prev} ---> ${val}`);
      return val;
    });

    setPasswordIsValid((prev) => {
      const valid = validPassCheck(val);
      console.log(
        prev === valid
          ? "No new passwordIsValid state changes"
          : `passwordIsValid state: ${prev} ---> ${val}`
      );
      return valid;
    });
  };

  const validateEmailHandler = () => {
    setEmailIsValid((prev) => {
      const valid = validEmailCheck(enteredEmail);
      console.log(
        prev === valid
          ? "No new emailIsValid state changes"
          : `emailIsValid state: ${prev} ---> ${valid}`
      );
      return valid;
    });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid((prev) => {
      const valid = enteredPassword.trim().length > 6;
      console.log(
        prev === valid
          ? "No new passwordIsValid state changes"
          : `passwordIsValid state: ${prev} ---> ${valid}`
      );
      return valid;
    });
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
            !emailIsValid ? classes.invalid : ""
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
            !passwordIsValid ? classes.invalid : ""
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
