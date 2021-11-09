import { Modal as AntdModal, Form, Space, Button, message, Cascader } from 'antd';
import { useIntl } from 'umi';
import { reRequestState } from '../builder/ShowPageApi';

const Modal = ({
  modalVisible,
  hideModal,
  modaUri,
  userInfo,
  dataSource,
}: {
  modalVisible: boolean;
  hideModal: () => void;
  modaUri: string;
  userInfo: Admin.UserInfo[];
  dataSource: number[];
}) => {
  console.log(userInfo.length);
  console.log(dataSource.length);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const intl = useIntl();
  const [form] = Form.useForm();

  const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  const onFinish = async (value: any) => {
    const msg = await reRequestState(value, modaUri);
    if (msg.status === 'ok') {
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.edit.success',
        defaultMessage: '更新成功！',
      });
      message.success(defaultLoginSuccessMessage);
      // eslint-disable-next-line no-param-reassign
      hideModal();
    } else {
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.edit.failure',
        defaultMessage: '更新失败，请重试！',
      });
      message.error(defaultLoginSuccessMessage);
    }
  };

  console.log('****************************' + modaUri);
  const Demo = () => (
    <Form {...layout} form={form} name="nest-messages" preserve={false} onFinish={onFinish}>
      <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          { type: 'array', required: true, message: 'Please select your habitual residence!' },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button
            type="default"
            htmlType="button"
            key="cancelClientButtonReset"
            onClick={() => {
              hideModal();
            }}
          >
            取消
          </Button>
          <Button type="default" htmlType="reset" key="addClientButtonReset">
            重置
          </Button>
          <Button type="primary" htmlType="submit" key="addClientButtonSumint">
            保存
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <AntdModal
        title="客户详情"
        visible={modalVisible}
        onCancel={hideModal}
        footer={null}
        destroyOnClose={true}
        mask={false}
        maskClosable={false}
      >
        <Demo key="editClientOption" />
      </AntdModal>
    </div>
  );
};

export default Modal;
