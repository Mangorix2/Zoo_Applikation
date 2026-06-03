import { useState } from "react";
import "./Zoo.css";

// ── Zone & Pin data ──────────────────────────────────────────────
const ZONES = [
    {
        id: "affen",
        emoji: "🦍",
        name: "Große Affen",
        desc: "Heimat unserer beeindruckenden Primaten – Gorillas, Orang-Utans und Schimpansen. Beobachten Sie das faszinierende Sozialverhalten dieser unseren nächsten Verwandten in weitläufigen, naturnahen Gehegen mit Klettermöglichkeiten und Wasserstellen.",
        tag: "Primaten",
        color: "#da5a32",
        style: { left: "5%", top: "10%", width: 138, height: 118 },
    },
    {
        id: "voegel",
        emoji: "🦜",
        name: "Vogelhaus & Reptilien",
        desc: "Ein tropisches Paradies mit farbenprächtigen Papageien, exotischen Vögeln und einer großen Reptiliensammlung. Im begehbaren Freiflughaus schweben die Tiere um Ihre Schultern.",
        tag: "Vögel & Reptilien",
        color: "#5096c8",
        style: { left: "29%", top: "7%", width: 130, height: 112 },
    },
    {
        id: "elefanten",
        emoji: "🐘",
        name: "Asiatische Elefanten",
        desc: "Unsere majestätischen asiatischen Elefanten leben in einer weitläufigen Anlage mit Wasserbecken, Schlammbädern und Sandflächen. Täglich finden Elefantenpräsentationen um 11:00 und 14:30 Uhr statt.",
        tag: "Dickhäuter",
        color: "#c85050",
        style: { left: "50%", top: "4%", width: 148, height: 128 },
    },
    {
        id: "kleinraubtiere",
        emoji: "🦊",
        name: "Kleine Raubtiere",
        desc: "Geschickte Jäger wie Rotfuchs, Fossa, Buschdog und Karakal leben hier. Die nachtaktiven Tiere sind besonders in den Dämmerungsstunden aktiv. Das Nachtgehege öffnet täglich um 18:00 Uhr.",
        tag: "Raubtiere",
        color: "#6450a0",
        style: { right: "5%", top: "9%", width: 122, height: 108 },
    },
    {
        id: "grosskatzen",
        emoji: "🦁",
        name: "Große Katzen",
        desc: "Das Herzstück unseres Zoos! Begegnen Sie Löwen, Tigern und Jaguaren auf großzügigen Freianlagen. Die Löwen-Fütterung findet täglich um 15:00 Uhr statt – absolutes Highlight!",
        tag: "Raubkatzen",
        color: "#d2821e",
        style: { left: "37%", top: "38%", width: 152, height: 132 },
    },
    {
        id: "baeren",
        emoji: "🐻",
        name: "Bären & Otter",
        desc: "Grizzlybären und Faulbären teilen sich diesen naturnahen Waldbereich mit verspielten Fischottern. Das Otterbecken mit Unterwassersichtscheiben ist ein Publikumsmagnet für Groß und Klein.",
        tag: "Bären & Marder",
        color: "#3c8c64",
        style: { right: "8%", top: "40%", width: 138, height: 118 },
    },
    {
        id: "savanne",
        emoji: "🦓",
        name: "Afrikanische Savanne",
        desc: "Eine weitläufige Savannenlandschaft mit Zebras, Schwarzen Nashörnern, Straußen, Kronenkranichen und dem seltenen Großen Kudu. Das weitläufige Panorama vermittelt echtes Afrika-Feeling.",
        tag: "Savanne",
        color: "#b4961e",
        style: { right: "6%", bottom: "7%", width: 162, height: 132 },
    },
    {
        id: "siamang",
        emoji: "🐒",
        name: "Siamang & Erdmännchen",
        desc: "Die Siamangs – die größten Gibbons der Welt – beeindrucken mit ihren lauten Gesängen, die weithin zu hören sind. Direkt daneben beobachten Sie quirlige Erdmännchen auf ihren Wachhügeln.",
        tag: "Primaten & Mangusten",
        color: "#507832",
        style: { left: "8%", bottom: "20%", width: 132, height: 112 },
    },
    {
        id: "gepard",
        emoji: "🐆",
        name: "Gepard Outpost",
        desc: "Der Gepard Outpost ist das neue Kronjuwel unseres Zoos. Beobachten Sie die schnellsten Landtiere der Welt auf weitläufigen Laufbahnen. Führungen täglich um 10:30 und 16:00 Uhr.",
        tag: "Großkatzen",
        color: "#a03c3c",
        style: { left: "31%", bottom: "8%", width: 132, height: 110 },
    },
    // Smaller zones
    {
        id: "lemur",
        emoji: "🦎",
        name: "Lemur-Insel",
        desc: "Auf der Lemur-Insel leben verschiedene Lemurenarten aus Madagaskar. Die begehbare Anlage erlaubt direkten Kontakt mit den neugierigen Tieren – ein unvergessliches Erlebnis!",
        tag: "Halbaffen",
        color: "#8b6914",
        style: { left: "16%", top: "44%", width: 96, height: 84 },
    },
    {
        id: "pinguin",
        emoji: "🐧",
        name: "Pinguinanlage",
        desc: "Unsere Pinguinkolonie mit afrikanischen Zwergpinguinen begeistert täglich. Das gekühlte Becken mit Unterwassersichtscheiben zeigt die Tiere als perfekte Schwimmer. Fütterung: 11:00 & 15:00 Uhr.",
        tag: "Meerestiere",
        color: "#0369a1",
        style: { left: "22%", top: "62%", width: 100, height: 86 },
    },
    {
        id: "farmhof",
        emoji: "🐄",
        name: "Heritage Farm",
        desc: "Unser Kinderbauernhof mit Ziegen, Schafen, Eseln und Miniaturpferden lädt zum Streicheln und Füttern ein. Täglich von 10:00–16:00 Uhr geöffnet, ideal für die Kleinsten.",
        tag: "Streichelzoo",
        color: "#92400e",
        style: { right: "16%", top: "5%", width: 108, height: 90 },
    },
];

