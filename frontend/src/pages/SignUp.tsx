// File: src/pages/SignUp.tsx
import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../redux/hooks";
import { signupUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  password2: string; // confirmation password
}

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    try {
      const result = await dispatch(
        signupUser({
          name: form.name,
          email: form.email,
          password: form.password,
          password2: form.password2,
        })
      ).unwrap();

      console.log("Signup success:", result);
      navigate("/signin"); // redirect after successful signup
    } catch (err: any) {
      setError(err.detail || "Signup failed");
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
          Sign Up
        </h1>

        {error && (
          <p className="mb-4 text-center text-red-500 font-medium">{error}</p>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
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
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              value={form.password2}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#4F6EF7] py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-medium text-blue-500 hover:underline"
          >
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;