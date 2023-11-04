import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GifExpertApp from "../src/GifExpertApp";

describe("Pruebas en <GifExpertApp/>", () => {
  test("Debe de hacer match con el snapshot", () => {
    const { container } = render(<GifExpertApp />);

    expect(container).toMatchSnapshot();
  });

  test("Al iniciar la aplicacion, se cargan las imagenes por defecto y se muestran", async () => {
    render(<GifExpertApp />);

    await waitFor(() =>
      expect(screen.getAllByRole("img").length).toBeGreaterThan(0)
    );

    const images = screen.getAllByRole("img");

    expect(images.length).toBeGreaterThan(0);
  });

  test("Al hacer submit de un nuevo valor en el input, se cargan las nuevas imagenes", async () => {
    render(<GifExpertApp />);

    await waitFor(() =>
      expect(screen.getAllByRole("img").length).toBeGreaterThan(0)
    );

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    const newCategory = "Juego de Tronos";
    const oldImages = screen.getAllByRole("img");

    //Meto el valor en el input para setear el valor del formulario
    fireEvent.input(input, { target: { value: newCategory } });
    //Submiteo el valor del formulario para triggerear el hook y cargar las imagenes
    fireEvent.submit(form);

    await waitFor(() =>
      expect(screen.getAllByRole("img").length).toBeGreaterThan(0)
    );

    const newImages = screen.getAllByRole("img");

    expect(oldImages).not.toEqual(newImages);
  });
});
