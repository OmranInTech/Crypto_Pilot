import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../redux/hooks";
import { loginUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.detail || "Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F6F9] p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Sign In</h1>
        {error && <p className="mb-4 text-center text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <button type="submit" className="w-full bg-[#4F6EF7] text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition">Sign In</button>
        </form>
        <p className="mt-4 text-center text-sm">New here? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
      </motion.div>
    </div>
  );
};

export default SignIn;