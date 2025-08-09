import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '../MainLayout';


interface MainLayoutWrapperProps {
  centerContent?: boolean;
  children?: ReactNode;
}

const MainLayoutWrapper = ({ centerContent = false, children }: MainLayoutWrapperProps) => {
  return (
    <MainLayout centerContent={centerContent}>
      {children ?? <Outlet />}
    </MainLayout>
  );
};

export default MainLayoutWrapper;
