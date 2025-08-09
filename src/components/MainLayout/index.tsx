import { ReactNode } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

const MainLayout = ({
  centerContent = false,
  children,
}: {
  centerContent?: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: '-8px',
        
      }}
    >
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: '24px',
            display: 'flex',
            justifyContent: centerContent ? 'center' : 'flex-start',
            alignItems: 'flex-start',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
