import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";
// The components to display details of a single hero
export default function Detail() {
  const { id } = useParams();
  // Get an "id" parameter from the route
  const [hero, setHero] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("Heros").select().eq("id", id).single();
      if (!error) setHero(data);
    })();
  }, [id]);

  if (!hero) return <p>Loading hero details...</p>;

  return (
    <div className="hero-detail">
      <h1>{hero.name}</h1>
      <p><strong>Universe:</strong> {hero.universe}</p>
      <p><strong>Power Level:</strong> {hero.power_level}</p>
      <p><strong>Role:</strong> {hero.role}</p>
      <p><strong>Description:</strong> {hero.description}</p>
      <p><strong>Created At:</strong> {new Date(hero.created_at).toLocaleString()}</p>
      <Link to={`/edit/${hero.id}`}>✏️ Edit this Hero</Link>
      <Link to="/gallery">← Back to Gallery</Link>

    </div>
  );
}
