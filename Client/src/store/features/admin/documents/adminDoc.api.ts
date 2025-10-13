import axiosInstance from '@/utils/axiosInstance';
import type { fetchAllDocsQuery } from './adminDoc';
import { FETCH_ALL_DOCS_API } from '@/api/documents';

export async function fetchAllDocsApi(query: fetchAllDocsQuery) {
  const res = await axiosInstance.get(FETCH_ALL_DOCS_API, { params: query });
  return res.data.data;
}
