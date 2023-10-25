import { useState } from "react";
import { AddCategory, GifGrid } from "./components";

const GifExpertApp = () => {
  const [categories, setCategories] = useState(["Dragon Ball"]);

  const onAddCategory = (newCategory) => {
    //No se puede mutar (editar directamente) categories del Hook
    // const updatedCategories = [...categories, newCategory];

    // setCategories(updatedCategories);

    // setCategories(cat => [...cat, newCategory]);

    if (!categories.includes(newCategory)) {
      setCategories([newCategory]);
    }
  };

  return (
    <>
      <h1>GifExpertApp</h1>

      <AddCategory
        // setCategories={ setCategories }
        onNewCategory={onAddCategory}
      />

      {categories.map((category) => (
        <GifGrid key={category} category={category} />
      ))}
    </>
  );
};

export default GifExpertApp;
