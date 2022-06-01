export interface ISideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  active: string;
  setPage: (page: string) => void;
  admin?: boolean;
  open?: boolean;
  ToggleDrawer?: () => void;
}
