import { NavigationContainer } from "@react-navigation/native";
import { render, userEvent } from "@testing-library/react-native";

import axios from "axios";
import React from "react";
import LoginForm from "../components/account/LoginForm";
jest.mock('axios');

const setup = () => {
  const user = userEvent.setup();

  const utils = render(
    <NavigationContainer>
      <LoginForm />
    </NavigationContainer>
  );

  const emailInput = utils.getByPlaceholderText("Correo Electrónico");
  const passwordInput = utils.getByPlaceholderText("Contraseña");
  const loginButton = utils.getByText("Iniciar Sesión");


  return {
    user,
    emailInput,
    passwordInput,
    loginButton,
    ...utils,
  }
}

describe('LoginForm', () => {

  // Renders the login form with email and password inputs and a login button
  it('should render the login form with email and password inputs and a login button', () => {
    const { emailInput, passwordInput, loginButton } = setup();

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  // Allows the user to input their email and password
  it('should allow the user to input their email and password', async () => {
    const { emailInput, passwordInput, getByDisplayValue, user } = setup();

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(await getByDisplayValue("test@example.com")).toBeTruthy()
    expect(await getByDisplayValue("password123")).toBeTruthy()

  });

  // Validates the email and password inputs
  it('should validate the email and password inputs', async () => {
    const { emailInput, passwordInput, loginButton, getByText, user } = setup();

    await user.type(emailInput, "invalidemail");
    await user.type(passwordInput, "");
    await user.press(loginButton);

    const emailError = getByText("Debes de ingresar un email válido.");
    const passwordError = getByText("Debes de ingresar tu contraseña.");

    expect(emailError).toBeTruthy();
    expect(passwordError).toBeTruthy();
  });

  // Displays an error message if the login request fails
  it('should display an error message if the login request fails', async () => {
    const { emailInput, passwordInput, loginButton, getByText, user } = setup();

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.press(loginButton);

    axios.post.mockRejectedValueOnce(new Error("Login failed"));

    const errorMessage = getByText("Login failed");

    expect(errorMessage).toBeTruthy();
  });

  // Does not allow the user to submit the form if the email or password inputs are empty
  it('should not allow the user to submit the form if the email or password inputs are empty', async () => {
    const { emailInput, passwordInput, loginButton, user, getByText } = setup();

    await user.type(emailInput, "");
    await user.type(passwordInput, "");

    await user.press(loginButton);

    const emailError = getByText("Debes de ingresar un email válido.");
    const passwordError = getByText("Debes de ingresar tu contraseña.");

    expect(emailError).toBeTruthy();
    expect(passwordError).toBeTruthy();
  });

  // Does not allow the user to submit the form if the email input is not a valid email address
  it('should not allow the user to submit the form if the email input is not a valid email address', async () => {
    const { emailInput, passwordInput, loginButton, user, getByText } = setup();

    await user.type(emailInput, "invalidemail");
    await user.type(passwordInput, "password123");

    await user.press(loginButton);

    const emailError = getByText("Debes de ingresar un email válido.");

    expect(emailError).toBeTruthy();
  });
});

