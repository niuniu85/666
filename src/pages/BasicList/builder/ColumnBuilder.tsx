import { SolutionOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import Modal from '../component/ShowModal';
const callPhone = (phone) => {
  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
   window.open("tel:"+phone)
}else {
  window.open("cmd:// adb shell am start -a android.intent.action.CALL tel:"+phone);
}

}


const localUri ='http://localhost';




const ColumnBuilder = (tableColumn: BasicListApi.Result2[] | undefined, initRun: () => void) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modaUri, setModaUri] = useState('');
  const init = useRequest<{ data: BasicListApi.DataSource }>(`${modaUri}`);

  const newColumns: BasicListApi.Result2[] = [];







  useEffect(() => {
    if (modalVisible) {
      init.run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modaUri]);

  (tableColumn || []).forEach((column) => {
    switch (column.dataIndex) {
      case '_id':
        column.render = (value: any) => {
          return (
            <>
              <Button
                key="_id"
                shape="circle"
                icon={<SolutionOutlined />}
                onClick={() => {
                  setModaUri(`${localUri}/api/showClientList?id=${value}`);
                  setModalVisible(true);
                }}
              />
              <Modal
                modalVisible={modalVisible}
                hideModal={() => {
                  initRun();
                  setModalVisible(false);
                }}
                modaUri={modaUri}
                dataSource={init?.data}
              />
            </>
          );
        };
        break;
      case 'phone':
        column.render = (value: any) => {
          return (
            <button key="callPhone" onClick={() => {
              callPhone(value)
            }}>
              {value}
            </button>
          );
        };
        break;
      case 'remarks':
        column.render = (value: any) => {
          return (
            <Tooltip placement="topLeft" title={value}>
              {value.substr(value.lastIndexOf('|') + 1)}
            </Tooltip>
          );
        };
        break;
      case 'create_time':
        column.render = (value: any) => {
          return moment(value).fromNow();
        };
        break;
      case 'last_dynamic_time':
        column.render = (value: any) => {
          return moment(value).fromNow();
        };
        break;
      default:
        break;
    }
    newColumns.push(column);
  });
  return newColumns;
};

export default ColumnBuilder;
