import React, { useState } from 'react';

export default function Billetseite() {
    const TICKET_TYPES = [
        { id: 'adult', name: 'Erwachsenen-Ticket', price: 25 },
        { id: 'child', name: 'Kinder-Ticket (unter 16)', price: 12 },
        { id: 'student', name: 'Studierende / Lernende', price: 18 }
    ];

    const [quantities, setQuantities] = useState({ adult: 1, child: 0, student: 0 });
    const [visitDate, setVisitDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [reservationData, setReservationData] = useState(null);


    const handleQuantity = (id, change) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(0, prev[id] + change)
        }));
    };


    const totalPrice = TICKET_TYPES.reduce((sum, ticket) => {
        return sum + (quantities[ticket.id] * ticket.price);
    }, 0);


    const handleReservation = (e) => {
        e.preventDefault();
        if (!customerName) return alert('Bitte gib einen Namen für die Reservierung ein.');
        if (!visitDate) return alert('Bitte wähle dein Anreisedatum aus.');
        if (totalPrice === 0) return alert('Bitte wähle mindestens ein Ticket aus.');

        const qrPayload = encodeURIComponent(
            `ZOO-TICKET\n` +
            `Besucher: ${customerName}\n` +
            `Datum: ${visitDate}\n` +
            `Tickets: E:${quantities.adult} | K:${quantities.child} | S:${quantities.student}\n` +
            `Total: CHF ${totalPrice}.00\n` +
            `Status: GUELTIG`
        );


        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrPayload}`;

        setReservationData({
            name: customerName,
            date: visitDate,
            qrUrl: qrCodeUrl,
            total: totalPrice
        });
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.cardContainer}>

                {/* Linke Seite: Formular */}
                <div style={styles.formSection}>
                    <h2 style={styles.title}>Billetseite</h2>

                    <form onSubmit={handleReservation} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Name Hauptreisender</label>
                            <input
                                type="text"
                                placeholder="z.B. Jonas Schmid"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                style={styles.textInput}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Anreisedatum (Für den stressfreien Einlass)</label>
                            <input
                                type="date"
                                value={visitDate}
                                onChange={(e) => setVisitDate(e.target.value)}
                                style={styles.textInput}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        <div style={styles.ticketList}>
                            <label style={styles.label}>Tickets auswählen</label>
                            {TICKET_TYPES.map(ticket => (
                                <div key={ticket.id} style={styles.ticketRow}>
                                    <div style={styles.ticketMeta}>
                                        <div>
                                            <div style={styles.ticketName}>{ticket.name}</div>
                                            <div style={styles.ticketPrice}>CHF {ticket.price}.00</div>
                                        </div>
                                    </div>
                                    <div style={styles.counterGroup}>
                                        <button type="button" onClick={() => handleQuantity(ticket.id, -1)} style={styles.counterBtn}>-</button>
                                        <span style={styles.counterValue}>{quantities[ticket.id]}</span>
                                        <button type="button" onClick={() => handleQuantity(ticket.id, 1)} style={styles.counterBtn}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={styles.priceRow}>
                            <span>Gesamtsumme:</span>
                            <span style={styles.totalPrice}>CHF {totalPrice}.00</span>
                        </div>

                        <button type="submit" style={styles.submitBtn}>
                            Tickets reservieren & QR-Code abrufen
                        </button>
                    </form>
                </div>

                {/* Rechte Seite: Live QR-Code Ticket-Ausgabe */}
                <div style={styles.ticketOutputSection}>
                    {reservationData ? (
                        <div style={styles.liveTicket}>
                            <div style={styles.ticketHeader}>
                                <h3>ZOO-EINTRITTSBILLET</h3>
                                <p>Präsentieren Sie diesen Code am Einlass</p>
                            </div>

                            <div style={styles.qrContainer}>
                                <img src={reservationData.qrUrl} alt="Zoo Ticket QR Code" style={styles.qrImage} />
                            </div>

                            <div style={styles.ticketDetails}>
                                <p><strong>Kunde:</strong> {reservationData.name}</p>
                                <p><strong>Anreisetag:</strong> {new Date(reservationData.date).toLocaleDateString('de-CH')}</p>
                                <p><strong>Betrag:</strong> CHF {reservationData.total}.00</p>
                            </div>
                        </div>
                    ) : (
                        <div style={styles.emptyTicketState}>
                            <h3>Dein QR-Code Ticket</h3>
                            <p>Fülle das Formular aus, um dein digitales Ticket inklusive QR-Code sofort zu generieren.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

const styles = {
    pageWrapper: { fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    cardContainer: { backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', display: 'flex', maxWidth: '900px', width: '100%', overflow: 'hidden', flexWrap: 'wrap' },
    formSection: { flex: '1', padding: '40px', minWidth: '320px', borderRight: '1px solid #f1f5f9' },
    ticketOutputSection: { flex: '1', padding: '40px', backgroundColor: '#fafafa', minWidth: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    title: { margin: '0 0 10px 0', fontSize: '24px', color: '#0f172a' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '13px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' },
    textInput: { padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '15px' },
    ticketList: { display: 'flex', flexDirection: 'column', gap: '12px' },
    ticketRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '8px' },
    ticketMeta: { display: 'flex', alignItems: 'center', gap: '12px' },
    ticketName: { fontSize: '14px', fontWeight: '600', color: '#1e293b' },
    ticketPrice: { fontSize: '12px', color: '#64748b' },
    counterGroup: { display: 'flex', alignItems: 'center', gap: '12px' },
    counterBtn: { width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer', fontWeight: 'bold' },
    counterValue: { fontSize: '15px', fontWeight: 'bold', minWidth: '15px', textAlign: 'center' },
    priceRow: { display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginTop: '10px', borderTop: '2px dashed #e2e8f0', paddingTop: '15px' },
    totalPrice: { color: '#16a34a' },
    submitBtn: { padding: '14px', backgroundColor: '#008000', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s' },
    emptyTicketState: { textAlign: 'center', color: '#94a3b8', padding: '20px' },
    liveTicket: { backgroundColor: '#fff', border: '2px solid #e2e8f0', borderRadius: '12px', width: '100%', maxWidth: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' },
    ticketHeader: { backgroundColor: '#0f172a', color: '#fff', padding: '15px', textAlign: 'center' },
    qrContainer: { display: 'flex', justifyContent: 'center', padding: '25px', backgroundColor: '#fff', borderBottom: '1px dashed #e2e8f0' },
    qrImage: { display: 'block', width: '180px', height: '180px' },
    ticketDetails: { padding: '20px', fontSize: '14px', color: '#334155', lineHeight: '1.6' },
};