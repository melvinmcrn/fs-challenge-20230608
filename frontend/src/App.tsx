import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [oraclePrice, setOraclePrice] = useState<number>();

  useEffect(() => {
    const getOraclePrice = async () => {
      const data = await axios
        .get(
          "http://localhost:8000/oracle-price/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
        )
        .then((response) => {
          return response.data;
        });

      setOraclePrice(data.priceUSD);
    };

    getOraclePrice();
  }, []);

  return (
    <div className="p-4 flex justify-center items-center h-screen bg-red-200">
      <p className="text-center">
        Oracle price of USDC.e is
        <br />
        {oraclePrice ? `$${oraclePrice}` : "Loading..."}
      </p>
    </div>
  );
};

export default App;
