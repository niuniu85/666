import { reRequestState } from "@/pages/AdminList/builder/ShowPageApi";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Cascader, Form, message, Modal, Space, Table } from "antd";
import { useIntl } from "umi";
const { confirm } = Modal;



const ActionBuilder = (selectedRowKeys: number[],selectedRows: Admin.DataSource[],initRun: () => void,personnel: Admin.personnel | undefined) => {
  console.log('options类型为：'+typeof personnel?.options);
  console.log('options为：'+JSON.stringify(personnel?.options));

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

    const msg =await reRequestState(value,'/admin/clientListDistribution',selectedRowKeys);
    if(msg.status === 'ok'){
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.distribution.success',
        defaultMessage: '转移成功！',
      });
      message.success(defaultLoginSuccessMessage);
      // eslint-disable-next-line no-param-reassign
    }else{
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.distribution.failure',
        defaultMessage: '转移失败，请重试！',
      });
      message.error(defaultLoginSuccessMessage);
    }
  };


  const batchOverview = () => {
    return (<><Table size="small" rowKey="phone" pagination={false} dataSource={selectedRows} columns={columns}/>
    <Form {...layout} form={form} name="nest-messages" preserve={false}  onFinish={onFinish}>
      <Form.Item
      label={ "接收方："}
       name={'selectUser'}
       key={'selectUser'}>
      <Cascader
      placeholder="请选择到具体名字，单位无效!"
            options={personnel?.options}
          />
      </Form.Item>


      </Form></>);
  }

  function showDeleteConfirm() {
    confirm({
      title: `请确认将${selectedRowKeys.length}条用户记录转移?`,
      icon: <ExclamationCircleOutlined />,
      content: batchOverview(),
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        form.submit();initRun();
      },
      onCancel() {
      },
    });
  }





  return (
    <Space>
        <Button type='primary' onClick={showDeleteConfirm}>转移</Button>
      <Button>投海</Button>
      <Button>删除</Button>
      <span style={{ marginLeft: 8 }}>
        {`已选中 ${selectedRowKeys.length} 条`}
      </span>
    </Space>
  );
}

export default ActionBuilder;
