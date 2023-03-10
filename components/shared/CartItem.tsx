import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { increase, decrease, removeItem } from "../../services/redux/cartRedux";
import classNames from "classnames";

const CartItem = ({ id, imgLink, img1, title, priceNum }) => {
  const dispatch = useDispatch();

  let [quantity, setQuantity] = useState(1);

  const handleQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(increase({ id, priceNum }));
  };

  const handleLowerQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(decrease({ id, priceNum }));
    }
  };

  return (
    <tr key={id}>
      <td className="align-middle product-item">
        <img
          src={imgLink ? imgLink : img1}
          alt=""
          style={{ width: "50px", marginRight: "10px" }}
        />{" "}
        <Link href={id} id="product-link">
          {title}
        </Link>
      </td>
      <td className="align-middle">{(priceNum * quantity).toFixed(2)} Lei</td>
      <td className="align-middle">
        <div
          className="input-group quantity mx-auto"
          style={{ width: "100px" }}
        >
          <div className="input-group-btn">
            <button
              className={classNames(
                "btn btn-sm btn-primary btn-minus",
                quantity == 1 ? "disabled" : ""
              )}
              onClick={() => handleLowerQuantity()}
            >
              <i className="fa fa-minus"></i>
            </button>
          </div>
          <input
            type="text"
            className="form-control form-control-sm bg-secondary text-center"
            value={quantity}
          />
          <div className="input-group-btn">
            <button
              className="btn btn-sm btn-primary btn-plus"
              onClick={() => handleQuantity()}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
          <div
            className="input-group-btn"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "5px",
            }}
          >
            <button
              className={classNames(
                "btn btn-sm",
                quantity == 1 ? "" : "d-none"
              )}
              id="remove-btn"
              onClick={() => dispatch(removeItem({ id, priceNum }))}
            >
              Remove
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
