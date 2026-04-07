import { Phone, Mail, Clock, Star } from 'lucide-react';

const mockDoctors = [
  { id: 'DR-101', name: 'Dr. Gregory House', specialty: 'Diagnostic Medicine', rating: 4.9, available: true, phone: '(555) 123-4567', email: 'g.house@medicare.com', image: 'GH' },
  { id: 'DR-102', name: 'Dr. Meredith Grey', specialty: 'General Surgery', rating: 4.8, available: false, phone: '(555) 234-5678', email: 'm.grey@medicare.com', image: 'MG' },
  { id: 'DR-103', name: 'Dr. Derek Shepherd', specialty: 'Neurosurgery', rating: 4.9, available: true, phone: '(555) 345-6789', email: 'd.shepherd@medicare.com', image: 'DS' },
  { id: 'DR-104', name: 'Dr. Miranda Bailey', specialty: 'General Surgery', rating: 4.7, available: true, phone: '(555) 456-7890', email: 'm.bailey@medicare.com', image: 'MB' },
  { id: 'DR-105', name: 'Dr. Allison Cameron', specialty: 'Immunology', rating: 4.6, available: false, phone: '(555) 567-8901', email: 'a.cameron@medicare.com', image: 'AC' },
  { id: 'DR-106', name: 'Dr. Robert Chase', specialty: 'Intensive Care', rating: 4.5, available: true, phone: '(555) 678-9012', email: 'r.chase@medicare.com', image: 'RC' },
];

const DoctorCard = ({ doctor, showToast, onViewProfile }) => (
  <div className="card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <div style={{ 
        width: '60px', 
        height: '60px', 
        borderRadius: '50%', 
        backgroundColor: 'var(--color-primary-dark)', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        fontWeight: '600'
      }}>
        {doctor.image}
      </div>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{doctor.name}</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: '0.25rem 0' }}>{doctor.specialty}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)', fontSize: '0.8rem', fontWeight: 500 }}>
          <Star size={14} fill="currentColor" /> {doctor.rating}
        </div>
      </div>
    </div>
    
    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
        <Phone size={14} /> {doctor.phone}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
        <Mail size={14} /> {doctor.email}
      </div>
    </div>
    
    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.25rem', 
        fontSize: '0.8rem', 
        color: doctor.available ? 'var(--color-success)' : 'var(--color-danger)',
        fontWeight: '500'
      }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
        {doctor.available ? 'Available' : 'In Surgery'}
      </span>
      <button onClick={() => onViewProfile(doctor)} style={{ 
        padding: '0.4rem 1rem', 
        backgroundColor: 'var(--color-surface-hover)', 
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.85rem',
        fontWeight: '500',
        color: 'var(--color-text-main)'
      }}>
        View Profile
      </button>
    </div>
  </div>
);

const DoctorsView = ({ showToast, onViewProfile }) => {
  return (
    <div className="fade-in">
      <div className="page-header">
        <h2 className="page-title">Medical Staff</h2>
        <p className="page-subtitle">View and manage hospital doctors and their availability.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {mockDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} showToast={showToast} onViewProfile={onViewProfile} />
        ))}
      </div>
    </div>
  );
};

export default DoctorsView;
