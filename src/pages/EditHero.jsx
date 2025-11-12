import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

function EditHero() {
  const { id } = useParams(); // get hero ID from URL
  const navigate = useNavigate();
  const [hero, setHero] = useState({
    name: "",
    universe: "",
    power_level: "",
    role: "",
    description: "",
  });

  // Fetch the hero info when page loads
  useEffect(() => {
    const fetchHero = async () => {
      const { data, error } = await supabase
        .from("Heros")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching hero:", error);
      else setHero(data);
    };

    fetchHero();
  }, [id]);

  // Update hero
  const updateHero = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from("Heros")
      .update({
        name: hero.name,
        universe: hero.universe,
        power_level: hero.power_level,
        role: hero.role,
        description: hero.description,
      })
      .eq("id", id);

    if (error) console.error("Update failed:", error);
    else {
  navigate("/gallery");
  window.location.reload();
}

  };

  // Delete hero
  const deleteHero = async () => {
    const { error } = await supabase.from("Heros").delete().eq("id", id);

    if (error) console.error("Delete failed:", error);
    else navigate("/gallery");
  };

  return (
    <div className="edit-hero">
      <h1>Edit Hero</h1>
      <form onSubmit={updateHero}>
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
          onChange={(e) => setHero({ ...hero, description: e.target.value })}
        />
        <button type="submit">Update Hero</button>
      </form>

      <button
        onClick={deleteHero}
        style={{ marginTop: "1rem", background: "red", color: "white" }}
      >
        Delete Hero
      </button>
    </div>
  );
}

export default EditHero;
