import { useState } from "react";
import Count from "./Count";
import Button from "./Button";

export default function Counter() {
  const [count, setCount] = useState(0);

  const addOne = () => setCount((prev) => prev + 1);

  const feedback = count > 10 ? "It's higher than 10!" : "Keep counting...";

  return (
    <div>
      <h2>Simple Counter</h2>
      <Count count={count} />
      <Button onClick={addOne} />
      <p>{feedback}</p>
    </div>
  );
}
