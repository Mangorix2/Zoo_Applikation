import './App.css';
import { HashRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';

import Startseite from "./Startseite.jsx";
import Impressum from "./Impressum.jsx";
import Datenschutz from "./Datenschutz.jsx";
import UserFeat from './UserFeat.jsx';

const navClass = ({ isActive }) => isActive ? "active" : "";

function App() {
    return (
        <Router>
            <div>
                <div className="Navigation">
                    <header className="border-bottom bg-white">
                        <div className="container py-4 d-flex align-items-center justify-content-between">
                            <span className="fw-bold fs-5">Zoo Applikation</span>
                            <span className="badge bg-success">Heute offen</span>
                        </div>
                    </header>
                    <nav>
                        <NavLink to="/" className={navClass} end>Startseite</NavLink>
                        <NavLink to="/user-stuff" className={navClass} end>user-stuff</NavLink>
                        <NavLink to="/impressum" className={navClass}>Impressum</NavLink>
                        <NavLink to="/datenschutz" className={navClass}>Datenschutz</NavLink>
                    </nav>
                </div>

                <Routes>
                    <Route path="/" element={<Startseite/>}/>
                    <Route path="/user-stuff" element={<UserFeat/>}/>
                    <Route path="/impressum" element={<Impressum/>}/>
                    <Route path="/datenschutz" element={<Datenschutz/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;