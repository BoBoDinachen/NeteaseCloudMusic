import { FunctionComponent, useEffect } from "react";
import { getPersonalized, getBanner } from '~/services/api/recommend';

interface HelloProps {

}

const Hello: FunctionComponent<HelloProps> = () => {

  useEffect(() => {

    // getPersonalized({limit: 10}).then((res: any) => {
    //   console.log(res);

    // })
    // getBanner({ type: 0 }).then((res: any) => {
    //   console.log(res);
    // })

  }, [])

  return (
    <div className="text-center">
      你好世界！
    </div>
  );
}

export default Hello;