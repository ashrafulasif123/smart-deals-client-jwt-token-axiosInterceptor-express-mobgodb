// import { useOutletContext } from "react-router";

// export const Cart = () => {
//   const { cart } = useOutletContext();
//   return (
//     <div className="overflow-x-auto">
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Product</th>
//             <th>Price</th>
//             <th>Category</th>
//             <th>Location</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {cart.map((product) => {
//             const {
//               id,
//               title,
//               price_min,
//               price_max,
//               category,
//               image,
//               location,
//             } = product;
//             return (
//               <tr key={id}>
//                 <td>
//                   <img
//                     src={image}
//                     alt={title}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 </td>

//                 <td>
//                   <div className="font-semibold">{title}</div>
//                 </td>

//                 <td>
//                   ${price_min} - ${price_max}
//                 </td>

//                 <td>{category}</td>

//                 <td>{location}</td>

//                 <td>
//                   <div className="flex gap-2">
//                     <button className="btn btn-sm btn-primary">View</button>

//                     <button className="btn btn-sm btn-error">Delete</button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };
