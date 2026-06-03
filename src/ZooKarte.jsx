import "./Zoo.css";

function ZooKarte() {
    return (
        <div className="zoo-page">
            <div className="zoo-wrapper">

                <div className="zoo-label">Orientierung</div>

                <h1 className="zoo-title">
                    Zoo Karte
                </h1>

                <p className="zoo-subtitle">
                    Übersicht über alle Bereiche des Zoos.
                </p>

                <section className="zoo-card">
                    <h2>Interaktive Zoo-Karte</h2>

                    <p>
                        Die Karte ist bereits für zukünftige
                        Interaktionen vorbereitet.
                    </p>

                    <div
                        id="zoo-map"
                        className="zoo-map-container"
                    >
                        <img
                            src="/images/zoo-plan.jpg"
                            alt="Zoo Plan"
                            className="zoo-map-image"
                        />

                        {/* Platz für zukünftige Marker */}
                        <div className="map-layer"></div>
                    </div>
                </section>

                <div className="zoo-grid">
                    <section className="zoo-card">
                        <h3>Legende</h3>

                        <ul>
                            <li>Haupteingang</li>
                            <li>Löwengehege</li>
                            <li>Affenhaus</li>
                            <li>Restaurant</li>
                            <li>Spielplatz</li>
                        </ul>
                    </section>

                    <section className="zoo-card">
                        <h3>Entwicklerhinweis</h3>

                        <p>
                            Der Bereich mit der ID
                            <strong> zoo-map </strong>
                            kann später für Marker,
                            Hover-Effekte oder Zoombereiche
                            erweitert werden.
                        </p>
                    </section>
                </div>

            </div>

            <footer className="zoo-footer">
                © 2026 Zoo Management System
            </footer>
        </div>
    );
}

export default ZooKarte;