import { useState, ChangeEvent, FormEvent } from 'react';

import { AuthError, AuthErrorCodes } from 'firebase/auth';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../network/firebase/firebase.auth';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
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

  const handleFormInputUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormInputValues({ ...formInputValues, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      if (
        (error as AuthError).code === AuthErrorCodes.NULL_USER ||
        (error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD
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
            type='button'
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
