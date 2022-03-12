import { FunctionComponent } from "react";

interface PagingTollbarProps {
  pageNumber: number
  setPageNumber: (value: number) => void
}

const PagingTollbar: FunctionComponent<PagingTollbarProps> = (props) => {
  return (
    <div className="btn-group flex justify-center mt-10">
      <button className="btn btn-md">«</button>
      {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
          return (
            <button className={`
              btn btn-md
              ${props.pageNumber === item ? 'btn-active' : ''}
            `}
              key={index}
              onClick={() => {props.setPageNumber(item)}}
            >{item+1}</button>
          )
        })
      }
      <button className="btn btn-md">»</button>
    </div>
  );
}

export default PagingTollbar;