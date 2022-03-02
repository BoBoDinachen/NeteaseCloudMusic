import { FunctionComponent } from "react";

interface LoadingProps {
  
}
 
const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <div className='absolute m-auto left-0 right-0 bottom-0 top-0 w-10 h-10 text-2xl'>
      Loading...
    </div>
  );
}
 
export default Loading;