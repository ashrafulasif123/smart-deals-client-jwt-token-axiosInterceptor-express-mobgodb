import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { Bid } from "../components/Bid/Bid";

export const AllBids = () => {
  const [allBids, setAllBids] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance.get("/allBids").then((response) => {
      const bids = response.data;
      setAllBids(bids);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-spinner text-error"></span>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="table w-full">
        {/* Table Head */}
        <thead className="bg-base-200">
          <tr>
            <th>Product Id</th>
            <th>Buyer</th>
            <th>Buyer Email</th>
            <th>Bid Price</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {allBids.map((bid) => (
            <Bid key={bid._id} bid={bid}></Bid>
          ))}
        </tbody>
      </table>
    </div>
  );
};
