import { useState, FormEvent, ChangeEvent } from "react";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    alert(`Signing in with ${email}`);
    // Implement real auth logic here
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="min-h-screen bg-[#F3F6F9] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md animate-slideUp">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4F6EF7] hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 font-medium hover:underline">Sign Up</a>
        </p>
      </div>

      <style>{`
        @keyframes slideUp { 0% { opacity:0; transform: translateY(20px);} 100%{opacity:1; transform:translateY(0);} }
        .animate-slideUp { animation: slideUp 0.6s ease forwards; }
      `}</style>
    </div>
  );
};

export default SignIn;