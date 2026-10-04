import { useState } from "react";
import {
  Users,
  Ticket,
  Clock3,
  MapPin,
  ChevronRight,
  Bell,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Utensils,
  Building2,
  GraduationCap,
} from "lucide-react";
import "./App.css";

const services = [
  {
    id: 1,
    name: "Campus Canteen",
    icon: Utensils,
    wait: "8 min",
    people: 12,
    color: "orange",
  },
  {
    id: 2,
    name: "Student Office",
    icon: Building2,
    wait: "14 min",
    people: 7,
    color: "red",
  },
  {
    id: 3,
    name: "Academic Block",
    icon: GraduationCap,
    wait: "5 min",
    people: 4,
    color: "yellow",
  },
];

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [token, setToken] = useState(null);
  const [activePage, setActivePage] = useState("home");

  const takeToken = () => {
    if (!selectedService) return;

    const randomToken = Math.floor(Math.random() * 50) + 1;

    setToken({
      number: randomToken,
      service: selectedService.name,
      wait: selectedService.wait,
    });

    setActivePage("token");
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            Q
          </div>

          <div>
            <h1>QueueLess</h1>
            <span>CODEX</span>
          </div>
        </div>

        <nav>
          <button
            className={activePage === "home" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("home")}
          >
            <Sparkles size={19} />
            <span>Home</span>
          </button>

          <button
            className={activePage === "token" ? "nav-item active" : "nav-item"}
            onClick={() => token && setActivePage("token")}
          >
            <Ticket size={19} />
            <span>My Token</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="team-badge">
            <div className="team-dot">C</div>
            <div>
              <strong>Team CodeX</strong>
              <small>Hackathon 2026</small>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">SMART QUEUE SYSTEM</span>
            <h2>{activePage === "token" ? "Your Queue" : "Good morning!"}</h2>
          </div>

          <div className="top-actions">
            <button className="icon-button">
              <Bell size={19} />
            </button>

            <div className="avatar">C</div>
          </div>
        </header>

        {activePage === "home" && (
          <>
            {/* HERO */}
            <section className="hero">
              <div className="hero-content">
                <div className="update-pill">
                  <span></span>
                  LIVE QUEUE STATUS
                </div>

                <h3>
                  Skip the queue.
                  <br />
                  <em>Keep your time.</em>
                </h3>

                <p>
                  Take a digital token, monitor your position remotely,
                  and arrive exactly when it's your turn.
                </p>

                <div className="hero-stats">
                  <div>
                    <strong>23</strong>
                    <span>People waiting</span>
                  </div>

                  <div>
                    <strong>9 min</strong>
                    <span>Average wait</span>
                  </div>
                </div>
              </div>

              <div className="hero-art">
                <div className="orb orb-one"></div>
                <div className="orb orb-two"></div>

                <div className="floating-card">
                  <div className="mini-icon">
                    <Ticket size={21} />
                  </div>

                  <div>
                    <small>YOUR TOKEN</small>
                    <strong>Q-24</strong>
                  </div>

                  <CheckCircle2 className="success" size={22} />
                </div>

                <div className="queue-number">
                  <span>NOW SERVING</span>
                  <strong>Q-18</strong>
                </div>
              </div>
            </section>

            {/* SERVICES */}
            <section className="services-section">
              <div className="section-heading">
                <div>
                  <span className="section-label">AVAILABLE SERVICES</span>
                  <h3>Choose a queue</h3>
                </div>

                <div className="location">
                  <MapPin size={16} />
                  ICFAI Tech Campus
                </div>
              </div>

              <div className="service-grid">
                {services.map((service) => {
                  const Icon = service.icon;
                  const selected = selectedService?.id === service.id;

                  return (
                    <button
                      key={service.id}
                      className={`service-card ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <div className={`service-icon ${service.color}`}>
                        <Icon size={23} />
                      </div>

                      <div className="service-info">
                        <h4>{service.name}</h4>

                        <div className="service-meta">
                          <span>
                            <Users size={14} />
                            {service.people} waiting
                          </span>

                          <span>
                            <Clock3 size={14} />
                            {service.wait}
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={20} className="arrow" />
                    </button>
                  );
                })}
              </div>

              <button
                className="take-token"
                disabled={!selectedService}
                onClick={takeToken}
              >
                <Ticket size={19} />
                Take a Token
                <ArrowRight size={18} />
              </button>
            </section>
          </>
        )}

        {activePage === "token" && token && (
          <section className="token-page">
            <div className="token-card">
              <div className="token-top">
                <span>YOUR DIGITAL TOKEN</span>
                <CheckCircle2 size={25} />
              </div>

              <div className="token-number">
                <small>TOKEN</small>
                <strong>Q-{token.number}</strong>
              </div>

              <div className="token-service">
                <span>Service</span>
                <strong>{token.service}</strong>
              </div>

              <div className="position-box">
                <div>
                  <small>Estimated wait</small>
                  <strong>{token.wait}</strong>
                </div>

                <div>
                  <small>Status</small>
                  <strong className="waiting">Waiting</strong>
                </div>
              </div>

              <div className="progress">
                <div></div>
              </div>

              <p className="token-message">
                You can leave the queue area. We'll keep you updated
                when your turn is approaching.
              </p>

              <button
                className="back-button"
                onClick={() => setActivePage("home")}
              >
                ← Choose another service
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;