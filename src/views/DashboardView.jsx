import { Users, UserRound, CalendarCheck, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="card fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>{title}</p>
      <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{value}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
        <TrendingUp size={14} color="var(--color-success)" />
        <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>{trend}</span>
        <span style={{ color: 'var(--color-text-muted)' }}>vs last month</span>
      </div>
    </div>
    <div style={{ 
      backgroundColor: `var(${colorClass})`, 
      padding: '1rem', 
      borderRadius: 'var(--radius-lg)',
      color: 'white'
    }}>
      <Icon size={28} />
    </div>
  </div>
);

const DashboardView = () => {
  const stats = [
    { title: 'Total Patients', value: '2,451', icon: Users, trend: '+4.2%', colorClass: '--color-primary' },
    { title: 'Available Doctors', value: '42', icon: UserRound, trend: '+2.1%', colorClass: '--color-secondary' },
    { title: 'Appointments Today', value: '186', icon: CalendarCheck, trend: '+12.5%', colorClass: '--color-warning' },
  ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <h2 className="page-title">Dashboard Overview</h2>
        <p className="page-subtitle">Welcome back! Here's the general status for today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Patient Admissions</h3>
          {/* Simple CSS Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '1rem', paddingTop: '1rem' }}>
            {[40, 60, 45, 80, 55, 90, 75].map((height, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '100%', 
                  height: `${height}%`, 
                  backgroundColor: 'var(--color-primary)', 
                  borderRadius: '4px',
                  transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}></div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Activities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { time: '10:42 AM', msg: 'Dr. Smith finished surgery' },
              { time: '09:15 AM', msg: 'New patient registered: Emma W.' },
              { time: '08:30 AM', msg: 'Ambulance dispatched to Site A' },
              { time: '07:45 AM', msg: 'Shift change completed' }
            ].map((act, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', borderBottom: i !== 3 ? '1px solid var(--color-border)' : 'none', paddingBottom: i !== 3 ? '1rem' : 0 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{act.time}</div>
                <div style={{ fontSize: '0.9rem' }}>{act.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
