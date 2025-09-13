import { createContext, useEffect, useState } from "react";

export const AddContext = createContext();

const AddProvider = ({ children }) => {
  // --- USERS & AUTH ---
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // --- CART ---
  const [cartItems, setCartItems] = useState(() => {
    if (!currentUser) return [];
    const savedCart = localStorage.getItem(`cart_${currentUser.username}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // --- PRODUCTS ---
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- DARK MODE ---
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // --- Persist DARK MODE ---
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // --- Persist current user ---
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    // load user's cart on login
    if (currentUser) {
      const savedCart = localStorage.getItem(`cart_${currentUser.username}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [currentUser]);

  // --- Persist cart per user ---
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        `cart_${currentUser.username}`,
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, currentUser]);

  // --- Fetch Products ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Fetch Users ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUserLoading(true);
        const res = await fetch("https://dummyjson.com/users");
        const result = await res.json();
        setUsers(result.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // --- AUTH FUNCTIONS ---
  const login = (usernameOrEmail) => {
    const foundUser = users.find(
      (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
    );
    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCartItems([]);
  };

  // --- CART FUNCTIONS ---
  const addToCart = (product, redirectToLogin) => {
    if (!currentUser) {
      if (redirectToLogin) redirectToLogin();
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const increaseQuantity = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQuantity = (id) =>
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );

  const clearCart = () => setCartItems([]);

  // --- PROVIDE VALUES ---
  const value = {
    data,
    loading,
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    darkMode,
    toggleDarkMode: () => setDarkMode((prev) => !prev),
    users,
    userLoading,
    currentUser,
    login,
    logout,
  };

  return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
};

export default AddProvider;
