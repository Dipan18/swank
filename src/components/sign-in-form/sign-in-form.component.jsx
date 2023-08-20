import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../network/firebase/firebase.auth';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormInputValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formInputValues, setFormInputValues] = useState(
    defaultFormInputValues
  );

  const { email, password } = formInputValues;

  const handleFormInputUpdate = (event) => {
    const { name, value } = event.target;

    setFormInputValues({ ...formInputValues, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        alert('Wrong email or password');
      } else {
        console.log('Error signing in.', error);
      }
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in using email and password.</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          name="email"
          value={email}
          onChange={handleFormInputUpdate}
        />

        <FormInput
          label="Password"
          required
          type="password"
          name="password"
          value={password}
          onChange={handleFormInputUpdate}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
