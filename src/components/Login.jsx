import React, { useState, useContext } from "react";
import { AddContext } from "../Context/AddContext";

const Login = ({ onClose }) => {
  const { login } = useContext(AddContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(form.email, form.password);
    if (res.success) {
      onClose(); // close modal on success
    } else {
      setError(res.message);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="email"
        placeholder="Email or Username"
        value={form.email}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
