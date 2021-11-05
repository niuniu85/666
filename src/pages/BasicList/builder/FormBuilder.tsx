import { Input, Form, DatePicker, Rate, Switch } from 'antd';

const FormBuilder = (tableColumn: BasicListApi.Result2[],) => {
    return (tableColumn || []).map((field: any) => {
      switch (field.dataIndex) {
        case 'phone':
          return (
            <Form.Item
              name={ field.dataIndex}
              label={field.title}
              key={field.dataIndex}
              rules={[{ required: true, max: 11 }]}
            >
              <Input maxLength={11} />
            </Form.Item>
          );
        case 'work':
          return (
            <Form.Item
              name={field.dataIndex}
              label={field.title}
              key={field.dataIndex}
              rules={[{ required: true, min: 5, max: 30 }]}
            >
              <Input maxLength={30} />
            </Form.Item>
          );
        case 'customer_name':
          return (
            <Form.Item
              name={field.dataIndex}
              label={field.title}
              key={field.dataIndex}
              rules={[{ required: true, min: 2, max: 4 }]}
            >
              <Input maxLength={4} />
            </Form.Item>
          );
        case 'create_time':
          return (
            <Form.Item
              name={field.dataIndex}
              label={field.title}
              key={field.dataIndex}
              rules={[{ required: true }]}
            >
              <DatePicker showTime />
            </Form.Item>
          );
        case 'tag':
          return (
            <Form.Item name={field.dataIndex} key={field.dataIndex} label={field.title}>
              <Rate />
            </Form.Item>
          );
        case 'actions':
          function onChange(checked: any) {
            console.log(`switch to ${checked}`);
          }
          return (
            <Form.Item name={field.dataIndex} label="放入公海" key={field.dataIndex}>
              <Switch key='gonghaiOption' checkedChildren="是" unCheckedChildren="否" onChange={onChange}/>
            </Form.Item>
          );
        default:
          return null;
      }
    });
};

export default FormBuilder;
