export default function Datenschutz() {
    return (
        <div style={styles.page}>

            {/* Header wie eure Seite */}
            <header style={styles.header}>
                <h1 style={styles.logo}>Zoo Applikation</h1>

                <nav style={styles.nav}>
                    <a href="/" style={styles.link}>Startseite</a>
                    <a href="/impressum" style={styles.link}>Impressum</a>
                    <a href="/datenschutz" style={styles.active}>Datenschutz</a>
                </nav>
            </header>

            {/* Content Container wie eure Cards */}
            <main style={styles.wrapper}>

                <h2 style={styles.title}>Datenschutz</h2>
                <p style={styles.subtitle}>
                    Informationen zum Umgang mit personenbezogenen Daten
                </p>

                <div style={styles.card}>
                    <h3 style={styles.h3}>Allgemeine Hinweise</h3>
                    <p style={styles.text}>
                        Wir schützen Ihre Daten und behandeln sie vertraulich nach DSGVO.
                    </p>
                </div>

                <div style={styles.card}>
                    <h3 style={styles.h3}>Cookies</h3>
                    <p style={styles.text}>
                        Cookies werden genutzt, um die Website zu verbessern.
                    </p>
                </div>

                <div style={styles.card}>
                    <h3 style={styles.h3}>Kontaktformular</h3>
                    <p style={styles.text}>
                        Eingaben werden nur zur Bearbeitung der Anfrage gespeichert.
                    </p>
                </div>

                <div style={styles.card}>
                    <h3 style={styles.h3}>Externe Dienste</h3>
                    <p style={styles.text}>
                        Für Buchungen können externe Anbieter verwendet werden.
                    </p>
                </div>

            </main>

            <footer style={styles.footer}>
                © 2026 Zoo Applikation
            </footer>
        </div>
    );
}

/* STYLE (angepasst an dein UI: kleiner, moderner, mehr spacing) */
const styles = {
    page: {
        fontFamily: "Arial",
        background: "#f6f8fb",
        minHeight: "100vh"
    },

    header: {
        background: "#ffffff",
        padding: "14px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e5e7eb"
    },

    logo: {
        fontSize: "18px",
        margin: 0
    },

    nav: {
        display: "flex",
        gap: "15px",
        fontSize: "14px"
    },

    link: {
        textDecoration: "none",
        color: "#111827"
    },

    active: {
        textDecoration: "underline",
        color: "#16a34a",
        fontSize: "14px"
    },

    wrapper: {
        maxWidth: "900px",
        margin: "40px auto",
        padding: "0 20px"
    },

    title: {
        fontSize: "26px",
        marginBottom: "5px"
    },

    subtitle: {
        fontSize: "14px",
        color: "#6b7280",
        marginBottom: "25px"
    },

    card: {
        background: "#ffffff",
        padding: "18px",
        borderRadius: "10px",
        marginBottom: "15px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
    },

    h3: {
        fontSize: "15px",
        marginBottom: "6px"
    },

    text: {
        fontSize: "13px",
        color: "#374151"
    },

    footer: {
        textAlign: "center",
        padding: "20px",
        fontSize: "12px",
        color: "#6b7280"
    }
};