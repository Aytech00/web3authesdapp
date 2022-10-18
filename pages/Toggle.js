import React, { useState } from "react";
import Link from "next/link";



const Toggle = () => {
  return (
    <div className="Toggle">
      <div className="inner-toggle-container">
        <div className="toggle-child">
          <Link href="/binance">
            <button className="bsc-btn">Binance</button>
          </Link>
        </div>

        <div className="toggle-child">
          <Link href="/polygon">
            <button className="polygon-btn">Polygon</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
