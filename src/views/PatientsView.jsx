import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const mockPatients = [
  { id: 'PT-001', name: 'Sarah Jenkins', age: 34, gender: 'Female', condition: 'Migraine', status: 'Stable', date: '2023-10-15' },
  { id: 'PT-002', name: 'Michael Chen', age: 45, gender: 'Male', condition: 'Fractured Arm', status: 'In Treatment', date: '2023-10-16' },
  { id: 'PT-003', name: 'Emma Watson', age: 28, gender: 'Female', condition: 'Checkup', status: 'Discharged', date: '2023-10-14' },
  { id: 'PT-004', name: 'James Rodriguez', age: 52, gender: 'Male', condition: 'Hypertension', status: 'Critical', date: '2023-10-17' },
  { id: 'PT-005', name: 'Linda Kim', age: 61, gender: 'Female', condition: 'Diabetes', status: 'Stable', date: '2023-10-12' },
];

const PatientsView = ({ showToast }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Stable': return 'var(--color-success)';
      case 'In Treatment': return 'var(--color-primary)';
      case 'Critical': return 'var(--color-danger)';
      case 'Discharged': return 'var(--color-text-muted)';
      default: return 'var(--color-text-main)';
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 className="page-title">Patients Directory</h2>
          <p className="page-subtitle">Manage and view all registered patients.</p>
        </div>
        <button onClick={() => showToast('Add Patient wizard opening...')} className="card" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none' }}>
          <Plus size={18} /> Add Patient
        </button>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
          <div className="search-bar" style={{ width: '300px', backgroundColor: 'var(--color-background)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-surface-hover)' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Patient Name</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Age / Gender</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Condition</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Admitted</th>
              </tr>
            </thead>
            <tbody>
              {mockPatients.map((patient, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{patient.id}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{patient.name}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{patient.age} / {patient.gender}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem' }}>{patient.condition}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.8rem', 
                      fontWeight: 600,
                      backgroundColor: `${getStatusColor(patient.status)}20`, /* 20% opacity */
                      color: getStatusColor(patient.status)
                    }}>
                      {patient.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{patient.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientsView;
