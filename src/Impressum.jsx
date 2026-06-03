export default function Impressum() {
    const sections = [
        {
            title: "Anbieter",
            items: [
                { label: "Name", value: "Zoologischer Garten Musterstadt AG" },
                { label: "Rechtsform", value: "Aktiengesellschaft (AG)" },
                { label: "Geschäftsführerin", value: "Dr. Anna Mustermann" },
            ],
        },
        {
            title: "Kontakt",
            items: [
                { label: "Adresse", value: "Zoostrasse 1, 8001 Zürich" },
                { label: "Telefon", value: "+41 44 123 45 67" },
                { label: "E-Mail", value: "info@zoo-musterstadt.ch" },
            ],
        },
        {
            title: "Register & Steuern",
            items: [
                { label: "Handelsregister", value: "CHE-123.456.789, Kanton Zürich" },
                { label: "MWST-Nummer", value: "CHE-123.456.789 MWST" },
            ],
        },
        {
            title: "Behörden & Bewilligung",
            items: [
                { label: "Aufsichtsbehörde", value: "Kantonales Veterinäramt Zürich" },
                { label: "Bewilligung", value: "Tierhaltungsbewilligung gem. Art. 76 TSchV" },
                { label: "Tierschutzbeauftragter", value: "Dr. Max Tierfreund" },
            ],
        },
        {
            title: "Rechtliche Hinweise",
            items: [
                { label: "Inhalt verantwortlich", value: "Dr. Anna Mustermann" },
                { label: "Bildrechte", value: "© Zoo Musterstadt AG, alle Rechte vorbehalten" },
                { label: "Externe Links", value: "Keine Haftung für verlinkte Inhalte" },
                { label: "Anwendbares Recht", value: "Schweizerisches Recht, Gerichtsstand Zürich" },
            ],
        },
    ];

    return (
        <main className="zoo-page">

            <section className="zoo-wrapper">

                <p className="zoo-label">Rechtliches</p>

                <h1 className="zoo-title">Impressum</h1>

                <p className="zoo-subtitle">
                    Angaben gemäss Art. 3 lit. s UWG sowie Art. 13 DSG (Schweiz)
                </p>

                <div className="zoo-grid">

                    {sections.map((sec) => (
                        <div className="zoo-card" key={sec.title}>

                            <h2>{sec.title}</h2>

                            <dl>
                                {sec.items.map((item) => (
                                    <div key={item.label}>

                                        <dt>{item.label}</dt>

                                        <dd>{item.value}</dd>

                                    </div>
                                ))}
                            </dl>

                        </div>
                    ))}

                </div>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "40px",
                        color: "#6b7280",
                        fontSize: "14px"
                    }}
                >
                    Bei Fragen wenden Sie sich bitte an{" "}
                    <a
                        href="mailto:info@zoo-musterstadt.ch"
                        style={{
                            color: "#16a34a",
                            textDecoration: "none",
                            fontWeight: "600"
                        }}
                    >
                        info@zoo-musterstadt.ch
                    </a>
                </p>

            </section>

            <footer className="zoo-footer">
                © 2026 Zoo Applikation
            </footer>

        </main>
    );
}