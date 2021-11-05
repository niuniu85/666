declare module Record {

  export interface Datum {
      _id: string;
      follow_up_person: string;
      phone: string;
      customer_name: string;
      work: string;
      last_dynamic_time: string;
      remarks: string;
      tag: string;
      call_status: string;
      call_count: string;
      open_show: string;
  }

  export interface RootObject {
      success: boolean;
      status: string;
      message: string;
      data: Datum[];
  }

}

