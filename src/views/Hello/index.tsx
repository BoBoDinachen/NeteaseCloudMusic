import { FunctionComponent } from "react";

interface HelloProps {
  
}
 
const Hello: FunctionComponent<HelloProps> = () => {
  return (
    <div className="text-center">
      你好世界！
    </div>
  );
}
 
export default Hello;