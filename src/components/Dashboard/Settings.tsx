import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Layout, Database, Trash2 } from 'lucide-react';

interface Props {
  userData: any;
  setUserData: (u: any) => void;
}

const Settings = ({ userData, setUserData }: Props) => {
  const [fullName, setFullName] = useState(userData?.fullName || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  const [persistSidebar, setPersistSidebar] = useState<boolean>(() => {
    try {
      const s = localStorage.getItem('elitefit-settings');
      return s ? JSON.parse(s).persistSidebar ?? false : false;
    } catch (e) {
      return false;
    }
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    try {
      const s = localStorage.getItem('elitefit-settings');
      return s ? JSON.parse(s).notificationsEnabled ?? true : true;
    } catch (e) {
      return true;
    }
  });

  const handleSave = () => {
    const updated = {
      ...userData,
      fullName,
      email,
      phone,
      settings: {
        persistSidebar,
        notificationsEnabled,
      },
    };
    localStorage.setItem('elitefit-user', JSON.stringify(updated));
    localStorage.setItem('elitefit-settings', JSON.stringify({ persistSidebar, notificationsEnabled }));
    setUserData(updated);
    alert('Settings saved');
  };

  const handleLogout = () => {
    localStorage.removeItem('elitefit-user');
    window.location.href = '/auth';
  };

  const handleDeleteAccount = () => {
    if (!confirm('Delete account and all local data? This cannot be undone.')) return;
    localStorage.removeItem('elitefit-user');
    localStorage.removeItem('elitefit-settings');
    alert('Account data removed from this browser');
    window.location.href = '/';
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-gym-darker/50 border border-gym-dark/30 rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-accent to-accent/70 rounded-lg">
            <User size={22} className="text-gym-dark" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gym-light">Profile & Account</h3>
            <p className="text-sm text-gym-gray">Update your personal info and preferences.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="col-span-1 md:col-span-3 px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50"
            placeholder="Full name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50"
            placeholder="Email"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50"
            placeholder="Phone"
          />
        </div>

        <div className="flex items-center gap-4 mt-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={persistSidebar} onChange={(e) => setPersistSidebar(e.target.checked)} className="w-4 h-4 accent-accent rounded" />
            <span className="text-gym-gray text-sm">Persist sidebar state across sessions</span>
          </label>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)} className="w-4 h-4 accent-accent rounded" />
            <span className="text-gym-gray text-sm">Enable notifications</span>
          </label>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button onClick={handleSave} className="bg-accent text-gym-dark font-bold px-4 py-2 rounded-lg">Save Changes</button>
          <button onClick={handleLogout} className="bg-gym-dark/50 border border-gym-dark/20 text-gym-gray px-4 py-2 rounded-lg">Logout</button>
          <button onClick={handleDeleteAccount} className="ml-auto bg-red-500 text-white px-4 py-2 rounded-lg">Delete Account</button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-400/10 to-cyan-400/10 border border-blue-400/20 rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg">
            <Bell size={22} className="text-gym-dark" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gym-light">Notifications</h3>
            <p className="text-sm text-gym-gray">Control what you want to be notified about.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)} className="w-4 h-4 accent-accent rounded" />
            <span className="text-gym-gray text-sm">Workout reminders</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)} className="w-4 h-4 accent-accent rounded" />
            <span className="text-gym-gray text-sm">Meal reminders</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)} className="w-4 h-4 accent-accent rounded" />
            <span className="text-gym-gray text-sm">Weekly progress summary</span>
          </label>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-gym-darker/50 border border-gym-dark/30 rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-accent to-accent/70 rounded-lg">
            <Layout size={22} className="text-gym-dark" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gym-light">Data & Export</h3>
            <p className="text-sm text-gym-gray">Download or clear local data stored by this app.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => {
            const data = {
              user: JSON.parse(localStorage.getItem('elitefit-user') || 'null'),
              settings: JSON.parse(localStorage.getItem('elitefit-settings') || 'null')
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'elitefit-data.json';
            a.click();
            URL.revokeObjectURL(url);
          }} className="bg-accent text-gym-dark font-bold px-4 py-2 rounded-lg">Export Data</button>

          <button onClick={() => {
            if (!confirm('Clear all local data?')) return;
            localStorage.removeItem('elitefit-user');
            localStorage.removeItem('elitefit-settings');
            alert('Local data cleared');
            window.location.reload();
          }} className="bg-red-500 text-white px-4 py-2 rounded-lg">Clear Local Data</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
