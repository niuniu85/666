import { Input, Form, DatePicker, Switch, Col, Select } from 'antd';
import moment from 'moment';

const SearchBuilder = (tableColumn: BasicListApi.Result2[]) => {
  return (tableColumn || []).map((field: any) => {
    switch (field.dataIndex) {
      case 'phone':
        return (
          <Col sm={6}>
            <Form.Item
              name={field.dataIndex}
              label={field.title}
              key={field.dataIndex}
            >
              <Input maxLength={11} />
            </Form.Item>
          </Col>
        );
      case 'work':
        return (
          <Col sm={6}>
            <Form.Item
              name={field.dataIndex}
              label={field.title}
              key={field.dataIndex}
            >
              <Input maxLength={30} />
            </Form.Item>
          </Col>
        );
        case 'customer_name':
        return (
          <Col sm={6}>
            <Form.Item
              name={field.dataIndex}
              label={field.title}
              key={field.dataIndex}
            >
              <Input maxLength={4} />
            </Form.Item>
          </Col>
        );
      case 'create_time':
        return (
          <Col sm={12}>
            <Form.Item
              name={field.dataIndex}
              label={field.title}
              key={field.dataIndex}
            >
              <DatePicker.RangePicker
                showTime
                disabled={field.disabled}
                style={{ width: '100%' }}
                ranges={{
                  今天: [moment().startOf('day'), moment().endOf('day')],
                  七天内: [moment().subtract(7, 'd'), moment()],
                  三十天: [moment().subtract(30, 'days'), moment()],
                  上个月: [
                    moment().subtract(1, 'months').startOf('month'),
                    moment().subtract(1, 'months').endOf('month'),
                  ],
                  一年内: [moment().subtract(365, 'days'), moment()],
                }}
              />
            </Form.Item>
          </Col>
        );
      case 'customer_star':
        return (
          <Col sm={6}>
            <Form.Item name='customer_star' key='customer_star' label="客户标签">
              <Select>
                <Select.Option value="potential_customer">潜在客户</Select.Option>
                <Select.Option value="intended_customer">意向客户</Select.Option>
                <Select.Option value="transaction_customer">成交客户</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        );

      case 'actions':
        function onChange(checked: any) {
          console.log(`switch to ${checked}`);
        }
        return (
          <Col sm={6}>
            <Form.Item name={field.dataIndex} label="放入公海" key={field.dataIndex}>
              <Switch
                key="gonghaiOption"
                checkedChildren="是"
                unCheckedChildren="否"
                onChange={onChange}
              />
            </Form.Item>
          </Col>
        );
      default:
        return null;
    }
  });
};

export default SearchBuilder;
