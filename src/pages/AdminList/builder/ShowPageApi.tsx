import { request } from 'umi';

const localUri = 'http://localhost';

export async function reRequestState(
  uri: string,
  value?: BasicListApi.DataSource,
  selectedRowKeys?: number[],
  selectPhone?: string,
) {
  const bodyData = {
    selectedRowKeys,
    userName: value?.selectUser,
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
