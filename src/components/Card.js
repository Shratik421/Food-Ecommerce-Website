import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import useDispatch from "./ContextReducer";

export default function Card(props) {
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);

  let foodItem = props.items;
  let dispatch = useDispatchCart();
  let data = useCart();

  const [qty, setQty] = useState(1);
  const [size, setsize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }

    if (food !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalprice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          img: props.foodItem.img,
          price: finalprice,
          qty: qty,
          size: size,
        });
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      img: props.foodItem.img,
      price: finalprice,
      qty: qty,
      size: size,
    });

    await console.log(data);
  };
  let finalprice = qty * parseInt(options[size]);

  useEffect(() => {
    setsize(priceRef.current.value);
  });

  return (
    <>
      <div>
        <div
          className="card mt-2"
          style={{ width: "18rem", maxHeigth: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "150px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select
                className="m-2 h-100  bg-danger rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100  bg-danger rounded"
                ref={priceRef}
                onChange={(e) => setsize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5 fw-bold">₹{finalprice}/-</div>
            </div>
            <hr />
            <button
              className={"btn btn-success justify-center ms-2"}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
