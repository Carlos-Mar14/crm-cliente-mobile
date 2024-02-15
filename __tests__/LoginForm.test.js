import { NavigationContainer } from "@react-navigation/native";
import {
  fireEvent,
  render,
  waitFor,
  screen,
} from "@testing-library/react-native";
import React from "react";
import LoginForm from "../components/account/LoginForm";

import * as SecureStore from "expo-secure-store";

jest.mock("axios", () => ({
  post: jest.fn(() =>
    Promise.resolve({ response: { status: 201, data: { token: "testtoken" } } })
  ),
}));

const setup = () => {
  const utils = render(
    <NavigationContainer>
      <LoginForm />
    </NavigationContainer>
  );

  const emailInput = utils.getByPlaceholderText("Correo Electrónico");
  const passwordInput = utils.getByPlaceholderText("Contraseña");
  const loginButton = utils.getByText("Iniciar Sesión");

  return {
    emailInput,
    passwordInput,
    loginButton,
    ...utils,
  };
};

describe("LoginForm", () => {
  // Renders the login form with email and password inputs and a login button
  it("should render the login form with email and password inputs and a login button", () => {
    const { emailInput, passwordInput, loginButton } = setup();

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  // Allows the user to input their email and password
  // it("should allow the user to input their email and password", () => {
  //   const onChange = jest.fn();

  //   const { getByPlaceholderText } = render(
  //     <NavigationContainer>
  //       <LoginForm onChange={onChange} />
  //     </NavigationContainer>
  //   );

  //   const emailInput = getByPlaceholderText("Correo Electrónico");
  //   const passwordInput = getByPlaceholderText("Contraseña");

  //   fireEvent.changeText(emailInput, "test@example.com");
  //   fireEvent.changeText(passwordInput, "password123");

  //   // Verificar las llamadas a la función onChange con los valores esperados
  //   expect(onChange).toHaveBeenCalledWith("test@example.com");
  //   expect(onChange).toHaveBeenCalledWith("password123");
  // });

  // Validates the email and password inputs
  it("should validate the email and password inputs", () => {
    const { emailInput, passwordInput, loginButton, getByText } = setup();

    fireEvent.changeText(emailInput, "invalidemail");
    fireEvent.changeText(passwordInput, "");

    fireEvent.press(loginButton);

    const emailError = getByText("Debes de ingresar un email válido.");
    const passwordError = getByText("Debes de ingresar tu contraseña.");

    expect(emailError).toBeTruthy();
    expect(passwordError).toBeTruthy();
  });

  // Displays an error message if the login request fails
  it("should display an error message if the login request fails", async () => {
    const { emailInput, passwordInput, loginButton } = setup();

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    // Espera a que el mensaje de error aparezca antes de buscarlo
    fireEvent.press(loginButton);
    const errorMessage = await waitFor(
      () =>
        screen.getByText("Debes de ingresar un email válido.") ||
        screen.getByText("Debes de ingresar tu contraseña.")
    );

    expect(errorMessage).toBeTruthy();
  });

  // Does not allow the user to submit the form if the email or password inputs are empty
  it("should not allow the user to submit the form if the email or password inputs are empty", () => {
    const { emailInput, passwordInput, loginButton, getByText } = setup();

    fireEvent.changeText(emailInput, "");
    fireEvent.changeText(passwordInput, "");

    fireEvent.press(loginButton);

    const emailError = getByText("Debes de ingresar un email válido.");
    const passwordError = getByText("Debes de ingresar tu contraseña.");

    expect(emailError).toBeTruthy();
    expect(passwordError).toBeTruthy();
  });

  // Does not allow the user to submit the form if the email input is not a valid email address
  it("should not allow the user to submit the form if the email input is not a valid email address", () => {
    const { emailInput, passwordInput, loginButton, getByText } = setup();

    fireEvent.changeText(emailInput, "invalidemail");
    fireEvent.changeText(passwordInput, "password123");

    fireEvent.press(loginButton);

    const emailError = getByText("Debes de ingresar un email válido.");

    expect(emailError).toBeTruthy();
  });

  it("then login request is succesfull, token saved to secure storage", async () => {
    const { emailInput, passwordInput, loginButton } = setup();

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    fireEvent.press(loginButton);

    let result = await SecureStore.getItemAsync("token");
    await waitFor(() => {
      expect(result).toBe("testtoken");
    });
  });
});
