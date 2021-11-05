declare module BasicListApi {

  export interface DataSource {
      _id?: string;
      c_id?: number;
      remarks: string;
      work: string;
      enterprise_type: string;
      establishment_time: string;
      customer_name: string;
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
      secondary_industry: string;
      website: string;
      sex: string;
      create_time: string ;
      last_dynamic_time: string;
      last_contact_time: string;
      customer_progress: string;
      tag: string;
      customer_type: string;
      customer_star: string;
      follow_up_person: string;
      follow_up_person_uid: string;
      department: string;
      creator: string;
      final_follow_up_record: string;
      international_waters: number;
      call_status: string;
      call_count: string;
      open_show: string;
      actions?: unknown;
      userid?: unknown;
      manipulate?: string;
      [key?: string]: any;
  }

  export interface Action {
    component: string;
    text: string;
    type: string;
    action: string;
    uri: string;
    method: string;
}

  export interface Result2 {
      _id: string;
      title: string;
      dataIndex: string;
      actions: Action[];
      render: any;
      [keys: string]: any
      }

  export interface TableColumn {
      result2?: Result2[];
  }

  export interface TableToolBar {
      total: number;
      page: number;
      per_page: number;
  }

  export interface BatchToolBar {
      total: number;
      page: number;
      per_page: number;
  }

  export interface Layout {
      tableColumn: TableColumn;
      tableToolBar: TableToolBar;
      batchToolBar: BatchToolBar;
  }

  export interface Page {
      title: string;
      type: string;
  }

  export interface Meta {
      total: number;
      page: number;
      per_page: number;
  }

  export interface Data {
      dataSource: DataSource[];
      layout: Layout;
      page: Page;
      meta: Meta;
  }

  export interface RootObject {
      success: boolean;
      message: string;
      data: Data;
  }

}

