import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";
import Swal from "sweetalert2";

export const UpdateBid = () => {
  const data = useLoaderData();
  const bid = data.data;
  const [productDetails, setProductDetails] = useState({});
  const navigate = useNavigate();
  const { _id: bidId, productId: id, bidPrice, buyerContact } = bid;

  useEffect(() => {
    axiosInstance.get(`/products/${id}`).then((res) => {
      setProductDetails(res.data);
    });
  }, [id]);

  const { price_min, price_max } = productDetails;

  const handleBidUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const bidPrice = Number(form.bidPrice.value);
    const buyerContact = form.buyerContact.value;

    /** Form Validation */
    if (!bidPrice) {
      return toast("Bid Price Cannot be Empty");
    }
    if (bidPrice < price_min || bidPrice > price_max)
      return toast("Bid Price should be between Min Price & Max Price");
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!buyerContact) return toast("Contact Cannot Be empty");
    if (!bdPhoneRegex.test(buyerContact))
      return toast("Contact number should be valid");

    const updateBid = {
      bidPrice,
      buyerContact,
    };

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Update This",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosInstance
            .patch(`/updateBid/${bidId}`, updateBid)
            .then((res) => {
              if (res.data.modifiedCount) {
                swalWithBootstrapButtons.fire({
                  title: "Updated",
                  text: "Your Bid is Successfully updated",
                  icon: "success",
                });
                navigate("/myBids");
              } else {
                swalWithBootstrapButtons.fire({
                  title: "Already Updated",
                  text: "Previous is Updated",
                  icon: "success",
                });
              }
            })
            .catch((error) => {
              const message = error.response?.data.message;
              const statusText = error.response.statusText;
              const status = error.response?.status;
              swalWithBootstrapButtons.fire({
                title: "Something Wrong",
                text: `${status} : ${message || statusText}`,
                icon: "error",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel)
          /* Read more about handling dismissals below */
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Update is Cancelled",
            icon: "error",
          });
      });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Update Your Bid
          </h2>

          <form onSubmit={handleBidUpdate} className="space-y-5">
            {/* Bid Price */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Bid Price</span>
              </label>

              <input
                type="number"
                name="bidPrice"
                defaultValue={bidPrice}
                placeholder={`${price_min} - ${price_max} `}
                className="input input-bordered w-full"
              />
            </div>

            {/* Buyer Contact */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Contact Number</span>
              </label>

              <input
                type="tel"
                name="buyerContact"
                defaultValue={buyerContact}
                placeholder="Enter your contact number"
                className="input input-bordered w-full"
              />
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-primary w-full rounded-lg">
              Update Bid
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
