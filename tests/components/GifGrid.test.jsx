import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

//Crea un mock de todas las funciones dentro de este modulo
jest.mock("../../src/hooks/useFetchGifs");

describe("Pruebas en <GifGrid/>", () => {
  const category = "Dragon Ball";

  test("Debe de mostrar el loading inicialmente", () => {
    /**
     * Dado que el componente GifGrid usa la funcion useFetchGifs, ésta devolverá
     * los siguientes valores mockeados al ser llamada
     */
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid category={category} />);

    expect(screen.getByText("Cargando..."));
    expect(screen.getByText(category));
  });

  test("Debe de mostrar items cuando se cargan las imágenes useFetchGifs", () => {
    const gifs = [
      {
        id: "ABC",
        title: "Goku",
        url: "https://localhost/goku.jpg",
      },
      {
        id: "123",
        title: "Yamcha",
        url: "https://localhost/yamcha.jpg",
      },
    ];

    /**
     * Dado que el componente GifGrid usa la funcion useFetchGifs, ésta devolverá
     * los siguientes valores mockeados al ser llamada
     * 
     * Notese que gifs es una variable que hemos declarado previamente en este test
     */
    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: false,
    });

    /**
     * Para obtener ayuda de las funciones del mock de useFetchGifs que pueden ser 
     * llamadas, hacer un console log del mismo
     */
    // console.log(useFetchGifs);

    render(<GifGrid category={category} />);

    screen.debug();

    expect(screen.getAllByRole("img").length).toBe(2);
  });
});
