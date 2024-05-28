import { Link } from "react-router-dom";
import priceConverter from "../../util/priceConverter.js";
export default function OrderList({
  fullName,
  userId,
  totalPrice,
  id,
  phone,
  address,
}) {
  return (
    <>
      {id && (
        <tr className="text-center text-neutral-500">
          <td className="py-5 px-2">{id}</td>
          <td className="py-5 px-2">{userId}</td>
          <td className="py-5 px-2">{fullName}</td>
          <td className="py-5 px-2">{phone}</td>
          <td className="py-5 px-2">{address}</td>
          <td className="py-5 px-2">{priceConverter(totalPrice)}</td>
          <td className="py-5 px-2">Waiting for progressing</td>
          <td className="py-5 px-2">Waiting for pay</td>
          <td className="py-5 px-2  w-1/12">
            <Link
              to={`/order/${id}`}
              className="border p-1 block hover:border-neutral-500"
            >
              {" "}
              View<i className="fa-solid fa-arrow-right pl-2"></i>
            </Link>
          </td>
        </tr>
      )}
    </>
  );
}
