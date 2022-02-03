import { FunctionComponent } from "react";

interface SideBarProps {
  
}
 
const SideBar: FunctionComponent<SideBarProps> = () => {
  return (
    <div className="border-r-2 border-gray-600 p-3">
      这是侧边栏
    </div>
  );
}
 
export default SideBar;