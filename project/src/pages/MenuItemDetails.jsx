import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import "../styles/MenuItemDetails.css";

const MenuItemDetails = () => {
  const { id } = useParams();
  const { menuData } = useSelector((state) => state.menu);
  const pizza = menuData.data.find((item) => item.id === parseInt(id));

  if (!pizza) {
    return <p>Pizza not found</p>;
  }

  return (
    <div>
      <h2>{pizza.name}</h2>
      <img src={pizza.imageUrl} alt={pizza.name} />
      <p>Ingredients: {pizza.ingredients.join(", ")}</p>
      <p>Price: ${pizza.unitPrice}</p>
    </div>
  );
};

export default MenuItemDetails;