import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

function Gallery() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const { data, error } = await supabase
          .from("Heros")
          .select()
          .order("created_at", { ascending: false });

        if (error) throw error;
        setHeroes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  if (loading) return <p>Loading heroes...</p>;
  if (error) return <p>Error loading heroes: {error}</p>;

  return (
    <div className="gallery">
      <h1>Hero Gallery</h1>
      {heroes.length > 0 ? (
        <ul>
          {heroes.map((hero) => (
            <li key={hero.id}>
              <strong>{hero.name}</strong> ({hero.universe}) — {hero.role}
              <br />
              <em>{hero.description}</em>
              <br />
              {/* ✏️ Edit button linking to the EditHero page */}
              <Link to={`/edit/${hero.id}`}>✏️ Edit</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No heroes yet — create one!</p>
      )}
    </div>
  );
}

export default Gallery;
