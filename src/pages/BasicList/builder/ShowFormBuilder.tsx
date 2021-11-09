import { Card, Cascader, Form, Input, Switch } from 'antd';

const { TextArea } = Input;
function onChange(checked: any) {
  console.log(`switch to ${checked}`);
}
const ShowFormBuilder = (tableColumn: BasicListApi.DataSource | undefined) => {
  return (
    <Card>
      <Form.Item
        label={'法人'}
        name={'customer_name'}
        key={'customer_name'}
        initialValue={tableColumn?.customer_name}
      >
        <Input maxLength={11} disabled={true} />
      </Form.Item>

      <Form.Item label={'手机'} name={'phone'} key={'phone'} initialValue={tableColumn?.phone}>
        <Input maxLength={11} disabled={true} />
      </Form.Item>

      <Form.Item
        label={'联络员'}
        name={'contact_person_name'}
        key={'contact_person_name'}
        initialValue={tableColumn?.contact_person_name}
      >
        <Input maxLength={11} disabled={true} />
      </Form.Item>

      <Form.Item
        label={'联络员手机'}
        name={'contact_person'}
        key={'contact_person'}
        initialValue={tableColumn?.contact_person}
      >
        <Input maxLength={11} disabled={true} />
      </Form.Item>

      <Form.Item label={'公司'} name={'work'} key={'work'} initialValue={tableColumn?.work}>
        <Input maxLength={11} disabled={true} />
      </Form.Item>

      <Form.Item
        label={'创建时间'}
        name={'create_time'}
        key={'create_time'}
        initialValue={tableColumn?.create_time}
      >
        <Input maxLength={11} disabled={true} />
      </Form.Item>

      <Form.Item
        label={'最后联系'}
        name={'last_dynamic_time'}
        key={'last_dynamic_time'}
        initialValue={tableColumn?.last_dynamic_time}
      >
        <Input maxLength={11} disabled={true} />
      </Form.Item>

      <Form.Item
        label={'跟进记录'}
        name={'remarks'}
        key={'remarks'}
        initialValue={tableColumn?.remarks}
      >
        <TextArea rows={3} disabled={true} />
      </Form.Item>

      <Form.Item
        label={'更新记录'}
        name={'newRemarks'}
        key={'newRemarks'}
        rules={[{ required: true }]}
      >
        <Input maxLength={11} />
      </Form.Item>
      <Form.Item label={'更新标签'} name={'tag'} key={'tag'}>
        <Cascader
          options={[
            {
              value: '潜在客户',
              label: '潜在客户',
            },
            {
              value: '意向客户',
              label: '意向客户',
              children: [
                {
                  value: 'A级',
                  label: 'A级',
                },
                {
                  value: 'B级',
                  label: 'B级',
                },
                {
                  value: 'C级',
                  label: 'C级',
                },
              ],
            },
            {
              value: '成交客户',
              label: '成交客户',
            },
          ]}
        />
      </Form.Item>
      <Form.Item label={'更新呼叫状态'} name={'call_status'} key={'call_status'}>
        <Cascader
          options={[
            {
              value: '未接通',
              label: '未接通',
              children: [
                {
                  value: '空号',
                  label: '空号',
                },
                {
                  value: '停机',
                  label: '停机',
                },
                {
                  value: '关机',
                  label: '关机',
                },
                {
                  value: '未接',
                  label: '未接',
                },
                {
                  value: '拒接',
                  label: '拒接',
                },
              ],
            },
            {
              value: '已拨通',
              label: '已拨通',
              children: [
                {
                  value: '初次',
                  label: '初次',
                },
                {
                  value: '多次',
                  label: '多次',
                },
                {
                  value: '频繁',
                  label: '频繁',
                },
              ],
            },
          ]}
        />
      </Form.Item>

      <Form.Item name={'open_show'} label="放入公海" key={'open_show'} initialValue={false}>
        <Switch
          key="gonghaiOptionClient"
          checkedChildren="是"
          unCheckedChildren="否"
          onChange={onChange}
        />
      </Form.Item>
      <Form.Item
        label={'联系次数'}
        name={'call_count'}
        key={'call_count'}
        hidden={true}
        initialValue={tableColumn?.call_count}
      >
        <Input maxLength={11} />
      </Form.Item>
      <Form.Item
        label={'跟进人'}
        name={'follow_up_person'}
        key={'follow_up_person'}
        hidden={true}
        initialValue={tableColumn?.follow_up_person}
      >
        <Input maxLength={11} />
      </Form.Item>
    </Card>
  );
};

export default ShowFormBuilder;
