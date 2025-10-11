import { UPLOAD_DOCS_API } from '@/api/fileuplods';
import axiosInstance from '@/utils/axiosInstance';
import type { uploadDocsRequest } from './doc';

export async function uploadDocsApi(data: uploadDocsRequest) {
  const res = await axiosInstance.post(UPLOAD_DOCS_API, data);
  return res.data.data;
}
