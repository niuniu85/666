declare module Admin {
  export interface DataSource {
    _id: string;
    remarks: string;
    enterprise_type: string;
    establishment_time: string;
    job: string;
    birthday: string;
    date_of_incorporation: string;
    wechat: string;
    phone: string;
    landline: string;
    registered_capital_currency: string;
    registered_capital_sum: string;
    contact_person_name: string;
    contact_person: string;
    address: string;
    nature_of_business: string;
    source: string;
    qq: string;
    e_mail: string;
    regional_country: string;
    province: string;
    city: string;
    District: string;
    primary_industry: string;
    website: string;
    sex: string;
    create_time: string;
    last_dynamic_time: string;
    last_contact_time: string;
    customer_progress: string;
    tag: string;
    customer_type: string;
    customer_star: string;
    follow_up_person_uid: string;
    creator: string;
    follow_up_person: string;
    final_follow_up_record: string;
    key: string;
    international_waters: string;
    call_status: string;
    call_count: string;
    open_show: string;
    userid: string;
    work: string;
    customer_name: string;
}

export interface Column {
    _id: string;
    title: string;
    dataIndex: string;
    [key: string]: any
}

export interface BatchToolBar {
    component: string;
    text: string;
    type: string;
    action: string;
    uri: string;
    method: string;
}

export interface Layout {
    tableColumn: any[];
    tableToolBar: any[];
    batchToolBar: BatchToolBar[];
}

export interface Child2 {
  value: string;
  label: string;
}

export interface Child {
  value: string;
  label: string;
  children: Child2[];
}

export interface Option {
  value: string;
  label: string;
  children: Child[];
}

export interface personnel {
  _id: string;
  options: Option[];
}

export interface Data {
  dataSource: DataSource[];
  columns: Column[];
  layout: Layout;
  personnel: personnel[];
}
export interface RootObject {
    success: boolean;
    data: Data;
    massage: string;
}

}
