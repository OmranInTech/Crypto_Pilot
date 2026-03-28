import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../redux/hooks";
import { signupUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "", // Changed from 'name'
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await dispatch(signupUser(form)).unwrap();
      navigate("/signin");
    } catch (err: any) {
      // Handles Django's nested error objects
      setError(err.username?.[0] || err.email?.[0] || err.password?.[0] || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F6F9] p-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Sign Up</h1>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full rounded-lg border p-3" required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full rounded-lg border p-3" required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full rounded-lg border p-3" required />
          <input type="password" name="password2" placeholder="Confirm Password" value={form.password2} onChange={handleChange} className="w-full rounded-lg border p-3" required />
          <button type="submit" className="w-full rounded-lg bg-[#4F6EF7] py-3 text-white font-semibold hover:bg-blue-600 transition">Create Account</button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;