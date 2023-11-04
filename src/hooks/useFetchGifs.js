import { useEffect, useState } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = async () => {
    const newImages = await getGifs(category);
    console.log(newImages);
    /**
     * En React 18, esto no dispara dos renderizaciones, solo una,
     * puesto que se espera a que se termine toda la funcion para
     * volver a renderizar el componente
     */
    setImages(newImages);
    setIsLoading(false);
  };

  /**
   * Este hook carga los datos cuando el componente se
   * renderiza por primera vez y no más veces si otro 
   * componente de React dispara una renderizacion. Para que
   * lo haga mas veces de forma intencionada hay que añadir la 
   * variable por la cual al cambiar el estado, se debe de volver a
   * renderizar el componente
   */
  useEffect(() => {
    getImages();
  }, []);

  //Si una propiedad se llama igual que la variable, se puede abreviar
  return {
    images,
    isLoading,
  };
};
