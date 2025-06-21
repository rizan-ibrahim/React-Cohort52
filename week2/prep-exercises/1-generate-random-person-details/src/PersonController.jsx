// src/components/PersonController.js
import { useState, useEffect } from "react";
import Person from "./Person";

function PersonController() {
  const [person, setPerson] = useState(null);

  const getPerson = async () => {
    try {
      const response = await fetch("https://www.randomuser.me/api?results=1");
      const data = await response.json();
      const userData = data.results[0]; // Get the first user from the results

      // Set the state with only the necessary user information
      setPerson({
        firstName: userData.name.first,
        lastName: userData.name.last,
        email: userData.email,
      });
    } catch (error) {
      console.error("Error fetching person data:", error);
    }
  };

  // UseEffect hook to call getPerson function when the component mounts
  useEffect(() => {
    getPerson();
  }, []);

  // Pass the 'person' state as a prop to the Person component
  return <Person person={person} />;
}

export default PersonController;
