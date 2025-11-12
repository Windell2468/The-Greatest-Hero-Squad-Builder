import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../client";

function Detail() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabase
        .from("Heros")
        .select()
        .eq("id", id)
        .single();
      setHero(data);
    };

    fetchHero();
  }, [id]);

  if (!hero) return <p>Loading hero...</p>;

  return (
    <div className="hero-detail">
      <h1>{hero.name}</h1>
      <p><strong>Universe:</strong> {hero.universe}</p>
      <p><strong>Power Level:</strong> {hero.power_level}</p>
      <p><strong>Role:</strong> {hero.role}</p>
      <p>{hero.description}</p>
    </div>
  );
}

export default Detail;
