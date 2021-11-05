import moment from 'moment';
import { request } from 'umi';

const localUri ='http://localhost';


export async function reRequestState(

  body: BasicListApi.DataSource,
  c_id?: string
) {
  const newData=String(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
  body.open_show=body.open_show?'true':'false';
  body.tag=body.tag?body.tag.toString().replace('\,','/'):'';
  body.call_status=body.call_status?body.call_status.toString().replace('\,','/'):'';
  body.call_count=String(Number(body.call_count)+1);
  body.remarks=body.remarks ? (body.remarks+'|第'+body.call_count+'次|'+body.newRemarks):('|第'+body.call_count+'次'+body.newRemarks);

  console.log('添加数据（最后联系--'+ newData + '备注--' + body.remarks + '更新客户标签--' + body.tag + '更新呼叫状态--' + body.call_status + '放入公海--' + typeof body.open_show+ '联系次数--' + body.call_count);
  const bodyData = {
    c_id:c_id,
    phone:body.phone,
    customer_name:body.customer_name,
    work:body.work,
    last_dynamic_time:newData,
    remarks:body.remarks,
    tag:body.tag,
    call_status:body.call_status,
    call_count:body.call_count,
    follow_up_person:body.follow_up_person,
    open_show:body.open_show,
  };

    return request<API.LoginResult>(`${localUri}/api/editClientList`, {
      // return request<API.LoginResult>(`/api/editClientList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: bodyData,
  })
}