const PINS = [
    {
        id: "eingang",
        emoji: "🚪",
        name: "Haupteingang",
        desc: "Der Haupteingang des Zoos. Eintrittskarten, Zoomaps, Kinderwagen- und Rollstuhlverleih sowie der Informationsschalter befinden sich direkt am Eingang. Geöffnet täglich ab 9:00 Uhr.",
        tag: "Service",
        color: "#dc2626",
        style: { left: "50%", bottom: "4%" },
    },
    {
        id: "restaurant_africa",
        emoji: "🍽️",
        name: "Café Africa",
        desc: "Unser Hauptrestaurant mit afrikanisch inspirierter Küche, Grillspezialitäten und großer Terrasse mit Blick auf die Elefantenanlage. Täglich 10:00–18:00 Uhr. Kindermenüs verfügbar.",
        tag: "Restaurant",
        color: "#f59e0b",
        style: { left: "60%", top: "42%" },
    },
    {
        id: "snackbar",
        emoji: "🌭",
        name: "Snack Shack",
        desc: "Schnelle Stärkung zwischendurch! Hot Dogs, Wraps, Pommes und kühle Getränke. Der ideale Stopp zwischen den Gehegen. Geöffnet von 10:00–17:00 Uhr.",
        tag: "Imbiss",
        color: "#ea580c",
        style: { left: "20%", bottom: "36%" },
    },
    {
        id: "eiscafe",
        emoji: "🍦",
        name: "Eis-Café Flamingo",
        desc: "Hausgemachtes Eis in über 20 Sorten, Waffeln, Milchshakes und kühle Sommergetränke. Der süße Pausenstopp für die ganze Familie. Geöffnet April–Oktober, 10:00–18:00 Uhr.",
        tag: "Café",
        color: "#ec4899",
        style: { right: "22%", top: "55%" },
    },
    {
        id: "giftshop_main",
        emoji: "🛍️",
        name: "Zoo-Shop Hauptgeschäft",
        desc: "Unser großer Souvenirladen am Eingang führt Plüschtiere, Bücher, Kleidung, Schmuck und nachhaltige Produkte. Ein Teil des Erlöses fließt direkt in unsere Artenschutzprojekte.",
        tag: "Souvenirladen",
        color: "#7c3aed",
        style: { left: "44%", bottom: "10%" },
    },
    {
        id: "giftshop_mini",
        emoji: "🎁",
        name: "Mini-Shop Safari",
        desc: "Kleiner Souvenirladen im Savannenbereiche mit Afrika-Souvenirs, handgefertigten Holzfiguren und exklusiven Zoo-Artikeln. Geöffnet täglich 10:00–17:30 Uhr.",
        tag: "Souvenirladen",
        color: "#9333ea",
        style: { right: "18%", bottom: "18%" },
    },
    {
        id: "spielplatz",
        emoji: "🛝",
        name: "Spielplatz Jambo Gym",
        desc: "Der Jambo Gym Spielplatz ist ein Paradies für Kinder! Klettergerüste, Rutschbahnen, Sandkästen und tierische Schaukeln. Ideal für eine Pause zwischen den Tierbesuchen.",
        tag: "Familie",
        color: "#8b5cf6",
        style: { left: "63%", top: "32%" },
    },
    {
        id: "zug",
        emoji: "🚂",
        name: "Zugstation Diamond Express",
        desc: "Fahren Sie mit dem Diamond Express durch den gesamten Zoo! Der Rundkurs dauert ca. 20 Minuten. Abfahrt alle 30 Minuten, 10:00–16:30 Uhr. Tickets an der Station erhältlich.",
        tag: "Transport",
        color: "#16a34a",
        style: { right: "25%", top: "18%" },
    },
    {
        id: "wc",
        emoji: "🚻",
        name: "Sanitäranlagen",
        desc: "Moderne Sanitäranlagen mit Wickelraum und barrierefreiem Zugang. Weitere WC-Anlagen befinden sich am Haupteingang, beim Café Africa und bei der Savannenanlage.",
        tag: "Service",
        color: "#6b7280",
        style: { left: "52%", top: "60%" },
    },
    {
        id: "erste_hilfe",
        emoji: "🏥",
        name: "Erste Hilfe & Info",
        desc: "Unser Servicepunkt bietet Erste Hilfe, verlorene Kinder, Rollstühle und Kinderwagenverleih sowie allgemeine Zooinformationen. Erreichbar täglich von 9:00–18:00 Uhr.",
        tag: "Service",
        color: "#ef4444",
        style: { left: "35%", top: "75%" },
    },
];

