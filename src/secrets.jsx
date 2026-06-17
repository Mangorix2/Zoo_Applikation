import { useState, useEffect } from "react"
import { Chess } from "chess.js"

const PIECES = {
    wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
    bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "♟"
}

function getSymbol(piece) {
    if (!piece) return ""
    return PIECES[piece.color + piece.type.toUpperCase()]
}

function getBestMove(game) {
    const moves = game.moves({ verbose: true })
    if (moves.length === 0) return null

    const scored = moves.map(move => {
        let score = Math.random() * 10

        if (move.captured) score += 30
        if (move.flags.includes("k") || move.flags.includes("q")) score += 20

        const copy = new Chess(game.fen())
        copy.move(move)

        if (copy.isCheck()) score += 25
        if (copy.isCheckmate()) score += 1000

        return { move, score }
    })

    scored.sort((a, b) => b.score - a.score)

    return scored[0].move
}

export default function App() {
    const [game, setGame] = useState(new Chess())
    const [from, setFrom] = useState(null)
    const [history, setHistory] = useState([])
    const [hints, setHints] = useState([])
    const [botMode, setBotMode] = useState("none")
    const [thinking, setThinking] = useState(false)

    const files = ["a","b","c","d","e","f","g","h"]
    const ranks = [8,7,6,5,4,3,2,1]

    useEffect(() => {
        if (game.isGameOver()) return

        const isBotTurn =
            (botMode === "black" && game.turn() === "b") ||
            (botMode === "both")

        if (isBotTurn) {
            setThinking(true)

            const timeout = setTimeout(() => {
                const copy = new Chess(game.fen())
                const move = getBestMove(copy)

                if (move) {
                    copy.move(move)
                    setGame(copy)
                    setHistory(h => [...h, move.san])
                }

                setThinking(false)
            }, 500)

            return () => clearTimeout(timeout)
        }
    }, [game, botMode])

    function handleClick(square) {
        if (thinking) return
        if (botMode === "both") return
        if (botMode === "black" && game.turn() === "b") return

        if (from === square) {
            setFrom(null)
            setHints([])
            return
        }

        if (!from) {
            const piece = game.get(square)

            if (piece && piece.color === game.turn()) {
                setFrom(square)

                const moves = game.moves({ square, verbose: true })
                setHints(moves.map(m => m.to))
            }
        } else {
            const piece = game.get(square)

            if (piece && piece.color === game.turn()) {
                setFrom(square)

                const moves = game.moves({ square, verbose: true })
                setHints(moves.map(m => m.to))
                return
            }

            try {
                const copy = new Chess(game.fen())

                const move = copy.move({
                    from,
                    to: square,
                    promotion: "q"
                })

                if (move) {
                    setGame(copy)
                    setHistory(h => [...h, move.san])
                }
            } catch(e) {}

            setFrom(null)
            setHints([])
        }
    }

    function reset() {
        setGame(new Chess())
        setFrom(null)
        setHistory([])
        setHints([])
        setThinking(false)
    }

    function getStatus() {
        if (thinking) return "Bot denkt nach..."

        if (game.isCheckmate()) {
            return "Schachmatt! " +
                (game.turn() === "w" ? "Schwarz" : "Weiss") +
                " gewinnt!"
        }

        if (game.isDraw()) return "Unentschieden!"
        if (game.isCheck()) return "Schach!"

        return game.turn() === "w"
            ? "Weiss ist dran"
            : "Schwarz ist dran"
    }

    const styles = {
        app: {
            background: "#0a0a0a",
            color: "#39ff14",
            minHeight: "100vh",
            fontFamily: "'Courier New', monospace",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px 16px",
            gap: "24px"
        },

        title: {
            fontSize: "36px",
            color: "#39ff14",
            textShadow: "0 0 10px #39ff14, 0 0 30px #39ff14",
            letterSpacing: "8px"
        },

        controls: {
            display: "flex",
            gap: "12px"
        },

        button: {
            padding: "8px 20px",
            background: "transparent",
            border: "1px solid #39ff14",
            color: "#39ff14",
            fontFamily: "'Courier New', monospace",
            cursor: "pointer",
            borderRadius: "4px"
        },

        activeButton: {
            background: "#39ff14",
            color: "#0a0a0a",
            fontWeight: "bold",
            boxShadow: "0 0 16px #39ff14"
        },

        main: {
            display: "flex",
            gap: "32px",
            alignItems: "flex-start"
        },

        boardWrap: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px"
        },

        status: {
            fontSize: "16px",
            textShadow: "0 0 8px #39ff14",
            letterSpacing: "2px"
        },

        board: {
            display: "grid",
            gridTemplateColumns: "repeat(8, 64px)",
            border: "2px solid #39ff14",
            boxShadow: "0 0 20px #39ff14"
        },

        square: {
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative"
        },

        light: {
            background: "#1a3a1a"
        },

        dark: {
            background: "#0d1f0d"
        },

        selected: {
            background: "#39ff1466"
        },

        hint: {
            background: "#1f4d1f"
        },

        pieceWhite: {
            fontSize: "40px",
            color: "#ffffff",
            textShadow: "0 0 6px #39ff14"
        },

        pieceBlack: {
            fontSize: "40px",
            color: "#39ff14",
            textShadow: "0 0 8px #39ff14"
        },

        dot: {
            position: "absolute",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#39ff1455",
            border: "1px solid #39ff14"
        },

        reset: {
            padding: "10px 32px",
            background: "transparent",
            border: "1px solid #ff3939",
            color: "#ff3939",
            fontFamily: "'Courier New', monospace",
            borderRadius: "4px",
            cursor: "pointer"
        },

        sidebar: {
            width: "180px",
            background: "#0d1f0d",
            border: "1px solid #39ff1444",
            borderRadius: "8px",
            padding: "16px",
            maxHeight: "560px",
            overflowY: "auto",
            boxShadow: "0 0 12px #39ff1422"
        },

        sidebarTitle: {
            fontSize: "14px",
            letterSpacing: "3px",
            marginBottom: "12px"
        },

        noMoves: {
            color: "#39ff1466",
            fontSize: "13px"
        },

        historyGrid: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4px"
        },

        historyItem: {
            padding: "4px 6px",
            fontSize: "13px",
            borderRadius: "3px"
        },

        whiteMove: {
            background: "#39ff1411"
        },

        blackMove: {
            color: "#39ff1488"
        },

        moveNum: {
            color: "#39ff1444",
            marginRight: "3px"
        }
    }

    return (
        <div style={styles.app}>
            <h1 style={styles.title}>♟ CHESS.EXE</h1>

            <div style={styles.controls}>
                <button
                    style={{
                        ...styles.button,
                        ...(botMode === "none" ? styles.activeButton : {})
                    }}
                    onClick={() => {
                        setBotMode("none")
                        reset()
                    }}
                >
                    2 Spieler
                </button>

                <button
                    style={{
                        ...styles.button,
                        ...(botMode === "black" ? styles.activeButton : {})
                    }}
                    onClick={() => {
                        setBotMode("black")
                        reset()
                    }}
                >
                    vs Bot
                </button>

                <button
                    style={{
                        ...styles.button,
                        ...(botMode === "both" ? styles.activeButton : {})
                    }}
                    onClick={() => {
                        setBotMode("both")
                        reset()
                    }}
                >
                    Bot vs Bot
                </button>
            </div>

            <div style={styles.main}>
                <div style={styles.boardWrap}>
                    <p style={styles.status}>{getStatus()}</p>

                    <div style={styles.board}>
                        {ranks.map(rank =>
                                files.map(file => {
                                    const square = file + rank
                                    const piece = game.get(square)

                                    const isLight =
                                        (files.indexOf(file) + rank) % 2 === 0

                                    const isSelected = from === square
                                    const isHint = hints.includes(square)

                                    return (
                                        <div
                                            key={square}
                                            onClick={() => handleClick(square)}
                                            style={{
                                                ...styles.square,
                                                ...(isLight ? styles.light : styles.dark),
                                                ...(isSelected ? styles.selected : {}),
                                                ...(isHint ? styles.hint : {})
                                            }}
                                        >
                                            {getSymbol(piece) && (
                                                <span
                                                    style={
                                                        piece.color === "w"
                                                            ? styles.pieceWhite
                                                            : styles.pieceBlack
                                                    }
                                                >
                        {getSymbol(piece)}
                      </span>
                                            )}

                                            {isHint && !piece && (
                                                <div style={styles.dot} />
                                            )}
                                        </div>
                                    )
                                })
                        )}
                    </div>

                    <button style={styles.reset} onClick={reset}>
                        ⟳ Neue Partie
                    </button>
                </div>

                <div style={styles.sidebar}>
                    <p style={styles.sidebarTitle}>Zughistorie</p>

                    {history.length === 0 && (
                        <p style={styles.noMoves}>
                            Noch keine Züge
                        </p>
                    )}

                    <div style={styles.historyGrid}>
                        {history.map((move, i) => (
                            <div
                                key={i}
                                style={{
                                    ...styles.historyItem,
                                    ...(i % 2 === 0
                                        ? styles.whiteMove
                                        : styles.blackMove)
                                }}
                            >
                                {i % 2 === 0 && (
                                    <span style={styles.moveNum}>
                    {Math.floor(i / 2) + 1}.
                  </span>
                                )}

                                {move}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}