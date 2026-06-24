import "./Zoo.css";
import { useEffect, useState } from "react";

export default function ReviewPage() {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [reviews, setReviews] = useState([]);

    const loadReviews = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/ratings");
            const data = await response.json();
            setReviews(data);
        } catch (err) {
            console.error("Fehler beim Laden:", err);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            alert("Bitte eine Sternebewertung auswählen.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/ratings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    stars: rating,
                    text: text.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Etwas ist schiefgelaufen.");
            }

            setRating(0);
            setText("");
            loadReviews();

        } catch (err) {
            alert(err.message);
        }
    };

    // Berechnungen für die UI
    const average = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
        : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        count: reviews.filter((r) => r.stars === stars).length,
    }));

    const maxCount = Math.max(...ratingDistribution.map((r) => r.count), 1);

    return (
        <div className="zoo-page">
            <div className="zoo-wrapper">
                <div className="zoo-label">Besuchermeinungen</div>
                <h1 className="zoo-title">Bewertungen</h1>
                <p className="zoo-subtitle">Teile deine Erfahrungen mit anderen Besuchern.</p>

                {/* Formular-Card */}
                <div className="zoo-card">
                    <h2>Neue Bewertung</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={star <= rating ? "star active" : "star"}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            placeholder="Optionaler Kommentar..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button type="submit" className="review-btn">
                            Bewertung absenden
                        </button>
                    </form>
                </div>

                {/* Statistik-Card */}
                <div className="zoo-card">
                    <h2>Bewertungsübersicht</h2>
                    <div className="review-summary">
                        <div className="review-average">
                            <span className="review-average-number">{average}</span>
                            <span className="review-average-star">⭐</span>
                        </div>
                        <div className="review-count">{reviews.length} Bewertungen</div>
                    </div>

                    <div className="rating-breakdown">
                        {ratingDistribution.map((item) => (
                            <div key={item.stars} className="rating-row">
                                <span className="rating-label">{item.stars} ★</span>
                                <div className="rating-bar">
                                    <div
                                        className="rating-fill"
                                        style={{ width: `${(item.count / maxCount) * 100}%` }}
                                    />
                                </div>
                                <span className="rating-value">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Liste aller Bewertungen */}
                <div className="zoo-card">
                    <h2>Alle Bewertungen</h2>
                    {reviews.length === 0 ? (
                        <p>Noch keine Bewertungen vorhanden.</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="review-item">
                                <div className="review-stars">
                                    {"★".repeat(review.stars)}
                                    {"☆".repeat(5 - review.stars)}
                                </div>
                                {review.text && <p>{review.text}</p>}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}