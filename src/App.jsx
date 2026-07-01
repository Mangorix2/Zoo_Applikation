import './App.css';
import './Zoo.css'
import { HashRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';

import Startseite from "./Startseite.jsx";
import Impressum from "./Impressum.jsx";
import Datenschutz from "./Datenschutz.jsx";
import UserFeat from './UserFeat.jsx';
import ZooKarte from "./ZooKarte.jsx";
import PopupAd from "./PopupAd.jsx";
import Rating from "./ratingseite.jsx";

// 1. IMPORT THE CHAT COMPONENT HERE
import ZooAIChat from "./ZooAIChat.jsx";

const navClass = ({ isActive }) => isActive ? "active" : "";

function App() {
    return (
        <Router>
            <div>
                {<PopupAd />}

                {/* 2. ADD THE CHAT COMPONENT HERE */}
                <ZooAIChat />

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
                        <NavLink to="/zookarte" className={navClass} end>ZooKarte</NavLink>
                        <NavLink to="/rating" className={navClass} end>Rating</NavLink>
                    </nav>
                </div>

                <Routes>
                    <Route path="/" element={<Startseite/>}/>
                    <Route path="/user-stuff" element={<UserFeat/>}/>
                    <Route path="/impressum" element={<Impressum/>}/>
                    <Route path="/datenschutz" element={<Datenschutz/>}/>
                    <Route path="/zookarte" element={<ZooKarte/>}/>
                    <Route path="/rating" element={<Rating/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;