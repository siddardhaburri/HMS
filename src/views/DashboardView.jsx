
import { Users, UserRound, CalendarCheck, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const admissionData = [
  { name: 'Mon', patients: 40 },
  { name: 'Tue', patients: 60 },
  { name: 'Wed', patients: 45 },
  { name: 'Thu', patients: 80 },
  { name: 'Fri', patients: 55 },
  { name: 'Sat', patients: 90 },
  { name: 'Sun', patients: 75 },
];

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
          <div style={{ height: '250px', width: '100%', marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
                <Tooltip 
                  cursor={{ fill: 'var(--color-surface-hover)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)', color: 'var(--color-text-main)' }}
                />
                <Bar dataKey="patients" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
