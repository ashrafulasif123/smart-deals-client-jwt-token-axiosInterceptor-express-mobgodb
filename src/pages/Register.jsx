import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";

export const Register = () => {
  const { signInWithGoogle, signUp } = useAuth();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast("You have Successfully Login by Google In Register Page");
      })
      .catch((error) => {
        toast(error);
      });
  };

  const handleEmailPasswordSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const profile = { displayName: name, photoURL: photo };
    signUp(email, password)
      .then(() => {
        updateProfile(auth.currentUser, profile)
          .then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              toast(
                "You have successfully signup and check email verification",
              );
            });
          })
          .catch((error) => {
            toast(error.message);
          });
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleEmailPasswordSignUp} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:border-primary"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:border-primary"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block mb-1 font-medium">Photo</label>

            <input
              type="text"
              name="photo"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Photo URL"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:border-primary"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg hover:opacity-90"
          >
            Register
          </button>
        </form>
        <div className="text-right">
          <NavLink
            to="/Login"
            className="text-xs px-3 py-2 text-gray-700 hover:underline rounded-md"
          >
            Login
          </NavLink>
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
