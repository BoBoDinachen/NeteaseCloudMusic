/**
 * 歌曲的类型
 */
interface SongType {
  id: number // 歌曲唯一标识
  name: string // 歌曲名
  artist?: string // 艺术家
  artists: ArtistType[] // 歌手列表
}

/**
 * 歌手类型
 */
interface ArtistType {
  id: number, // 歌手id
  name: string // 歌手名字
  img1v1Url: string// 歌手头像
}

/**
 * 专辑类型
 */
interface Albums{
  id: number // 专辑id
  name: string // 专辑名字
  artist: ArtistType // 专辑的歌手
}

/**
 * 搜索推荐
 */
interface SearchSuggestType {
  songs: SongType[] // 歌曲列表
  artists: ArtistType[] // 歌手列表
  albums: Albums[] // 专辑列表
}

export type {
  SongType,
  SearchSuggestType
  
}