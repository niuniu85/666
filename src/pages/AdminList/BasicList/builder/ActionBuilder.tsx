import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';
import { useState } from 'react';
import { useRequest } from 'umi';
import Modal from '../component/ShowModal';
const localUri = 'http://localhost';

const ActionBuilder = (actions: BasicListApi.Action[], setmodaUri: string) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modaUri, setModaUri] = useState(setmodaUri);
  const init = useRequest<{ data: BasicListApi.DataSource }>(`${modaUri}`);

  return actions.map((action) => {
    if (action.component === 'button') {
      // return <Button type={action.type as ButtonType} key={action.type}>{action.text}</Button>
      return (
        <>
          <Button
            type={action.type as ButtonType}
            key={action.type}
            onClick={() => {
              setModaUri(`${localUri}/api/showClientList?id=${modaUri}`);
              // setModaUri(`/api/showClientList?id=${modaUri}`);
              // setModaUri(`/api/showClientList?id=${value}`);
              setModalVisible(true);
            }}
          >
            {action.text}
          </Button>
          <Modal
            modalVisible={modalVisible}
            hideModal={() => {
              setModalVisible(false);
            }}
            modaUri={modaUri}
            dataSource={init?.data}
          />
        </>
      );
    }
    return null;
  });
};

export default ActionBuilder;
