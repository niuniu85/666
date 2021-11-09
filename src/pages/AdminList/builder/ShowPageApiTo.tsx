import { request } from 'umi';

const localUri = 'http://localhost';

export async function reRequestStateTo(
  uri: string,
  selectedRowKeys?: number[],
  selectPhone?: string,
) {
  const bodyData = {
    selectedRowKeys,
    userPhone: selectPhone,
  };

  return request<API.LoginResult>(`${localUri}${uri}`, {
    // return request<API.LoginResult>(`/api/editClientList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: bodyData,
  });
}
