# React + Vite Shop Template

This project is a modern React e-commerce template built with Vite and Tailwind CSS, featuring a fully functional shopping cart, user authentication, and dark mode.
npx json-server --watch db.json --port 5000  

## Features
🛒 Shopping Cart

Add products to cart (requires login).

Increase or decrease item quantity.

Remove items or clear cart completely.

Each user's cart is saved individually in localStorage, persisting across page refreshes.

## 👤 User Authentication

Login with username or email.

Persistent login using localStorage.

Logout clears cart and session.

Fetches users from a dummy API (https://dummyjson.com/users) for testing.

## 🌙 Dark Mode

Toggle between light and dark mode.

Dark mode preference is saved in localStorage.

Fully compatible with Tailwind's dark mode utilities.

🛍 Products

Fetch products from a dummy API (https://fakestoreapi.com/products).

Display products in a responsive grid.

Each product card shows image, title, and price.

Users must be logged in to add products to the cart.

## ⚡ Modern UI

Responsive design using Tailwind CSS.

Floating labels for login input fields.

Animated buttons and hover effects for interactive experience.

Dark mode-compatible colors and shadows.

## 🧩 Technology Stack

React 18 with Vite for fast HMR.

Tailwind CSS for styling.

React Context API for global state management (cart, users, dark mode).

Framer Motion for animations.

React Icons for consistent UI icons.