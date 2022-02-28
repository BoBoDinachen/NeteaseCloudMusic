import { FunctionComponent, useEffect, useState, Suspense } from "react";

import { Search, Music, Entertainment, Record } from '@icon-park/react';
import axios from 'axios';
// **************************************** 导入组件和hooks
import { useAppContext } from '~/context/AppContext';
import { search, getSearchSuggestList } from '~/services/api/search';
import { SongType, SearchSuggestType } from '~/types/index';
import { useGetState, useUpdateEffect } from "ahooks";


interface SearchResultProps {

}

const SearchResult: FunctionComponent<SearchResultProps> = () => {
  const { state, dispatch } = useAppContext();
  const [searchLimitList, setSearchLimitList] = useState<SongType[]>([]); // 默认搜索的十条结果
  const [searchSuggestList, setSearchSuggestList, getSuggestList] = useGetState<SearchSuggestType>({
    albums: [],
    artists: [],
    songs: []
  }); // 搜索到的推荐
  /**
   * 搜索时加载数据
   */
  useEffect(() => {
    let isUnmounted = false;

    console.log("搜索结果组件加载....");
    // 获取默认的十条搜索数据
    (async () => {
      let res: any = await search({ keywords: state.searchWords, limit: 10 });
      let songList: SongType[] = [];
      if (res.code === 200) {
        res.result.songs.forEach((item: any, index: number) => {
          let song: SongType = {
            id: item.id,
            name: item.name,
            artists: item.artists[0].name
          }
          songList.push(song);
        });
        if (!isUnmounted) {
          setSearchLimitList(songList)
        }
      }
      // // 获取建议的搜索结果  单曲---歌手---专辑
      let res1: any = await getSearchSuggestList({ keywords: state.searchWords });
      if (res1.code === 200) {
        let suggestList: SearchSuggestType = {
          albums: res1.result.albums ? res1.result.albums : [],
          artists: res1.result.artists ? res1.result.artists : [],
          songs: res1.result.songs ? res1.result.songs : []
        }
        if (!isUnmounted) {
          setSearchSuggestList(suggestList);
        }
      }
    })()

    return () => {
      isUnmounted = true;
    }
  }, [state.searchWords])

  /**
   * 点击对应的单曲时，播放歌曲
   */
  const hanldeClickSong = (id: number) => {
    dispatch({ type: 'setPlaySoundId', playload: id });
    dispatch({ type: 'setAutoPlay', playload: true });
  }

  return (
    <div className='w-full'>
      <div className='flex items-center text-sm text-gray-400'>
        <Search className='mr-3' theme="outline" size="17" fill="#9c9a9a" />
        <span>猜你想搜</span>
      </div>
      <ul className=' mt-3  w-full '>
        {
          searchLimitList.map((data) => {
            return (
              <li key={data.id} className='h-8 truncate flex items-center cursor-pointer px-3 text-xs hover:bg-gray-700 rounded-md'>
                {
                  <span className='text-green-600 truncate'>{data.name}</span>
                }
                &nbsp;
                &nbsp;
                {data.artists}
              </li>
            )
          })
        }
      </ul>
      {/* 搜索推荐的单曲 */}
      {
        searchSuggestList.songs.length != 0 && (
          <>
            <div className='flex my-3 items-center text-sm text-gray-400'>
              <Music className='mr-3' theme="outline" size="17" fill="#9c9a9a" />
              <span>单曲</span>
            </div>
            <ul className='w-full'>
              {
                getSuggestList().songs.map((data) => {
                  return (
                    <li onClick={() => { hanldeClickSong(data.id) }} key={data.id} className='h-8 truncate flex items-center cursor-pointer px-3 text-xs hover:bg-gray-700 rounded-md'>
                      {
                        <span className='text-green-600'>{data.name}</span>
                      }
                      &nbsp;
                      &nbsp;
                      <span className='truncate'>{'- ' + data.artists[0].name}</span>
                    </li>
                  )
                })
              }
            </ul>
          </>
        )
      }
      {/* 搜索推荐的歌手 */}
      {
        searchSuggestList.artists.length != 0 && (
          <>
            <div className='flex my-3 items-center text-sm text-gray-400'>
              <Entertainment className='mr-3' theme="outline" size="17" fill="#9c9a9a" />
              <span>歌手</span>
            </div>
            <ul className='w-full'>
              {
                getSuggestList().artists.map((data) => {
                  return (
                    <li key={data.id} className='py-3 truncate flex items-center cursor-pointer px-3 text-xs hover:bg-gray-700 rounded-md'>
                      <img src={data.img1v1Url} className='w-7 h-7 object-contain rounded-md mr-3' />
                      {
                        <span className='text-green-600'>{data.name}</span>
                      }
                    </li>
                  )
                })
              }
            </ul>
          </>
        )
      }
      {/* 搜索推荐的专辑 */}
      {
        searchSuggestList.albums.length != 0 && (
          <>
            <div className='flex my-3 items-center text-sm text-gray-400'>
              <Record className='mr-3' theme="outline" size="17" fill="#9c9a9a" />
              <span>专辑</span>
            </div>
            <ul className='w-full pb-5'>
              {
                getSuggestList().albums.map((data) => {
                  return (
                    <li key={data.id} className='h-8 truncate flex items-center cursor-pointer px-3 text-xs hover:bg-gray-700 rounded-md'>
                      <span className='text-green-600'>{data.name}</span>
                      &nbsp;
                      &nbsp;
                      <span className='truncate'>{'- ' + data.artist.name}</span>
                    </li>
                  )
                })
              }
            </ul>
          </>
        )
      }
    </div>
  );
}

export default SearchResult;