// ── Sub-components ───────────────────────────────────────────────
function Zone({ zone, onClick }) {
    return (
        <div
            className="zoo-zone"
            style={{
                ...zone.style,
                background: zone.color + "d0",
                borderColor: zone.color,
            }}
            onClick={() => onClick(zone)}
            title={zone.name}
        >
      <span className="zoo-zone-label">
        {zone.emoji}
          <br />
          {zone.name}
      </span>
        </div>
    );
}

function Pin({ pin, onClick }) {
    return (
        <div
            className="zoo-pin"
            style={pin.style}
            onClick={() => onClick(pin)}
            title={pin.name}
        >
            <div className="zoo-pin-circle" style={{ background: pin.color }}>
                <span className="zoo-pin-icon">{pin.emoji}</span>
            </div>
        </div>
    );
}

function InfoPanel({ item, onClose }) {
    if (!item) return null;
    return (
        <div className="zoo-info-panel">
            <button className="zoo-info-close" onClick={onClose}>×</button>
            <div className="zoo-info-emoji">{item.emoji}</div>
            <div className="zoo-info-name">{item.name}</div>
            <div className="zoo-info-desc">{item.desc}</div>
            <span className="zoo-info-tag">{item.tag}</span>
        </div>
    );
}

// ── Main Component ───────────────────────────────────────────────
function ZooKarte() {
    const [selected, setSelected] = useState(null);

    const handleSelect = (item) => {
        setSelected(item);
    };

    return (
        <div className="zoo-page">
            <div className="zoo-wrapper">
                <div className="zoo-label">Orientierung</div>
                <h1 className="zoo-title">Zoo Karte</h1>
                <p className="zoo-subtitle">
                    Klicken Sie auf einen Bereich oder Marker, um Details zu erfahren.
                </p>

                {/* MAP CARD */}
                <section className="zoo-card">
                    <h2>Interaktive Zoo-Karte</h2>
                    <div id="zoo-map" className="zoo-map-container">

                        {/* SVG background – paths & water */}
                        <svg
                            className="zoo-map-svg"
                            viewBox="0 0 1000 600"
                            preserveAspectRatio="xMidYMid slice"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Base ground */}
                            <rect width="1000" height="600" fill="#5a9e5a" />
                            <ellipse cx="500" cy="295" rx="435" ry="255" fill="#6db86d" />
                            {/* Water features */}
                            <ellipse cx="230" cy="155" rx="68" ry="38" fill="#4aa8d4" opacity="0.82" />
                            <ellipse cx="610" cy="118" rx="52" ry="28" fill="#4aa8d4" opacity="0.75" />
                            <ellipse cx="760" cy="320" rx="36" ry="22" fill="#4aa8d4" opacity="0.65" />
                            {/* Main ring walkway */}
                            <path
                                d="M500 555 Q490 470 390 420 Q280 368 240 275 Q195 185 275 138 Q360 92 500 105 Q645 118 715 205 Q775 285 740 388 Q710 468 615 505 Q560 530 500 555Z"
                                fill="none"
                                stroke="#e8dcc8"
                                strokeWidth="24"
                                strokeLinecap="round"
                                opacity="0.88"
                            />
                            {/* Cross paths */}
                            <line x1="500" y1="105" x2="500" y2="555" stroke="#e8dcc8" strokeWidth="17" opacity="0.55" />
                            <line x1="240" y1="275" x2="745" y2="310" stroke="#e8dcc8" strokeWidth="14" opacity="0.5" />
                            <line x1="275" y1="138" x2="715" y2="205" stroke="#e8dcc8" strokeWidth="13" opacity="0.45" />
                            <line x1="390" y1="420" x2="615" y2="505" stroke="#e8dcc8" strokeWidth="11" opacity="0.4" />
                            {/* Border / hedge */}
                            <rect width="1000" height="600" fill="none" stroke="#3d7a3d" strokeWidth="32" />
                        </svg>

                        {/* Clickable zones */}
                        {ZONES.map((zone) => (
                            <Zone key={zone.id} zone={zone} onClick={handleSelect} />
                        ))}

                        {/* Service pins */}
                        {PINS.map((pin) => (
                            <Pin key={pin.id} pin={pin} onClick={handleSelect} />
                        ))}

                        {/* Entrance label */}
                        <div className="zoo-entrance">▲ EINGANG</div>

                        {/* Info panel overlay */}
                        <InfoPanel item={selected} onClose={() => setSelected(null)} />
                    </div>
                </section>

                {/* LEGEND GRID */}
                <div className="zoo-grid">
                    {/* Zones legend */}
                    <section className="zoo-card">
                        <h3>Tierbereiche</h3>
                        <ul className="zoo-legend-list">
                            {ZONES.map((z) => (
                                <li
                                    key={z.id}
                                    className="zoo-legend-item"
                                    onClick={() => handleSelect(z)}
                                >
                                    <div
                                        className="zoo-legend-dot"
                                        style={{ background: z.color }}
                                    />
                                    <span>{z.emoji} {z.name}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Services legend */}
                    <section className="zoo-card">
                        <h3>Services & Einrichtungen</h3>
                        <ul className="zoo-legend-list">
                            {PINS.map((p) => (
                                <li
                                    key={p.id}
                                    className="zoo-legend-item"
                                    onClick={() => handleSelect(p)}
                                >
                                    <div
                                        className="zoo-legend-dot"
                                        style={{ background: p.color }}
                                    />
                                    <span>{p.emoji} {p.name}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>

            <footer className="zoo-footer">© 2026 Zoo Management System</footer>
        </div>
    );
}

export default ZooKarte;