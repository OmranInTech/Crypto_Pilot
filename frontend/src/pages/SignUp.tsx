import { useState, FormEvent, ChangeEvent } from "react";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [form, setForm] = useState<SignUpForm>({ name: "", email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    alert(`Account created for ${form.name} (${form.email})`);
    // Implement real signup logic here
  };

  return (
    <div className="min-h-screen bg-[#F3F6F9] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md animate-slideUp">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4F6EF7] hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 font-medium hover:underline">Sign In</a>
        </p>
      </div>

      <style>{`
        @keyframes slideUp { 0% { opacity:0; transform: translateY(20px);} 100%{opacity:1; transform:translateY(0);} }
        .animate-slideUp { animation: slideUp 0.6s ease forwards; }
      `}</style>
    </div>
  );
};

export default SignUp;