import './App.css';
import { HashRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';

import Startseite from "./pages/Startseite.jsx";
import Impressum from "./pages/Impressum.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";

const navClass = ({ isActive }) => isActive ? "active" : "";

function App() {
    return (
        <Router>
            <div>
                <div className="Navigation">
                    <nav>
                        <Link to="/"><h2>MeinProjekt</h2></Link>
                    </nav>
                    <nav>
                        <NavLink to="/" className={navClass} end>Startseite</NavLink>
                        <NavLink to="/impressum" className={navClass}>Impressum</NavLink>
                        <NavLink to="/datenschutz" className={navClass}>Datenschutz</NavLink>
                    </nav>
                </div>

                <Routes>
                    <Route path="/" element={<Startseite/>}/>
                    <Route path="/impressum" element={<Impressum/>}/>
                    <Route path="/datenschutz" element={<Datenschutz/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;