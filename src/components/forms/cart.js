import axios from 'axios';
import { useContext, createContext } from 'react';
import useSWR, { mutate } from 'swr';
import useLocalStorage from '../hooks/useLocalStorage';

// TODO: add toasts or other interactivity after record successfully created/deleted/modified

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext);
};

const getCartAPI = 'api/protected/cart/get-cart-info';
const addToCartAPI = 'api/protected/cart/add-to-cart';
const deleteTransactionsAPI = 'api/protected/cart/delete-transaction';

// const postFetch = (api, data) => axios.post(api, data).then(res => res)

export const getCart = () => {
  const getFetch = api => axios.get(api).then(res => res);

  return [getCartAPI, getFetch];
};

export const removeFromCart = async id => {
  try {
    // send id as a list of ids to delete
    var idList = [];
    if (typeof id === 'string') {
      idList = [id];
    }
    if (Array.isArray(id)) {
      idList = id;
    }

    const res = await axios.post(deleteTransactionsAPI, { id: idList });
    if (res.data.success === true) {
      // TODO: add optimistic data
      mutate(getCartAPI);
    }
  } catch (err) {
    alert(err.message);
  }
};

export const addToCart = async transactions => {
  const res = await axios.post(addToCartAPI, { data: transactions });
  if (!res.ok) {
    console.log('Something went wrong');
  }
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

  const updateCartItem = transaction => {
    // TODO: feature
  };

  const getCart = () => {
    return [getCartAPI, getFetch];
  };

  const removeFromCart = async id => {
    try {
      // send id as a list of ids to delete
      var idList = [];
      if (typeof id === 'string') {
        idList = [id];
      }
      if (Array.isArray(id)) {
        idList = id;
      }

      const res = await axios.post(deleteTransactionsAPI, { id: idList });
      if (res.data.success === true) {
        // TODO: add optimistic data
        mutate(getCartAPI);
      }
    } catch (err) {
      alert(err.message);
    }
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

  const removeProjectFromCart = id => {
    if (id) {
    }
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    var total = {};
    var totalPrice = 0;
    var totalCredits = 0;
    cartItems.forEach(item => {});
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
        getCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
