import { useDispatch } from "react-redux";
import { removeItem, incrementItem, decrementItem } from "../slice/CartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <li key={item.id}>
      <div>
        <img src={item.imageUrl} alt={item.name} />
        <div>
          <p>{item.name}</p>
          <p>Price: ${item.unitPrice}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
        <div>
          <button onClick={() => dispatch(incrementItem(item.id))}>+</button>
          <button onClick={() => dispatch(decrementItem(item.id))}>-</button>
          <button onClick={() => handleRemoveItem(item.id)}>remove</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
