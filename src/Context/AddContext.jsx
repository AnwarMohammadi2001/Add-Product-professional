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
    const savedCart = localStorage.getItem(`cart_${currentUser.name}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // --- PRODUCTS ---
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // slider image
  const [sliderImage, setSliderImage] = useState([]);
  const [sliderLoading, setSliderLoading] = useState(true);

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
      const savedCart = localStorage.getItem(`cart_${currentUser.name}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [currentUser]);

  // --- Persist cart per user ---
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        `cart_${currentUser.name}`,
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
        const res = await fetch("http://localhost:5000/users");
        const result = await res.json();
        setUsers(result); // ✅ not result.users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUsers();
  }, []);
  // --- Fetch Slider image ---
  useEffect(() => {
    const fetchSliderImage = async () => {
      try {
        setUserLoading(true);
        const res = await fetch("http://localhost:5000/sliderImages");
        const result = await res.json();
        setSliderImage(result); // ✅ not result.users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setSliderLoading(false);
      }
    };
    fetchSliderImage();
  }, []);

  // --- AUTH FUNCTIONS ---
  const login = (email, password) => {
    // Find user with matching email AND password
    const foundUser = users.find(
      (u) => (u.email === email || u.name === email) && u.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      return { success: true, user: foundUser };
    }
    return { success: false, message: "Invalid email or password" };
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
  // --- Add User (Register) ---
  const addUser = async (newUser) => {
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const createdUser = await res.json();
      setUsers((prev) => [...prev, createdUser]);
      setCurrentUser(createdUser); // auto login after register
      return createdUser;
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  // Delete user
  // --- Delete user ---
  const deleteUser = async (id) => {
    try {
      // if deleting the logged-in user
      if (currentUser && currentUser.id === id) {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete your account? This will also remove your cart and log you out."
        );
        if (!confirmDelete) return; // stop if user disagrees

        // delete request to json-server
        await fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        });

        // remove from state
        setUsers((prev) => prev.filter((u) => u.id !== id));

        // clear localStorage (user + cart)
        localStorage.removeItem("currentUser");
        localStorage.removeItem(`cart_${currentUser.name}`);

        // logout & reset cart
        setCurrentUser(null);
        setCartItems([]);
      } else {
        // deleting another user (admin case)
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this user?"
        );
        if (!confirmDelete) return;

        await fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        });

        setUsers((prev) => prev.filter((u) => u.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  // Update user
  const updateUser = async (id, updatedUser) => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      const data = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
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
    addUser,
    deleteUser,
    updateUser,
    sliderImage,
    sliderLoading,
  };

  return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
};

export default AddProvider;
