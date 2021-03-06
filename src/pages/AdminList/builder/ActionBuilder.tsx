import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Cascader, Form, message, Modal, Space, Table } from 'antd';
import { useIntl } from 'umi';
import { reRequestState } from './ShowPageApi';
const { confirm } = Modal;

const ActionBuilder = (
  selectedRowKeys: number[],
  selectedRows: Admin.DataSource[],
  initRun: () => void,
  personnel: Admin.personnel | undefined,
) => {
  // console.log('options类型为：'+typeof personnel?.options);
  // console.log('options为：'+JSON.stringify(personnel?.options));

  const columns = [
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '法人',
      dataIndex: 'contact_person_name',
      key: 'contact_person_name',
    },
    {
      title: '单位',
      dataIndex: 'work',
      key: 'work',
    },
  ];

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const intl = useIntl();
  const [form] = Form.useForm();

  const onFinish = async (value: any) => {
    const msg = await reRequestState(value, '/admin/clientListDistribution', selectedRowKeys);
    if (msg.status === 'ok') {
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.distribution.success',
        defaultMessage: '分配成功！',
      });
      message.success(defaultLoginSuccessMessage);
      // eslint-disable-next-line no-param-reassign
    } else {
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.distribution.failure',
        defaultMessage: '分配失败，请重试！',
      });
      message.error(defaultLoginSuccessMessage);
    }
  };

  const handoverBatchOverview = () => {
    return (
      <>
        <Table
          size="small"
          scroll={{ x: 200, y: 300 }}
          rowKey="phone"
          pagination={false}
          dataSource={selectedRows}
          columns={columns}
        />
        <Form {...layout} form={form} name="nest-messages" preserve={false} onFinish={onFinish}>
          <Form.Item label={'接收方：'} name={'selectUser'} key={'selectUser'}>
            <Cascader placeholder="请选择到具体名字，单位无效!" options={personnel?.options} />
          </Form.Item>
        </Form>
      </>
    );
  };
  const delBatchOverview = () => {
    return (
      <>
        <Table
          size="small"
          scroll={{ x: 200, y: 300 }}
          rowKey="phone"
          pagination={false}
          dataSource={selectedRows}
          columns={columns}
        />
      </>
    );
  };

  function showHandoverConfirm() {
    confirm({
      title: `请确认将  ${selectedRowKeys.length}  条用户记录分配?`,
      icon: <ExclamationCircleOutlined />,
      content: handoverBatchOverview(),
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        form.submit();
        initRun();
      },
      onCancel() {},
    });
  }
  function showDeleteConfirm() {
    confirm({
      title: `请确认将  ${selectedRowKeys.length}  条用户记录删除?`,
      icon: <ExclamationCircleOutlined />,
      content: delBatchOverview(),
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        form.submit();
        initRun();
      },
      onCancel() {},
    });
  }

  return (
    <Space>
      <Button type="primary" onClick={showHandoverConfirm}>
        分配
      </Button>
      <Button onClick={showDeleteConfirm}>删除</Button>
      <span style={{ marginLeft: 8 }}>{`已选中  ${selectedRowKeys.length}  条`}</span>
    </Space>
  );
};

export default ActionBuilder;
