import { FETCH_DOCS_API, UPLOAD_DOCS_API } from '@/api/fileuplods';
import axiosInstance from '@/utils/axiosInstance';
import type { uploadDocsRequest } from './doc';

export async function uploadDocsApi(data: uploadDocsRequest) {
  const res = await axiosInstance.post(UPLOAD_DOCS_API, data);
  return res.data.data;
}

export async function fetchDocsApi() {
  const res = await axiosInstance.get(FETCH_DOCS_API);
  return res.data.data;
}
