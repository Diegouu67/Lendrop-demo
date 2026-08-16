import { useState } from "react";
import "./App.css";

const lockers = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

export default function App() {
  const [selectedLocker, setSelectedLocker] = useState(null);

  const handleReserve = () => {
    if (!selectedLocker) {
      alert("Selecciona un casillero antes de reservar.");
      return;
    }

    alert(`Has seleccionado el casillero ${selectedLocker}.`);
  };

  return (
    <div className="page">
      <header className="topbar">

        {/* LOGO DE LENDROP */}
        <a href="#" className="brand">
          <img
            src="/logo-lendrop.png"
            alt="Lendrop"
            className="logoImage"
          />
        </a>

        <nav className="nav">
          <a href="#">Cómo funciona</a>
          <a href="#">Categorías</a>
          <a href="#">Seguridad</a>
        </nav>

        <div className="actions">
          <button className="linkButton">Iniciar sesión</button>
          <button className="btn">Empezar</button>
        </div>
      </header>

      <main className="hero">
        <div className="heroLeft">

          <div className="kicker">
            RED DE CASILLEROS INTELIGENTES · EL SALVADOR
          </div>

          <h1>
            Alquila lo que
            <br />
            necesitas.
            <br />
            <span className="gradText">Sin coordinar con</span>
            <br />
            nadie.
          </h1>

          <p className="desc">
            Cámaras, herramientas, drones, bicicletas y mucho más. Reserva,
            paga y retira tus artículos en un locker inteligente cerca de ti.
          </p>

          <div className="ctaRow">
            <button className="btn btnPrimary">
              Explorar artículos
              <span>→</span>
            </button>

            <button className="btn btnGhost">
              Cómo funciona
            </button>
          </div>

          <div className="heroStats">
            <div className="stat">
              <strong>24/7</strong>
              <span>Acceso</span>
            </div>

            <div className="stat">
              <strong>100%</strong>
              <span>Seguro</span>
            </div>

            <div className="stat">
              <strong>+50</strong>
              <span>Artículos</span>
            </div>
          </div>

        </div>

        <div className="heroRight">
          <div className="terminalGlow"></div>

          <div className="terminalCard">

            <div className="terminalTop">
              <div>
                <span className="statusDot"></span>
                <span className="onlineText">ONLINE</span>
              </div>

              <span className="terminalId">LD-14</span>
            </div>

            <div className="terminalTitle">
              TERMINAL LD-14
              <span>San Salvador Centro</span>
            </div>

            <div className="grid">
              {lockers.map((locker) => (
                <button
                  key={locker}
                  className={`slot ${
                    selectedLocker === locker ? "selected" : ""
                  }`}
                  onClick={() => setSelectedLocker(locker)}
                >
                  <div className="slotNumber">{locker}</div>

                  <span className="slotStatus">
                    {selectedLocker === locker
                      ? "SELECCIONADO"
                      : "DISPONIBLE"}
                  </span>
                </button>
              ))}
            </div>

            <div className="terminalFooter">

              <div className="selection">
                {selectedLocker ? (
                  <>
                    <span>Casillero</span>
                    <strong>{selectedLocker}</strong>
                  </>
                ) : (
                  <>
                    <span>Selecciona</span>
                    <strong>un casillero</strong>
                  </>
                )}
              </div>

              <button
                className="btn btnSlot"
                onClick={handleReserve}
              >
                Reservar
              </button>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}