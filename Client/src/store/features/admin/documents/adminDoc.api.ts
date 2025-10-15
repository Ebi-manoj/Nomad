import axiosInstance from '@/utils/axiosInstance';
import type { fetchAllDocsQuery, verifyDocReqDTO } from './adminDoc';
import { FETCH_ALL_DOCS_API, VERIFY_DOC_API } from '@/api/documents';

export async function fetchAllDocsApi(query: fetchAllDocsQuery) {
  const res = await axiosInstance.get(FETCH_ALL_DOCS_API, { params: query });
  return res.data.data;
}

export async function verifyDocumentApi(data: verifyDocReqDTO) {
  const res = await axiosInstance.patch(VERIFY_DOC_API, data);
  return res.data.data;
}
