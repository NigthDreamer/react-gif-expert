/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/react";
import { AddCategory } from "../../src/components/AddCategory";

describe("Pruebas en AddCategory", () => {
  test("Debe de cambiar el valor de la caja de texto", () => {
    render(<AddCategory onNewCategory={() => {}} />);

    // screen.debug();
    const input = screen.getByRole("textbox");

    fireEvent.input(input, { target: { value: "Goku" } });

    expect(input.value).toBe("Goku");
  });

  test("Debe de llamar onNewCategory si el input tiene un valor", () => {
    const inputValue = "Goku";
    const onNewCategory = jest.fn();

    render(<AddCategory onNewCategory={onNewCategory} />);
    screen.debug();

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    expect(input.value).toBe("");

    expect(onNewCategory).toHaveBeenCalled();
    expect(onNewCategory).toHaveBeenCalledTimes(1);
    /**
     * Esto comprueba que el valor pasado al input (el primer fireEvent) y
     * con el cual se ejecuta el onSubmit que ejecuta la funcion onNewCategory,
     * sea el valor de inputValue
     */
    expect(onNewCategory).toHaveBeenCalledWith(inputValue);
  });

  test("No debe de llamar el onNewCategory si el input está vacío", () => {
    const inputValue = "";
    const onNewCategory = jest.fn();

    render(<AddCategory onNewCategory={onNewCategory} />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form); //Se simula el submit cuando el usuario pulsa enter

    expect(input.value).toBe("");
    expect(onNewCategory).not.toHaveBeenCalled();
  });
});
