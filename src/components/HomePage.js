import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <header class="header">
        <h1>Hex Guesser</h1>
      </header>

      <div class="description-content">
        <section class="description">
          <h2>Test Your Knowledge of Hexadecimals</h2>
          <Link to="/practice">
            <button className="hex_guesser">HexGuesser</button>
          </Link>
        </section>
        <section>
          <h4>How the Hexadecimal Works</h4>
          <p>
            The hexadecimal system contains 16 sequential numbers as base units,
            including 0. The first nine numbers (0 to 9) are the same ones
            commonly used in the decimal system.
            <br />
            The next six two-digit numbers (10 to 15) are represented by the
            letters A through F.
            <br />
            This is how the hex system uses the numbers from 0 to 9 and the
            capital letters A to F to represent the equivalent decimal number.
          </p>
        </section>
      </div>
    </>
  );
}
