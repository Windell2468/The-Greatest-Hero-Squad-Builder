import { Routes, Route, Link } from "react-router-dom"; // React Router components routing
import CreateHero from "./pages/CreateHero"; 
import Gallery from "./pages/Gallery"; 
import Detail from "./pages/Detail";
import EditHero from "./pages/EditHero";

import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="sidebar">
        <h2>🕸️🦸‍♂️ Greatest Heros Squad Builder🥷🍄</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create Hero</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home">
                <h1>Welcome to the Gretest Hero Squad Creator!</h1>
                <p>
                  Build your ultimate team of heroes from your favorite universes.
                  You can create, view, edit, and delete your custom heroes!
                </p>
                
              </div>
            }
          />
          <Route path="/create" element={<CreateHero />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/hero/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<EditHero />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
