import { Calendar as CalendarIcon, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';

const mockAppointments = [
  { id: 'APT-1', time: '09:00 AM', patient: 'Sarah Jenkins', doctor: 'Dr. Gregory House', type: 'Consultation', status: 'Upcoming' },
  { id: 'APT-2', time: '10:30 AM', patient: 'Michael Chen', doctor: 'Dr. Meredith Grey', type: 'Follow-up', status: 'In Progress' },
  { id: 'APT-3', time: '11:15 AM', patient: 'Emma Watson', doctor: 'Dr. Derek Shepherd', type: 'Checkup', status: 'Upcoming' },
  { id: 'APT-4', time: '01:00 PM', patient: 'James Rodriguez', doctor: 'Dr. Miranda Bailey', type: 'Surgery Prep', status: 'Upcoming' },
  { id: 'APT-5', time: '03:45 PM', patient: 'Linda Kim', doctor: 'Dr. Robert Chase', type: 'Consultation', status: 'Upcoming' },
];

const AppointmentsView = ({ showToast }) => {
  return (
    <div className="fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="page-title">Appointments</h2>
          <p className="page-subtitle">Schedule and view patient appointments.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-surface)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <button onClick={() => showToast('Previous Date')} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)' }}><ChevronLeft size={18} /></button>
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>October 24, 2023</span>
            <button onClick={() => showToast('Next Date')} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)' }}><ChevronRight size={18} /></button>
          </div>
          <button onClick={() => showToast('New Appointment scheduler opening...')} style={{ padding: '0.6rem 1.25rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 500 }}>
            New Appointment
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarIcon size={18} color="var(--color-primary)" />
            Today's Schedule
          </h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {mockAppointments.map((apt, index) => (
            <div key={apt.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '1.5rem', 
              borderBottom: index !== mockAppointments.length - 1 ? '1px solid var(--color-border)' : 'none',
              gap: '2rem'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '100px' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{apt.time}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={12} /> 45 min
                </span>
              </div>
              
              <div style={{ width: '4px', height: '40px', backgroundColor: apt.status === 'In Progress' ? 'var(--color-warning)' : 'var(--color-primary)', borderRadius: '2px' }}></div>
              
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr', gap: '1rem', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{apt.patient}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Patient</div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={14} color="var(--color-text-muted)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{apt.doctor}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{apt.type}</div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    backgroundColor: apt.status === 'In Progress' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(14, 165, 233, 0.1)',
                    color: apt.status === 'In Progress' ? 'var(--color-warning)' : 'var(--color-primary)'
                  }}>
                    {apt.status}
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => showToast(`Viewing appointment for ${apt.patient}`)} style={{ padding: '0.5rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)' }}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsView;
