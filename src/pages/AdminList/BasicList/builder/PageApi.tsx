import { request } from 'umi';

const localUri = 'http://localhost';

export async function reRequestState(
  body: BasicListApi.DataSource,
  userid: string,
  options?: API.CurrentUser,
) {
  console.log(
    '添加数据（手机--' +
      body.phone +
      '客户全名--' +
      body.customer_name +
      '工作单位--' +
      body.work +
      '星级--' +
      body.customer_star +
      '创建时间--' +
      body.create_time +
      '公海--' +
      body.actions,
  );
  const bodyData = {
    remarks: '',
    work: body.work,
    enterprise_type: '',
    establishment_time: '',
    customer_name: body.customer_name,
    job: '',
    birthday: '',
    date_of_incorporation: '',
    wechat: '',
    phone: body.phone,
    landline: '',
    registered_capital_currency: '',
    registered_capital_sum: '',
    contact_person_name: '',
    contact_person: '',
    address: '',
    nature_of_business: '',
    source: '',
    qq: '',
    e_mail: '',
    regional_country: '',
    province: '',
    city: '',
    District: '',
    primary_industry: '',
    secondary_industry: '',
    website: '',
    sex: '未知',
    create_time: body.create_time,
    last_dynamic_time: '2021-09-02 15:31:50',
    last_contact_time: '',
    customer_progress: '新入库',
    tag: '',
    customer_type: '个人客户',
    customer_star: body.customer_star,
    follow_up_person: options?.name,
    follow_up_person_uid: options?.userid,
    department: options?.group,
    creator: options?.name,
    final_follow_up_record: '',
    key: 1,
    international_waters: 0,
    call_status: 0,
    call_count: 0,
    open_show: body.actions,
    userid: userid,
  };

  return request<API.LoginResult>(`${localUri}/api/addClientList`, {
    // return request<API.LoginResult>(`/api/addClientList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: bodyData,
  });
}
