import { useMemo, useState } from "react";
import { activity, metrics, navItems, projects } from "./data";

function Header() {
  return (
    <header className="topbar panel enter-fade">
      <div className="brand">
        <div className="brand-badge">F</div>
        <div>
          <h1>Firebase Studio</h1>
          <p>Build, monitor, and ship with confidence</p>
        </div>
      </div>
      <button className="primary-btn">Create Project</button>
    </header>
  );
}

function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar panel enter-rise">
      <h2>Workspace</h2>
      <nav>
        {navItems.map((item) => (
          <button
            key={item}
            className={active === item ? "nav-item active" : "nav-item"}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function MetricCards({ selected, onSelect }) {
  return (
    <section className="metrics-grid">
      {metrics.map((metric, index) => (
        <article
          key={metric.title}
          className={selected === index ? "metric-card panel selected" : "metric-card panel"}
          onMouseEnter={() => onSelect(index)}
          onFocus={() => onSelect(index)}
          tabIndex={0}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <p>{metric.title}</p>
          <h3>{metric.value}</h3>
          <span className={metric.tone === "good" ? "trend good" : "trend neutral"}>{metric.trend}</span>
        </article>
      ))}
    </section>
  );
}

function ProjectList({ tab }) {
  return (
    <section className="panel projects enter-rise">
      <div className="section-head">
        <h2>Projects</h2>
        <span className="tag">{tab}</span>
      </div>
      <div className="rows">
        {projects.map((project, index) => (
          <article className="row" key={project.name} style={{ animationDelay: `${index * 70}ms` }}>
            <div>
              <h3>{project.name}</h3>
              <p>{project.users} active users</p>
            </div>
            <div className="row-meta">
              <span className="pill">{project.env}</span>
              <span className="growth">{project.growth}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActivityFeed() {
  return (
    <section className="panel activity enter-rise">
      <div className="section-head">
        <h2>Recent Activity</h2>
      </div>
      <ul>
        {activity.map((entry, index) => (
          <li key={entry} style={{ animationDelay: `${index * 60}ms` }}>
            <span className="dot" />
            {entry}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedMetric, setSelectedMetric] = useState(0);

  const pageTitle = useMemo(() => `${activeTab} Dashboard`, [activeTab]);

  return (
    <div className="app-shell">
      <div className="bg-shape bg-one" />
      <div className="bg-shape bg-two" />
      <Header />
      <main className="layout">
        <Sidebar active={activeTab} onChange={setActiveTab} />
        <section className="main-content">
          <h2 className="page-title enter-fade">{pageTitle}</h2>
          <MetricCards selected={selectedMetric} onSelect={setSelectedMetric} />
          <div className="split-layout">
            <ProjectList tab={activeTab} />
            <ActivityFeed />
          </div>
        </section>
      </main>
    </div>
  );
}
