import { FunctionComponent } from "react";



interface Props {
 
}
 
const Main: FunctionComponent<Props> = (props) => {
  return (
    <div className="flex-1 flex justify-between relative">
      {props.children}
      
    </div>
  );
}
 
export default Main;