import { Dispatch } from "react";


interface stateType {
  showLoginBox?: boolean, // 显示登录盒子
  showPlayList?: boolean, // 显示当前播放列表
  showDrawer: boolean, // 显示当前的用户信息抽屉
  showMusicDetails?: boolean, // 显示当前音乐的详情页
  showSearchWindow?: boolean, // 显示搜索窗口
  showLyric?: boolean, // 显示歌词
  playSoundId: number, // 当前播放的音乐id
  autoPlay: boolean, // 是否自动播放音乐
  currentVolume: number, // 当前音量
  currentLyric: string, // 当前歌词
  searchWords: string // 当前搜索关键词
}
/**
 * 全局状态
 */
const initialState: stateType = {
  showLoginBox: false,
  showPlayList: false,
  showDrawer: false,
  showMusicDetails: false,
  showSearchWindow: false,
  showLyric: false,
  playSoundId: 1815341568,
  autoPlay: false,
  currentVolume: 70,
  currentLyric: '歌词',
  searchWords: ''
};

/**
 * 全局上下文的类型
 */
export interface AppContextInterface {
  state: stateType,
  dispatch: Dispatch<ACTIONTYPE>
}

/**
 * action执行单元
 * @param type 类型 
 * @param payload 携带数据
 */
type ACTIONTYPE =
  | { type: 'setShowLoginBox'; payload: boolean }
  | { type: 'setShowPlayList'; payload: boolean }
  | { type: 'setShowDrawer'; payload: boolean }
  | { type: 'setShowMusicDetails'; payload: boolean }
  | { type: 'setShowSearchWindow'; payload: boolean }
  | { type: 'setShowLyric'; payload: boolean }
  | { type: 'setPlaySoundId'; playload: number }
  | { type: 'setAutoPlay'; playload: boolean }
  | { type: 'setCurrentVolume'; playload: number }
  | { type: 'setCurrentLyric'; playload: string }
  | { type: 'setSearchWords'; playload: string }
  | { type: 'initial' };

/**
 * 处理每个action，去操作状态
 * @param state 
 * @param action 
 * @returns state状态
 */
function reducer(state: stateType, action: ACTIONTYPE) {
  switch (action.type) {
    case 'setShowLoginBox':
      return {
        ...state,
        showLoginBox: action.payload
      }
    case 'setShowPlayList':
      return {
        ...state,
        showPlayList: action.payload
      }
    case 'setShowDrawer':
      return {
        ...state,
        showDrawer: action.payload
      }
    case 'setShowMusicDetails':
      return {
        ...state,
        showMusicDetails: action.payload
      }
    case 'setShowSearchWindow':
      return {
        ...state,
        showSearchWindow: action.payload
      }
    case 'setShowLyric':
      return {
        ...state,
        showLyric: action.payload
      }
    case 'setPlaySoundId':
      return {
        ...state,
        playSoundId: action.playload
      }
    case 'setAutoPlay':
      return {
        ...state,
        autoPlay: action.playload
      }
    case 'setCurrentVolume':
      return {
        ...state,
        currentVolume: action.playload
      }
    case 'setCurrentLyric':
      return {
        ...state,
        currentLyric: action.playload
      }
    case 'setSearchWords':
      return {
        ...state,
        searchWords: action.playload
      }
    default:
      throw new Error();
  }
}

export { initialState, reducer }