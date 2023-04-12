import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { increase, decrease, removeItem } from "../../services/redux/cartRedux";
import classNames from "classnames";

const ResponsiveCart = ({
  id,
  imgLink,
  img1,
  title,
  priceNum,
  warranty,
}) => {
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
    <div key={id} className="my-4">
      <div>
        <img
          src={imgLink ? imgLink : img1}
          alt=""
          style={{ width: "50px", marginRight: "10px" }}
        />{" "}
        <Link href={id} id="product-link">
          {title}
        </Link>
      </div>
      <div className="d-flex justify-content-between my-2">
        <p>Preț: {(priceNum * quantity).toFixed(2)} Lei</p>
        <p>Garanție: {warranty} Lei</p>
      </div>
      <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
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
            className={classNames("btn btn-sm", quantity == 1 ? "" : "d-none")}
            id="remove-btn"
            onClick={() => dispatch(removeItem({ id, priceNum, warranty }))}
          >
            Șterge
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCart;
