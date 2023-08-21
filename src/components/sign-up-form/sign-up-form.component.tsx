import { useState, FormEvent, ChangeEvent } from 'react';

import { createAuthUserWithEmailAndPassword } from '../../network/firebase/firebase.auth';
import { createUserAccountFromAuthResponse } from '../../network/firebase/firebase.firestore';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignUpContainer } from './sign-up-form.styles';
import { AuthError, AuthErrorCodes, UserCredential } from 'firebase/auth';

const defaultFormInputValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formInputValues, setFormInputValues] = useState(
    defaultFormInputValues
  );

  const { displayName, email, password, confirmPassword } = formInputValues;

  const resetFormInputs = () => {
    setFormInputValues(defaultFormInputValues);
  };

  const handleFormInputUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInputValues({ ...formInputValues, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response: UserCredential | undefined = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserAccountFromAuthResponse(response?.user!, { displayName });
      resetFormInputs();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('User already exists!');
      } else {
        console.log('Error creating auth user!', error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password.</span>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleFormInputUpdate}
        />

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

        <FormInput
          label="Confirm Password"
          required
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleFormInputUpdate}
        />

        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type="submit">
          Create Account
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
