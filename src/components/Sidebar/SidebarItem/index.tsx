import { ReactElement } from 'react';
import { Tooltip } from '@mui/material';
import { useLoading } from '../../../context/loading.context';
import { MenuButton } from '../styles';


const SidebarItem = ({
  to,
  icon,
  label,
  collapsed,
}: {
  to: string;
  icon: ReactElement;
  label: string;
  collapsed: boolean;
}) => {
  const { showLoading, hideLoading } = useLoading();

  const handleClick = () => {
    showLoading();
    setTimeout(hideLoading, 1000);
  };

  const content = (
    <MenuButton to={to} onClick={handleClick} $collapsed={collapsed}>
      {icon}
      {!collapsed && <span>{label}</span>}
    </MenuButton>
  );

  return collapsed ? (
    <Tooltip title={label} placement="right" arrow>
      {content}
    </Tooltip>
  ) : (
    content
  );
};

export default SidebarItem;
