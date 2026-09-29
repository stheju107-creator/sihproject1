import React, { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { UserRole } from '../../types';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const RoleContext = createContext<RoleContextType>({
  role: 'District Planner',
  setRole: () => {},
});

export const useRole = () => useContext(RoleContext);

export const MainLayout: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('District Planner');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <RoleContext.Provider value={{ role: currentRole, setRole: setCurrentRole }}>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        {/* Top Header */}
        <Header
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Global Operational Status Bar */}
        <StatusBar />

        {/* Main Work Area: Sidebar + Scrollable Content */}
        <div className="flex-1 flex overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            onCloseMobile={() => setIsSidebarOpen(false)}
          />

          <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5 max-w-[1720px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </RoleContext.Provider>
  );
};
