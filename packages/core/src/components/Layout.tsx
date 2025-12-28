import React from 'react';
import './Layout.css';

interface LayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ sidebar, content }) => {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Pixel Sorter</h1>
        </div>
        <div className="sidebar-content">
          {sidebar}
        </div>
      </aside>
      <main className="main-content">
        {content}
      </main>
    </div>
  );
};
