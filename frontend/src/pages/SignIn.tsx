// File: src/pages/SignIn.tsx
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../redux/hooks";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const getMessage = (err: unknown) =>
    err instanceof Error ? err.message : "Login failed";

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await dispatch(
        loginUser({ email, password })
      ).unwrap();

      console.log("Login success:", result);
      // Redirect user after login
      navigate("/dashboard"); // replace with your private route
    } catch (err: unknown) {
      setError(getMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F6F9] p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Sign In
        </h1>

        {error && (
          <p className="mb-4 text-center text-red-500 font-medium">{error}</p>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#4F6EF7] py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-blue-500 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;