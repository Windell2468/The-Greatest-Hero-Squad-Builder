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

  // Delete function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hero?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("Heros").delete().eq("id", id);

    if (error) {
      alert("Error deleting hero: " + error.message);
    } else {
      setHeroes(heroes.filter((hero) => hero.id !== id));
    }
  };

  if (loading) return <p>Loading heroes...</p>;
  if (error) return <p>Error loading heroes: {error}</p>;

  // Calculate summary stats
  const totalHeroes = heroes.length;
  const avgPower =
    heroes.length > 0
      ? (
          heroes.reduce((sum, hero) => sum + Number(hero.power_level || 0), 0) /
          heroes.length
        ).toFixed(1)
      : 0;
  const teamStatus =
    avgPower >= 80 ? " Legendary Heros!"
    : avgPower >= 50 ? " Strong Heros!"
    : " Needs Training";

  return (
    <div className="gallery">
      <h1>Hero Gallery</h1>

      {/* Squad Summary Section */}
      <div
        className={`hero-stats ${
          avgPower >= 80 ? "legendary" : avgPower >= 50 ? "strong" : "weak"
        }`}
      >
        <h2>Squad Summary</h2>
        <p><strong>Total Heroes:</strong> {totalHeroes}</p>
        <p><strong>Average Power Level:</strong> {avgPower}</p>
        <p><strong>Success Metric:</strong> {teamStatus}</p>
      </div>

      {heroes.length > 0 ? (
        <ul className="hero-list">
          {heroes.map((hero) => (
            <li key={hero.id} className="hero-card">
              <h2>{hero.name}</h2>
              <p><strong>Universe:</strong> {hero.universe}</p>
              <p><strong>Role:</strong> {hero.role}</p>
              <p><strong>Power Level:</strong> {hero.power_level}</p>
              <p><strong>Description:</strong> {hero.description}</p>

              <div className="hero-buttons">
                <Link to={`/hero/${hero.id}`} className="btn">View Details</Link>
                <Link to={`/edit/${hero.id}`} className="btn edit">Edit</Link>
                <button onClick={() => handleDelete(hero.id)} className="btn delete">
                  Delete
                </button>
              </div>
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
