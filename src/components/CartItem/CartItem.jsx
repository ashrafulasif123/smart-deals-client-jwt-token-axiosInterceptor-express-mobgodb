export const CartItem = ({
  product,
  handleDeleteCartItem,
  handleAddBidModal,
}) => {
  const {
    _id: id,
    title,
    price_min,
    price_max,
    category,
    image,
    location,
  } = product;
  return (
    <tr>
      <td>
        <img
          src={image}
          alt={title}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td>
        <div className="font-semibold">{title}</div>
      </td>
      <td>
        ${price_min} - ${price_max}
      </td>
      <td>{category}</td>
      <td>{location}</td>
      <td>
        <div className="flex gap-2">
          <button
            onClick={() => handleAddBidModal(product)}
            className="btn btn-sm btn-primary"
          >
            Add Bid
          </button>
          <button
            onClick={() => handleDeleteCartItem(id)}
            className="btn btn-sm btn-error"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
