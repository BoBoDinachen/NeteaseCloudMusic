import { createContext, useReducer,useContext, FC } from 'react';
import { initialState,AppContextInterface,reducer} from './reducer'

// 上下文实例
const Context = createContext<AppContextInterface>({
  state: initialState,
  dispatch: (action) => action,
});

// 上下文组件
export const AppContextProvider: FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}

// 返回上下文的内容
export const useAppContext = () => {
  return useContext(Context);
};