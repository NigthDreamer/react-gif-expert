import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

describe("Pruebas en el hook useFetchGifs", () => {
  test("Debe de devolver el estado inicial", () => {
    /**
     * Como los hooks solo pueden ser llamados dentro de un functional component
     * tenemos que usar el renderHook de react testing library
     */
    const { result } = renderHook(() => useFetchGifs("Dragon Ball"));
    const { images, isLoading } = result.current;
    // console.log(images);

    expect(images.length).toBe(0);
    expect(isLoading).toBeTruthy();
  });

  test("Debe de devolver un array de imagenes y isLoading en false", async () => {
    const { result } = renderHook(() => useFetchGifs("Dragon Ball"));
    /**
     * Esto se espera hasta que se cumpla la condicion, y por lo tanto,
     * hasta que se recivan las imagenes (puede fallar por problemas de 
     * conectividad)
     */
    await waitFor(
      () => expect(result.current.images.length).toBeGreaterThan(0)
      // {
      //   timeout: 1000,
      // }
    );

    const { images, isLoading } = result.current;

    expect(images.length).toBeGreaterThan(0);
    expect(isLoading).toBeFalsy();
  });
});
