import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import DashboardView from './views/DashboardView';
import PatientsView from './views/PatientsView';
import DoctorsView from './views/DoctorsView';
import DoctorProfileView from './views/DoctorProfileView';
import AppointmentsView from './views/AppointmentsView';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentView('doctor-profile');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView showToast={showToast} />;
      case 'patients':
        return <PatientsView showToast={showToast} />;
      case 'doctors':
        return <DoctorsView showToast={showToast} onViewProfile={handleViewDoctor} />;
      case 'doctor-profile':
        return <DoctorProfileView doctor={selectedDoctor} onBack={() => setCurrentView('doctors')} showToast={showToast} />;
      case 'appointments':
        return <AppointmentsView showToast={showToast} />;
      default:
        return <DashboardView showToast={showToast} />;
    }
  };

  return (
    <div className="layout">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="main-content">
        <TopNavigation showToast={showToast} />
        <main className="view-container">
          {renderView()}
        </main>
      </div>
      {toast && (
        <div className="toast-container">
          <div className="toast">{toast}</div>
        </div>
      )}
    </div>
  );
}

export default App;
