import { ArrowLeft, Phone, Mail, MapPin, Star, Calendar, Clock } from 'lucide-react';

const DoctorProfileView = ({ doctor, onBack, showToast }) => {
  if (!doctor) return null;

  return (
    <div className="fade-in">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'none', 
            border: '1px solid var(--color-border)', 
            borderRadius: 'var(--radius-md)', 
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-muted)'
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="page-title" style={{ margin: 0 }}>Doctor Profile</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        {/* Left Column: Profile Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--color-primary-dark)', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            {doctor.image}
          </div>
          <h2 style={{ marginBottom: '0.5rem' }}>{doctor.name}</h2>
          <p style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '1.1rem', margin: '0 0 1rem 0' }}>{doctor.specialty}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-warning)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '2rem' }}>
            <Star size={20} fill="currentColor" /> {doctor.rating} / 5.0
          </div>
          
          <button 
            onClick={() => showToast(`Opening schedule for ${doctor.name}`)}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 600, marginBottom: '1rem' }}
          >
            Book Appointment
          </button>
          <button 
            onClick={() => showToast(`Opening chat with ${doctor.name}`)}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: 'transparent', color: 'var(--color-text-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontWeight: 600 }}
          >
            Send Message
          </button>
        </div>

        {/* Right Column: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Contact Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-surface-hover)', borderRadius: '50%', color: 'var(--color-text-muted)' }}><Phone size={20} /></div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Phone Number</p>
                  <p style={{ margin: '0.25rem 0 0 0', fontWeight: 500 }}>{doctor.phone}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-surface-hover)', borderRadius: '50%', color: 'var(--color-text-muted)' }}><Mail size={20} /></div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Email Address</p>
                  <p style={{ margin: '0.25rem 0 0 0', fontWeight: 500 }}>{doctor.email}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', gridColumn: 'span 2' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-surface-hover)', borderRadius: '50%', color: 'var(--color-text-muted)' }}><MapPin size={20} /></div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Office Location</p>
                  <p style={{ margin: '0.25rem 0 0 0', fontWeight: 500 }}>Room 402, Building B, Main Hospital Wing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Professional Summary</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              {doctor.name} is an experienced professional specializing in {doctor.specialty}. 
              With over 15 years in the medical field, they have participated in numerous clinical trials and published over 40 peer-reviewed articles. 
              They are dedicated to providing excellent patient care through comprehensive diagnostic processes and innovative treatment plans.
            </p>
          </div>
          
          <div className="card">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
               <h3 style={{ margin: 0 }}>Availability Status</h3>
               <span style={{ 
                  padding: '0.35rem 1rem', 
                  borderRadius: '9999px', 
                  fontSize: '0.85rem', 
                  fontWeight: 600,
                  backgroundColor: doctor.available ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: doctor.available ? 'var(--color-success)' : 'var(--color-danger)'
                }}>
                  {doctor.available ? 'Currently Available' : 'In Surgery / Unavailable'}
                </span>
             </div>
             
             <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><Calendar size={16} /> Regular Working Days</p>
                  <p style={{ fontWeight: 500 }}>Monday - Thursday, Saturday</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><Clock size={16} /> Working Hours</p>
                  <p style={{ fontWeight: 500 }}>08:00 AM - 04:00 PM</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileView;
