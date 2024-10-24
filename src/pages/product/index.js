import { useState, useEffect } from "react";

const Product = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  // console.log("data", data)

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  return (
    <>
      <h2 className="text-center text-base">Welcome tp product</h2>
      <div>
        {data.map(({ title, image, description }) => (
          <>
            <p>{title}</p>
            <img src={image} alt={title} />
            <p>{description}</p>
          </>
        ))}
      </div>
    </>
  );
};

export default Product;
