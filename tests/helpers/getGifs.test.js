/* eslint-disable no-undef */
import { getGifs } from "../../src/helpers/getGifs";

describe("Pruebas en getGifs()", () => {
  test("Debe de devolver un array de gifs", async () => {
    const gifs = await getGifs("Dragon Ball");

    expect(gifs.length).toBeGreaterThan(0);

    /**
     * Espera que el resultado sea un objeto con los siguiente
     * atributos
     */
    expect(gifs[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
    });
  });
});
