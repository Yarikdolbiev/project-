import { useDispatch } from "react-redux";
import { removeItem, incrementItem, decrementItem } from "../slice/CartSlice";
import "../styles/Menu.css"; // Import your CSS file for CartItem styling

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementItem(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementItem(itemId));
  };

  // Calculate total cost for this item
  const totalCost = item.unitPrice * item.quantity;

  return (
    <li className="cart-item" key={item.id}>
      <div className="item-details">
        <img src={item.imageUrl} alt={item.name} />
        <div>
          <p>{item.name}</p>
          <p>Price: ${item.unitPrice}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Total: ${totalCost.toFixed(2)}</p> {/* Display total cost for this item */}
        </div>
        <div className="item-actions">
          <button onClick={() => handleIncrement(item.id)}>+</button>
          <button onClick={() => handleDecrement(item.id)}>-</button>
          <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
