import { Search, Bell, Settings } from 'lucide-react';

const TopNavigation = ({ showToast }) => {
  return (
    <header className="topnav">
      <div className="search-bar">
        <Search size={18} color="var(--color-text-muted)" />
        <input type="text" placeholder="Search patients, doctors, or appointments..." />
      </div>
      
      <div className="user-profile">
        <button onClick={() => showToast('Notifications clicked')} className="icon-button" style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', position: 'relative' }}>
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: 'var(--color-danger)', width: '8px', height: '8px', borderRadius: '50%' }}></span>
        </button>
        <button onClick={() => showToast('Settings clicked')} className="icon-button" style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)' }}>
          <Settings size={20} />
        </button>
        <div className="avatar">
          AD
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
