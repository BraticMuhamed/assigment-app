import axios from 'axios';

interface Video {
  site: string;
  key: string;
}

interface Videos {
  // eslint-disable-next-line @typescript-eslint/ban-types
  results: Array<Video>
}

export interface Item {
  overview: string;
  title?: string;
  name?: string;
  poster_path?: string;
  id: number;
  videos?: Videos;
}

export interface Items {
  page: number;
  total_results: number;
  total_pages: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  results: Array<Item>;
}

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '57a2bb8558736e7156b084e67e6abad2',
  },
});

export const getItems = async (tab: string): Promise<Items> => {
  const url = `${tab}/top_rated`;
  const data = await instance.get<Items>(url);

  return data.data;
};

export const getItem = async (tab: string, id: number): Promise<Item> => {
  const url = `${tab}/${id}`;
  const params = {
    append_to_response: 'videos',
  }
  const data = await instance.get<Item>(url, { params });

  return data.data;
};

export const searchItems = async (
  tab: string,
  searchTerm: string,
  page: number
): Promise<Items> => {
  const url = `search/${tab}`;
  const params = {
    query: searchTerm,
    page,
  }
  const data = await instance.get<Items>(url, { params });

  return data.data;
};
