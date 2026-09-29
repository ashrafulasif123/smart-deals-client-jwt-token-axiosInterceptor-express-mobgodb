import { Link, NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export const Navbar = ({ cart }) => {
  const { user, loading, logOut } = useAuth();
  const handleLogOut = () => {
    logOut();
  };
  const link =
    "px-3 py-2 text-gray-700 hover:bg-blue-400 hover:text-white rounded-md";
  const activeLink = "bg-blue-400 text-white";
  const active = ({ isActive }) => `${isActive ? activeLink : ""} ${link}`;
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary">SmartDeals</div>

          {/* Menu */}
          <div className="flex items-center gap-2">
            <NavLink to="/" className={active}>
              Home
            </NavLink>
            {user && (
              <NavLink to="/productLists" className={active}>
                Product List
              </NavLink>
            )}
            {user && (
              <NavLink to="/myProducts" className={active}>
                My Products
              </NavLink>
            )}

            <NavLink to="/allBids" className={active}>
              All Bids
            </NavLink>

            {user && (
              <NavLink to="/myBids" className={active}>
                My Bids
              </NavLink>
            )}
            <NavLink to="/createProduct" className={active}>
              Create Product
            </NavLink>
          </div>

          {/* Right Button */}
          <Link to="/cart2" className="btn">
            Cart
            <div className="badge badge-sm badge-secondary">{cart.length}</div>
          </Link>

          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : user ? (
            <button
              onClick={handleLogOut}
              className="px-3 py-2 text-gray-700 hover:bg-red-400 hover:text-white rounded-md bg-red-200"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-2 text-gray-700 hover:bg-amber-400 hover:text-white rounded-md bg-amber-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
