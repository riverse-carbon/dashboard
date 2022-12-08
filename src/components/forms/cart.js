import axios from 'axios';
import { useContext, createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  // TODO: add corresponding api call to db

  // add link to project!!! + projectId(name) + transaction id/details
  const addToCart = project => {
    const currentCart = [...cartItems];
    const sameProject = currentCart.find(node => node.id === project.id);
    if (sameProject) {
      sameProject.transactions.push(...project.transactions);
    } else {
      currentCart.push(project);
    }
    setCartItems(currentCart);
  };
  console.log(cartItems);
  const updateCartItem = transaction => {
    // TODO
  };

  const removeFromCart = (projectId, transactionId) => {
    const updatedCart = [...cartItems];
    const project = updatedCart.find(pr => pr.projectId === projectId);
    project.transactions = project.transactions.filter(transaction => transaction.id !== transactionId);

    setCartItems(updatedCart);
  };

  const validateCart = async () => {
    try {
      const api = '/api/protected/validate-cart';
      const res = await axios.post(api, { data: cartItems });
      return res.data;
    } catch (err) {
      alert(err.message);
    }
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    var total = {};
    var totalPrice = 0;
    var totalCredits = 0;
    // cartItems.forEach(item => {})
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        validateCart,
        emptyCart,
        getTotal,
        cartItems,
      }}>
      {children}
    </CartContext.Provider>
  );
};
