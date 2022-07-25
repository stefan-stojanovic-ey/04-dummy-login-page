import React, { useEffect, useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

function emailReducer(state, action) {
  if (action.type === "USER_INPUT_EMAIL")
    return { value: action.payload, isValid: validEmailCheck(action.payload) };

  if (action.type === "INPUT_BLUR") {
    return { ...state, isValid: validEmailCheck(state.value) };
  }
}

function passwordReducer(state, action) {
  switch (action.type) {
    case "USER_INPUT_PASS":
      return { value: action.payload, isValid: validPassCheck(action.payload) };
    case "INPUT_BLUR":
      return { ...state, isValid: validPassCheck(state.value) };
    default:
      return state;
  }
}

// validacija email-a
function validEmailCheck(val) {
  return val.includes("@");
}

// validacija password-a
function validPassCheck(val) {
  return val.trim().length > 6;
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState(true);
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: true,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: true,
  });

  console.error("Component rendered...");

  const { isValid: isEmailValid } = emailState;
  const { isValid: isPassValid } = passwordState;

  useEffect(() => {
    console.log("useEffect runs...");
    const timerId = setTimeout(() => {
      console.warn("isFormValid state will update...");
      // // ovo moze da se popravi, ako su pocetni isValid = true
      // dugme Login moze da se klikne
      // za sada, provericu svaki input sa inputCheck funkcijama
      // const validEmail = emailState.isValid;
      // const validPass = passwordState.isValid;
      const validEmail = validEmailCheck(emailState.value);
      const validPass = validPassCheck(passwordState.value);

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
  }, [isEmailValid, isPassValid]);

  const emailChangeHandler = (e) => {
    const val = e.target.value;

    dispatchEmail({
      type: "USER_INPUT_EMAIL",
      payload: val,
    });

    // setEnteredEmail((prev) => {
    //   console.log(`enteredEmail state: ${prev} ---> ${val}`);
    //   return val;
    // });

    // setEmailIsValid((prev) => {
    //   const valid = validEmailCheck(val);
    //   console.log(
    //     prev === valid
    //       ? "No new emailIsValid state changes"
    //       : `emailIsValid state: ${prev} ---> ${valid}`
    //   );
    //   return valid;
    // });
  };

  const passwordChangeHandler = (e) => {
    const val = e.target.value;

    dispatchPassword({
      type: "USER_INPUT_PASS",
      payload: val,
    });
    // setEnteredPassword((prev) => {
    //   console.log(`enteredPassword state: ${prev} ---> ${val}`);
    //   return val;
    // });

    // setPasswordIsValid((prev) => {
    //   const valid = validPassCheck(val);
    //   console.log(
    //     prev === valid
    //       ? "No new passwordIsValid state changes"
    //       : `passwordIsValid state: ${prev} ---> ${val}`
    //   );
    //   return valid;
    // });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "INPUT_BLUR",
    });

    // setEmailIsValid((prev) => {
    //   const valid = validEmailCheck(emailState.value);
    //   console.log(
    //     prev === valid
    //       ? "No new emailIsValid state changes"
    //       : `emailIsValid state: ${prev} ---> ${valid}`
    //   );
    //   return valid;
    // });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "INPUT_BLUR",
    });
    // setPasswordIsValid((prev) => {
    //   const valid = enteredPassword.trim().length > 6;
    //   console.log(
    //     prev === valid
    //       ? "No new passwordIsValid state changes"
    //       : `passwordIsValid state: ${prev} ---> ${valid}`
    //   );
    //   return valid;
    // });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            !emailState.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            !passwordState.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
