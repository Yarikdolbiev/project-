import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemsAsync } from "../slice/CartSlice";
import CartItem from "../components/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, [dispatch]);

  return (
    <div>
      <h2>Cart</h2>
      {status === "loading" && <p>Loading cart...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && cartItems && cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <CartItem key={`${item.id}-${index}`} item={item} />
          ))}
        </ul>
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  );
};

export default Cart;
