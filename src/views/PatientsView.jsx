import { useState, useEffect } from 'react';
import { Search, Plus, Trash2, X } from 'lucide-react';

const defaultPatients = [
  { id: 'PT-001', name: 'Sarah Jenkins', age: 34, gender: 'Female', condition: 'Migraine', status: 'Stable', date: '2023-10-15' },
  { id: 'PT-002', name: 'Michael Chen', age: 45, gender: 'Male', condition: 'Fractured Arm', status: 'In Treatment', date: '2023-10-16' },
  { id: 'PT-003', name: 'Emma Watson', age: 28, gender: 'Female', condition: 'Checkup', status: 'Discharged', date: '2023-10-14' },
  { id: 'PT-004', name: 'James Rodriguez', age: 52, gender: 'Male', condition: 'Hypertension', status: 'Critical', date: '2023-10-17' },
  { id: 'PT-005', name: 'Linda Kim', age: 61, gender: 'Female', condition: 'Diabetes', status: 'Stable', date: '2023-10-12' },
];

const PatientsView = ({ showToast }) => {
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('patients');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse patients from local storage");
      }
    }
    return defaultPatients;
  });

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'Male',
    condition: '',
    status: 'Stable',
    date: new Date().toISOString().split('T')[0]
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Stable': return 'var(--color-success)';
      case 'In Treatment': return 'var(--color-primary)';
      case 'Critical': return 'var(--color-danger)';
      case 'Discharged': return 'var(--color-text-muted)';
      default: return 'var(--color-text-main)';
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.age || !newPatient.condition) {
      showToast('Please fill all required fields');
      return;
    }
    const pt = {
      ...newPatient,
      id: `PT-${Date.now().toString().slice(-4)}`
    };
    setPatients([...patients, pt]);
    setIsAdding(false);
    setNewPatient({ name: '', age: '', gender: 'Male', condition: '', status: 'Stable', date: new Date().toISOString().split('T')[0] });
    showToast('Patient added successfully!');
  };

  const handleDelete = (id) => {
    setPatients(patients.filter(p => p.id !== id));
    showToast('Patient deleted');
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 className="page-title">Patients Directory</h2>
          <p className="page-subtitle">Manage and view all registered patients.</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="card" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
          <Plus size={18} /> Add Patient
        </button>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
          <div className="search-bar" style={{ width: '300px', backgroundColor: 'var(--color-background)', display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'none', outline: 'none', width: '100%', marginLeft: '0.5rem', color: 'var(--color-text-main)' }}
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
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No patients found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient, index) => (
                  <tr key={patient.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background-color 0.2s' }}>
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
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <button onClick={() => handleDelete(patient.id)} style={{ padding: '0.5rem', background: 'none', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-md)', color: 'var(--color-danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAdding && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', backgroundColor: 'var(--color-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Add New Patient</h3>
              <button onClick={() => setIsAdding(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Patient Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe" 
                  value={newPatient.name} 
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-main)' }}
                  required
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Age</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 45" 
                    value={newPatient.age} 
                    onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-main)' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Gender</label>
                  <select 
                    value={newPatient.gender} 
                    onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-main)' }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Condition</label>
                <input 
                  type="text" 
                  placeholder="e.g. Broken Arm" 
                  value={newPatient.condition} 
                  onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-main)' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Status</label>
                <select 
                  value={newPatient.status} 
                  onChange={(e) => setNewPatient({...newPatient, status: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-main)' }}
                >
                  <option value="Stable">Stable</option>
                  <option value="In Treatment">In Treatment</option>
                  <option value="Critical">Critical</option>
                  <option value="Discharged">Discharged</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAdding(false)} style={{ padding: '0.75rem 1.5rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--color-text-main)' }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 500 }}>
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsView;
