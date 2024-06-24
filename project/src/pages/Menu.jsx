import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMenuData } from "../slice/MenuSlice";
import "../styles/Menu.css";
import { addItem } from "../slice/CartSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const { menuData, error, status } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    const { id, name, imageUrl, unitPrice } = item;
    console.log("Adding to cart:", item);
    dispatch(addItem({ id, name, imageUrl, unitPrice }));
  };

  return (
    <div>
      <h2>Menu</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && menuData && menuData.data ? (
        <ul>
          {menuData.data.map((item) => (
            <li key={item.id}>
              <Link to={`/menu/${item.id}`} className="menu-item-link">
                <img src={item.imageUrl} alt={item.name} />
              </Link>
              <div>
                <p>{item.name}</p>
                <p>Ingredients: {item.ingredients.join(", ")}</p>
                <p>Price: ${item.unitPrice}</p>
                {item.soldOut ? (
                  <p>Sold Out</p>
                ) : (
                  <button onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No menu data</p>
      )}
    </div>
  );
};

export default Menu;