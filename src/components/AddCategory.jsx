import { useState } from "react";
import PropTypes from "prop-types";

export const AddCategory = ({ onNewCategory }) => {
  //  Creo un Hook (una variable de estado)
  const [inputValue, setInputValue] = useState("");

  //  Seteo el Hook (la variable de estado) con el valor del input cuando cambie
  //  Desestructuro el event que me llega desde el onChange para sacar el value
  const onInputChanged = ({ target: { value } }) => {
    setInputValue(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newInputValue = inputValue.trim();

    if (newInputValue.length > 1) {
      //El set del Hook provee una funcion de callback con el valor del state
      // setCategories(categories => [...categories, inputValue]);
      setInputValue("");
      onNewCategory(newInputValue);
    }
  };

  return (
    <form onSubmit={onSubmit} aria-label="form">
      <input
        id="cat-inp"
        type="text"
        placeholder="Buscar gifs"
        value={inputValue}
        onChange={onInputChanged}
      />
    </form>
  );
};

//AddCategory.defaultProps = {
AddCategory.propTypes = {
  // setCategories: PropTypes.func.isRequired,
  onNewCategory: PropTypes.func.isRequired
};
