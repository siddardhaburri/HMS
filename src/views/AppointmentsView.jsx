import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, ChevronLeft, ChevronRight, Search, Plus, Trash2, X } from 'lucide-react';

const initialAppointments = [
  { id: 'APT-1', time: '09:00 AM', patient: 'Sarah Jenkins', doctor: 'Dr. Gregory House', type: 'Consultation', status: 'Upcoming' },
  { id: 'APT-2', time: '10:30 AM', patient: 'Michael Chen', doctor: 'Dr. Meredith Grey', type: 'Follow-up', status: 'In Progress' },
  { id: 'APT-3', time: '11:15 AM', patient: 'Emma Watson', doctor: 'Dr. Derek Shepherd', type: 'Checkup', status: 'Upcoming' },
  { id: 'APT-4', time: '01:00 PM', patient: 'James Rodriguez', doctor: 'Dr. Miranda Bailey', type: 'Surgery Prep', status: 'Upcoming' },
  { id: 'APT-5', time: '03:45 PM', patient: 'Linda Kim', doctor: 'Dr. Robert Chase', type: 'Consultation', status: 'Upcoming' },
];

const AppointmentsView = ({ showToast }) => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  const [newApt, setNewApt] = useState({
    time: '',
    patient: '',
    doctor: '',
    type: 'Consultation',
    status: 'Upcoming'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newApt.time || !newApt.patient || !newApt.doctor) {
      showToast('Please fill all required fields');
      return;
    }
    const newAppointment = {
      ...newApt,
      id: `APT-${Date.now()}`
    };
    setAppointments([...appointments, newAppointment]);
    setIsAdding(false);
    setNewApt({ time: '', patient: '', doctor: '', type: 'Consultation', status: 'Upcoming' });
    showToast('Appointment added successfully!');
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    showToast('Appointment deleted');
  };

  const filteredAppointments = appointments.filter(apt => 
    apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="page-title">Appointments</h2>
          <p className="page-subtitle">Schedule and view patient appointments.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-surface)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <button onClick={() => showToast('Previous Date')} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}><ChevronLeft size={18} /></button>
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>October 24, 2023</span>
            <button onClick={() => showToast('Next Date')} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}><ChevronRight size={18} /></button>
          </div>
          <button onClick={() => setIsAdding(true)} style={{ padding: '0.6rem 1.25rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> New Appointment
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarIcon size={18} color="var(--color-primary)" />
            Today's Schedule
          </h3>
          <div className="search-bar" style={{ width: '300px', backgroundColor: 'var(--color-background)', display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search appointments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'none', outline: 'none', width: '100%', marginLeft: '0.5rem', color: 'var(--color-text-main)' }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredAppointments.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No appointments found.
            </div>
          ) : (
            filteredAppointments.map((apt, index) => (
              <div key={apt.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '1.5rem', 
                borderBottom: index !== filteredAppointments.length - 1 ? '1px solid var(--color-border)' : 'none',
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
                  <button onClick={() => showToast(`Viewing appointment for ${apt.patient}`)} style={{ padding: '0.5rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                    View
                  </button>
                  <button onClick={() => handleDelete(apt.id)} style={{ padding: '0.5rem', background: 'none', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-md)', color: 'var(--color-danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isAdding && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', backgroundColor: 'var(--color-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Add New Appointment</h3>
              <button onClick={() => setIsAdding(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Time</label>
                <input 
                  type="text" 
                  placeholder="e.g. 10:00 AM" 
                  value={newApt.time} 
                  onChange={(e) => setNewApt({...newApt, time: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-main)' }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Patient Name</label>
                <input 
                  type="text" 
                  placeholder="Patient Name" 
                  value={newApt.patient} 
                  onChange={(e) => setNewApt({...newApt, patient: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-main)' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Doctor</label>
                <input 
                  type="text" 
                  placeholder="Doctor Name" 
                  value={newApt.doctor} 
                  onChange={(e) => setNewApt({...newApt, doctor: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-main)' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Type</label>
                  <select 
                    value={newApt.type} 
                    onChange={(e) => setNewApt({...newApt, type: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-main)' }}
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Checkup">Checkup</option>
                    <option value="Surgery Prep">Surgery Prep</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Status</label>
                  <select 
                    value={newApt.status} 
                    onChange={(e) => setNewApt({...newApt, status: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-main)' }}
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAdding(false)} style={{ padding: '0.75rem 1.5rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--color-text-main)' }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 500 }}>
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsView;
