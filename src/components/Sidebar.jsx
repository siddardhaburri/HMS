import { LayoutDashboard, Users, UserRound, Calendar, HeartPulse } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'doctors', label: 'Doctors', icon: UserRound },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <HeartPulse size={32} className="logo-icon" />
        <h1 className="logo-text">MediCare</h1>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <IconComponent size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
