import { FunctionComponent, useEffect } from "react";

/**
 * 组件属性
 */
interface PageinationProps {
  activePage: number // 当前页
  totalPage: number // 总页数
  setActivePage: (index: number) => void // 设置当前页
}

const Pageination: FunctionComponent<PageinationProps> = (props) => {

  useEffect(() => { 
  },[])

  return (
    <div className="btn-group w-full flex justify-center mt-5">
      <button className="btn">«</button>
      {
        props.totalPage >= 8 ?
          Array.from({ length: props.totalPage }).map((item, index) => {
            if (index <= 6) {
              return <button key={index} onClick={() => {props.setActivePage(index+1)}} className={`btn ${props.activePage === index+1?'btn-active':''}`}>{index + 1}</button>
            }

            if (index == props.totalPage - 2) {
              return (
                <button key={index} className="btn btn-disabled">...</button>
              )
            }
            if (index == props.totalPage - 1) {
              return (
                <button key={index + 1} onClick={() => {props.setActivePage(index+1)}} className={`btn ${props.activePage === index+1 ? 'btn-active' : ''}`}>{props.totalPage}</button>
              )
            }
          }) :
          Array.from({ length: props.totalPage }).map((item, index) => {
            return (
              <button key={index} onClick={() => {props.setActivePage(index+1)}} className={`btn ${props.activePage === index+1 ? 'btn-active' : ''}`}>{index + 1}</button>
            )
          })
      }
      <button className="btn">»</button>
    </div>
  );
}

export default Pageination;