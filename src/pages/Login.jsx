import { NavLink, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const Login = () => {
  const { loading, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const emailRef = useRef();
  const [showPassword, setShowPassowrd] = useState(false);

  const { signInWithGoogle, signIn, logOut, resetPasswordinEmail } = useAuth();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast("You have Successfully Login by Google in Login Page");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast(error.message);
        setLoading(false);
      });
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    resetPasswordinEmail(email)
      .then(() => {
        toast("Password reset email sent!");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const handleEmailPassowrdSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          navigate(from, { replace: true });
          return toast("You have Successfully Login");
        }
        toast("Please Verified Your Email");
        logOut();
      })
      .catch(() => {
        toast("Your email or Password is wrong");
      });
  };
  if (loading) {
    return (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 loading loading-spinner text-warning"></span>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6"> Login </h2>{" "}
        <form onSubmit={handleEmailPassowrdSignIn} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium"> Email </label>{" "}
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium"> Password </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:border-primary"
              />
              <div
                onClick={() => setShowPassowrd(!showPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-2"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg hover:opacity-90"
          >
            Login
          </button>
        </form>
        <div className="text-right">
          <NavLink
            to="/register"
            className="text-xs px-3 py-2 text-gray-700 hover:underline rounded-md"
          >
            Create Account
          </NavLink>
        </div>
        <div className="text-right">
          <button
            onClick={handleResetPassword}
            className="text-xs px-3 py-2 text-gray-700 hover:underline rounded-md"
          >
            Reset Password
          </button>
        </div>
        <div className="text-right">
          <NavLink
            to="/"
            className="text-xs px-3 py-2 text-gray-700  hover:underline rounded-md"
          >
            Go Back Home
          </NavLink>
        </div>
        <div className="text-center">
          <button
            onClick={() => handleGoogleSignIn()}
            className="btn bg-white text-black border-slate-600"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};
