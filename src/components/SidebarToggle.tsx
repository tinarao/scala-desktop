import { SidebarTrigger } from "./ui/sidebar";

const SidebarToggle = () => {
  return (
    <SidebarTrigger
      title="Нажмите, чтобы переключить боковое меню"
      className="absolute bottom-4 ml-4"
    />
  );
};

export default SidebarToggle;
