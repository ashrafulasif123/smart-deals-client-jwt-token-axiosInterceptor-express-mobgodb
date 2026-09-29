import { format } from "date-fns";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";
import Swal from "sweetalert2";

export const CreateProduct = () => {
  const handleCreateProduct = (e) => {
    e.preventDefault();

    const form = e.target;

    const title = form.title.value.trim();
    const price_min = Number(form.price_min.value);
    const price_max = Number(form.price_max.value);
    const category = form.category.value;
    const email = form.email.value.trim();
    const image = form.image.value.trim();
    const location = form.location.value.trim();
    const seller_image = form.seller_image.value.trim();
    const seller_name = form.seller_name.value.trim();
    const condition = form.condition.value;
    const usage = form.usage.value.trim();
    const description = form.description.value.trim();
    const seller_contact = form.seller_contact.value.trim();
    const expired_date = form.expired_date.value;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Bangladesh mobile number validation
    const phoneRegex = /^01[3-9]\d{8}$/;

    // Title
    if (title.length < 3) {
      return alert("Product title must be at least 3 characters.");
    }

    // Price
    if (!price_min || price_min < 0) {
      return alert("Minimum price must be greater than 0.");
    }

    if (!price_max || price_max < 0) {
      return alert("Maximum price must be greater than 0.");
    }

    if (price_min > price_max) {
      return alert("Minimum price cannot be greater than maximum price.");
    }

    // Email
    if (!emailRegex.test(email)) {
      return alert("Please enter a valid email address.");
    }

    // Image
    if (!image) {
      return alert("Product image URL is required.");
    }

    // Location
    if (location.length < 2) {
      return alert("Please enter a valid location.");
    }

    // Seller name
    if (seller_name.length < 2) {
      return alert("Seller name must be at least 2 characters.");
    }

    // Seller image
    if (!seller_image) {
      return alert("Seller image URL is required.");
    }

    // Usage
    if (usage.length < 2) {
      return alert("Please enter product usage information.");
    }

    if (!description) {
      return alert("Description Field Cannot be Empty");
    }

    // Phone
    if (!phoneRegex.test(seller_contact)) {
      return alert("Please enter a valid Bangladesh mobile number.");
    }

    if (!expired_date) {
      return toast("Calendar Field Cannot be empty");
    }

    const newProduct = {
      title,
      price_min,
      price_max,
      category,
      email,
      created_at: new Date(),
      image,
      status: "pending",
      location,
      seller_image,
      seller_name,
      condition,
      usage,
      description,
      seller_contact,
      expired_date,
    };
    axiosInstance
      .post("/products", newProduct)
      .then((res) => {
        if (res.data.insertedId)
          return Swal.fire({
            icon: "success",
            title: "success",
            text: "You have successfull added the product",
          });
      })
      .catch((error) => {
        const message =
          error.response?.data.message || error.response?.statusText;
        const status = error.response?.status;
        return Swal.fire({
          icon: "error",
          title: "Exist",
          text: `${status} : ${message}`,
        });
      });
  };

  return (
    <div>
      <form onSubmit={handleCreateProduct} className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Product title"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Price
              </label>
              <input
                type="number"
                name="price_min"
                placeholder="Minimum price"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Price
              </label>
              <input
                type="number"
                name="price_max"
                placeholder="Maximum price"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select className="select select-neutral" name="category">
                <option disabled={true}>Accessories</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Sports">Sports</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
                defaultValue="Pending"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seller Name
              </label>
              <input
                type="text"
                placeholder="Seller name"
                name="seller_name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seller Image
              </label>
              <input
                type="text"
                placeholder="Seller image URL"
                name="seller_image"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <input
                type="text"
                placeholder="Product image URL"
                name="image"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition
              </label>
              <div className="flex">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Used
                  <input
                    type="radio"
                    name="condition"
                    value="used"
                    className="radio radio-neutral ml-1 mr-4"
                    defaultChecked
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fresh
                  <input
                    type="radio"
                    name="condition"
                    value="fresh"
                    className="radio radio-neutral ml-1"
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usage
              </label>
              <input
                type="text"
                name="usage"
                placeholder="Usage"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seller Contact
              </label>
              <input
                type="tel"
                name="seller_contact"
                placeholder="01XXXXXXXXX"
                pattern="01[3-9][0-9]{8}"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Created At
              </label>
              <input
                type="text"
                defaultValue={format(new Date(), "dd-MM-yyyy , hh:mm:ss a")}
                placeholder="Created date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expired Date
              </label>
              <input
                type="date"
                name="expired_date"
                placeholder="Created date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              placeholder="Product description"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-amber-400 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 rounded-lg transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
