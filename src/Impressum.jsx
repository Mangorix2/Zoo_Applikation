export default function Impressum() {
    const sections = [
        {
            title: "Anbieter",
            bg: "#f0faf4",
            items: [
                { label: "Name", value: "Zoologischer Garten Musterstadt AG" },
                { label: "Rechtsform", value: "Aktiengesellschaft (AG)" },
                { label: "Geschäftsführerin", value: "Dr. Anna Mustermann" },
            ],
        },
        {
            title: "Kontakt",
            bg: "#f0f4fa",
            items: [
                { label: "Adresse", value: "Zoostrasse 1, 8001 Zürich" },
                { label: "Telefon", value: "+41 44 123 45 67" },
                { label: "E-Mail", value: "info@zoo-musterstadt.ch" },
            ],
        },
        {
            title: "Register & Steuern",
            bg: "#fafaf0",
            items: [
                { label: "Handelsregister", value: "CHE-123.456.789, Kanton Zürich" },
                { label: "MWST-Nummer", value: "CHE-123.456.789 MWST" },
            ],
        },
        {
            title: "Behörden & Bewilligung",
            bg: "#faf0f4",
            items: [
                { label: "Aufsichtsbehörde", value: "Kantonales Veterinäramt Zürich" },
                { label: "Bewilligung", value: "Tierhaltungsbewilligung gem. Art. 76 TSchV" },
                { label: "Tierschutzbeauftragter", value: "Dr. Max Tierfreund" },
            ],
        },
        {
            title: "Rechtliche Hinweise",
            bg: "#f4f0fa",
            items: [
                { label: "Inhalt verantwortlich", value: "Dr. Anna Mustermann" },
                { label: "Bildrechte", value: "© Zoo Musterstadt AG, alle Rechte vorbehalten" },
                { label: "Externe Links", value: "Keine Haftung für verlinkte Inhalte" },
                { label: "Anwendbares Recht", value: "Schweizerisches Recht, Gerichtsstand Zürich" },
            ],
        },
    ];

    return (
        <main className="min-vh-100 bg-light">
            <section className="container py-5">
                <p className="text-success text-uppercase small fw-semibold mb-2">Rechtliches</p>
                <h1 className="display-5 fw-bold mb-1 text-dark">Impressum</h1>
                <p className="mb-5" style={{ color: "#555" }}>
                    Angaben gemäss Art. 3 lit. s UWG sowie Art. 13 DSG (Schweiz)
                </p>

                <div className="row g-4">
                    {sections.map((sec) => (
                        <div className="col-md-6" key={sec.title}>
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{ backgroundColor: sec.bg }}
                            >
                                <div className="card-body p-4">
                                    <h2
                                        className="h6 fw-bold mb-3 d-flex align-items-center gap-2"
                                        style={{ color: "#1a1a1a" }}
                                    >
                                        <span>{sec.icon}</span>
                                        <span>{sec.title}</span>
                                    </h2>
                                    <dl className="mb-0">
                                        {sec.items.map((item) => (
                                            <div key={item.label} className="mb-2">
                                                <dt
                                                    className="small"
                                                    style={{ color: "#555", fontWeight: 400 }}
                                                >
                                                    {item.label}
                                                </dt>
                                                <dd
                                                    className="mb-0 fw-semibold"
                                                    style={{ color: "#1a1a1a" }}
                                                >
                                                    {item.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p
                    className="mt-5 small text-center"
                    style={{ color: "#777" }}
                >
                    Bei Fragen wenden Sie sich bitte an{" "}
                    <a href="mailto:info@zoo-musterstadt.ch" className="text-success">
                        info@zoo-musterstadt.ch
                    </a>
                </p>
            </section>
        </main>
    );
}
