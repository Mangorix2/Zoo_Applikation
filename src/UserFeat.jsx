import { useState, useEffect } from 'react';

export default function UserFeat() {
    // States für das Formular
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // States für die Tabelle
    const [users, setUsers] = useState([]);
    const [tableError, setTableError] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // 1. GET: Alle User automatisch laden
    useEffect(() => {
        fetchUsers();
    }, [refreshTrigger]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users');
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
            } else {
                setTableError('Fehler beim Laden der Besucher-Liste.');
            }
        } catch (err) {
            setTableError('Verbindung zum Server fehlgeschlagen. Läuft das Backend?');
        }
    };

    // 2. POST: Neuen User registrieren
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Besucher erfolgreich registriert!');
                setFormData({ username: '', email: '', first_name: '', last_name: '' });
                setRefreshTrigger(prev => prev + 1); // Tabelle neu laden
            } else {
                setIsError(true);
                setMessage(data.error || 'Ein Fehler ist aufgetreten.');
            }
        } catch (error) {
            setIsError(true);
            setMessage('Server nicht erreichbar.');
        }
    };

    // 3. DELETE: User löschen
    const handleDelete = async (id) => {
        if (!window.confirm(`Möchtest du den Besucher mit ID ${id} wirklich löschen?`)) return;

        try {
            const response = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setRefreshTrigger(prev => prev + 1);
            } else {
                const data = await response.json();
                alert(data.error || 'Fehler beim Löschen.');
            }
        } catch (err) {
            alert('Server nicht erreichbar.');
        }
    };

    return (
        <main className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <p className="text-success text-uppercase small fw-semibold mb-1">Verwaltung</p>
                        <h1 className="fw-bold h2 mb-0">Besucher-Datenbank (SQLite)</h1>
                    </div>
                    <button onClick={fetchUsers} className="btn btn-outline-secondary btn-sm">
                        Liste aktualisieren
                    </button>
                </div>

                <div className="row g-4">
                    {/* Formular-Spalte */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h2 className="h5 fw-bold mb-3">Neuer Eintrag</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small text-secondary">Benutzername *</label>
                                        <input 
                                            type="text" className="form-control" required
                                            value={formData.username} 
                                            onChange={e => setFormData({...formData, username: e.target.value})} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-secondary">E-Mail *</label>
                                        <input 
                                            type="email" className="form-control" required
                                            value={formData.email} 
                                            onChange={e => setFormData({...formData, email: e.target.value})} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-secondary">Vorname</label>
                                        <input 
                                            type="text" className="form-control" 
                                            value={formData.first_name} 
                                            onChange={e => setFormData({...formData, first_name: e.target.value})} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-secondary">Nachname</label>
                                        <input 
                                            type="text" className="form-control" 
                                            value={formData.last_name} 
                                            onChange={e => setFormData({...formData, last_name: e.target.value})} 
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success w-100 fw-semibold">
                                        Speichern
                                    </button>
                                </form>
                                {message && (
                                    <div className={`alert mt-3 mb-0 ${isError ? 'alert-danger' : 'alert-success'} py-2 small`}>
                                        {message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tabellen-Spalte */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h2 className="h5 fw-bold mb-3">Registrierte Besucher</h2>
                                
                                {tableError && <div className="alert alert-warning py-2 small">{tableError}</div>}

                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Username</th>
                                                <th>E-Mail</th>
                                                <th>Name</th>
                                                <th className="text-center">Aktion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="text-center text-muted py-4">
                                                        Keine Besucher registriert.
                                                    </td>
                                                </tr>
                                            ) : (
                                                users.map(user => (
                                                    <tr key={user.id}>
                                                        <td className="fw-bold text-secondary">{user.id}</td>
                                                        <td>{user.username}</td>
                                                        <td className="small text-truncate" style={{maxWidth: '150px'}}>{user.email}</td>
                                                        <td>{user.first_name || user.last_name ? `${user.first_name} ${user.last_name}` : '-'}</td>
                                                        <td className="text-center">
                                                            <button 
                                                                onClick={() => handleDelete(user.id)}
                                                                className="btn btn-sm btn-outline-danger px-2 py-1"
                                                            >
                                                                Löschen
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}