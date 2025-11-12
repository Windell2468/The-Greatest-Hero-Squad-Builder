import { useState } from "react";
import { supabase } from "../client";

function CreateHero() {
  const [hero, setHero] = useState({
    name: "",
    universe: "",
    power_level: "",
    role: "",
    description: "",
  });

  const createHero = async (event) => {
  event.preventDefault();
  console.log("Submitting hero:", hero); // 👈 add this line

  const { data, error } = await supabase
    .from("Heros")
    .insert({
      name: hero.name,
      universe: hero.universe,
      power_level: hero.power_level,
      role: hero.role,
      description: hero.description,
    })
    .select();

  if (error) {
    console.error("Insert error:", error); // 👈 catch issues here
  } else {
    console.log("Inserted data:", data);
    window.location = "/gallery";
  }
};


  return (
    <div className="create-hero">
      <h1>Create a New Hero</h1>
      <form onSubmit={createHero}>
        <input
          type="text"
          placeholder="Name"
          value={hero.name}
          onChange={(e) => setHero({ ...hero, name: e.target.value })}
        />
        <select
          value={hero.universe}
          onChange={(e) => setHero({ ...hero, universe: e.target.value })}
        >
          <option value="">Select Universe</option>
          <option value="Marvel">Marvel</option>
          <option value="DC">DC</option>
          <option value="Anime">Anime</option>
          <option value="Game">Game</option>
        </select>
        <input
          type="number"
          placeholder="Power Level"
          value={hero.power_level}
          onChange={(e) => setHero({ ...hero, power_level: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={hero.role}
          onChange={(e) => setHero({ ...hero, role: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={hero.description}
          onChange={(e) =>
            setHero({ ...hero, description: e.target.value })
          }
        />
        <button type="submit">Add Hero</button>
      </form>
    </div>
  );
}

export default CreateHero;
