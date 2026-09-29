import { Link } from "react-router";

export const MyBid = ({ bid, handleProductDetailsModal, handleDeleteBid }) => {
  const {
    _id: bidId,
    productId,
    buyerName,
    buyerEmail,
    buyerPhoto,
    bidPrice,
    buyerContact,
  } = bid;

  return (
    <>
      <tr className="hover:bg-base-100">
        <td>{productId}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={buyerPhoto} alt="Buyer" />
              </div>
            </div>

            <div>
              <div className="font-bold">{buyerName}</div>
            </div>
          </div>
        </td>

        <td>{buyerEmail}</td>

        <td className="font-semibold text-primary">{bidPrice}</td>

        <td>{buyerContact}</td>

        <td>
          <button
            onClick={() => handleProductDetailsModal(productId)}
            className="btn btn-sm btn-primary"
          >
            Product Details
          </button>
        </td>
        <td>
          <Link to={`/bid/${bidId}`} className="btn btn-sm btn-warning">
            Update
          </Link>
        </td>
        <td>
          <button
            onClick={() => handleDeleteBid(bidId)}
            className="btn btn-sm btn-error"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};
