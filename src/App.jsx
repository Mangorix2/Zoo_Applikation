function App() {
  return (
    <main className="min-vh-100 bg-light">
      <header className="border-bottom bg-white">
        <div className="container py-3 d-flex align-items-center justify-content-between">
          <span className="fw-bold fs-5">Zoo Applikation</span>
          <span className="badge bg-success">Heute offen</span>
        </div>
      </header>

      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7 text-start">
            <p className="text-success text-uppercase small fw-semibold mb-2">Startseite</p>
            <h1 className="display-5 fw-bold mb-3">Willkommen im Zoo</h1>
            <p className="lead text-secondary mb-4">Infos fuer den Besuch auf einen Blick.</p>
            <div className="d-flex flex-wrap gap-2">
              <a className="btn btn-success btn-lg" href="#visit-info">
                Zum Inhalt
              </a>
              <a className="btn btn-outline-success btn-lg" href="#visit-info">
                Infos
              </a>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-3">Heute</h2>
                <div className="mb-3">
                  <div className="text-secondary small">Oeffnungszeiten</div>
                  <div className="fw-semibold">09:00 - 18:00 Uhr</div>
                </div>
                <div>
                  <div className="text-secondary small">Naechstes Highlight</div>
                  <div className="fw-semibold">Futterzeit bei den Loewen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5" id="visit-info">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <h2 className="h4 fw-bold mb-3">Infos</h2>
            <ul className="mb-0 text-secondary">
              <li>Tickets vor Ort oder online</li>
              <li>Gut erreichbar mit Bus, Bahn und Auto</li>
              <li>Frueh kommen fuer einen ruhigen Start</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
