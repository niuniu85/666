import { Modal as AntdModal, Form, Space, Button, message } from 'antd';
import { useIntl, useRequest,} from 'umi';
import FormBuilder from '../builder/FormBuilder';
import {reRequestState } from '../builder/PageApi';


const Modal = ({
  modalVisible,
  hideModal,
  modaUri,
  initData,
}: {
  modalVisible: boolean;
  hideModal: () => void;
  modaUri: string;
  initData: API.CurrentUser | undefined;
}) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const intl = useIntl();
  const [form] = Form.useForm();
  const init = useRequest<{ data: BasicListApi.Data }>(`${modaUri}`);
  const userid =modaUri.substr(modaUri.length - 11, 11);

  const onFinish = async (value: any) => {
    const msg =await reRequestState(value,userid,initData);
    if(msg.status === 'ok'){
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.add.success',
        defaultMessage: '添加成功！',
      });
      message.success(defaultLoginSuccessMessage);
      // eslint-disable-next-line no-param-reassign
      hideModal();
    }else if(msg.status === 'existence'){
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.add.existencefailure',
        defaultMessage: '客户已存在，添加失败！',
      });
      message.error(defaultLoginSuccessMessage);
    }else{
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.add.failure',
        defaultMessage: '添加失败！',
      });
      message.error(defaultLoginSuccessMessage);
    }
  };



  const Demo = () => (
    <Form {...layout} form={form} name="nest-messages" onFinish={onFinish}>
      {FormBuilder(init.data?.layout?.tableColumn?.result2 || [])}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
        <Button type="default" htmlType="button" key="cancelClientButtonReset" onClick={()=>{
            hideModal()
          }}>
            取消
          </Button>
          <Button type="default" htmlType="reset" key="addClientButtonReset">
            重置
          </Button>
          <Button type="primary" htmlType="submit" key="addClientButtonSumint" >
            确定
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );


  return (
    <div>
      <AntdModal title="添加" visible={modalVisible} onCancel={hideModal} footer={null}>
        <Demo key="addClientOption" />
      </AntdModal>
    </div>
  );
};

export default Modal;
