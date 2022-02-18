import { useState } from "react";
import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);
  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);
  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInput(isFiveChars);
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

let formIsValid=false;

if(nameIsValid && streetIsValid && postalIsValid && cityIsValid){
  formIsValid=true;
}

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      city: cityValue,
      postalCode: postalValue,
    });

    resetName();
    resetStreet();
    resetPostal();
    resetCity();
  };

  const nameControlClasses = `${classes.control} ${
    nameHasError ? classes.invalid: ""
  }`;
  const streetControlClasses = `${classes.control} ${
    streetHasError ? classes.invalid: ""
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    postalHasError ? classes.invalid: ""
  }`;
  const cityControlClasses = `${classes.control} ${
    cityHasError ? classes.invalid: ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Please enter a valid street!</p>}
      </div>

      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
