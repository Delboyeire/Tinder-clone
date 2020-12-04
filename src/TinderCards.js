import "./TinderCards.css";

import React, { useEffect, useState } from "react";

import Axios from "./axios";
import TinderCard from "react-tinder-card";

function TinderCards() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await Axios.get("/tinder/cards");

      setPeople(req.data);
    }

    fetchData();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("removing " + nameToDelete);
    //setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };

  return (
    <div className={"tinderCards"}>
      <div className={"tinderCards__cardContainer"}>
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: "url(" + person.imgUrl + ")" }}
              className={"card"}
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
