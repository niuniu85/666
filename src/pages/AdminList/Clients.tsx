import { FooterToolbar } from '@ant-design/pro-layout';
import { Tabs, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import ActionBuilder from './builder/ActionBuilder';
import ColumnBuilder from './builder/ColumnBuilder';
const { TabPane } = Tabs;

const localUri = 'http://localhost';

const Clients = () => {
  const init = useRequest<{ data: Admin.Data }>(`${localUri}/api/showUploadClientList`, {
    manual: true,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange: (_selectedRowKeys: any, _selectedRows: any) => {
      // console.log('选中的KEY:' + _selectedRowKeys, '选中的数据' + JSON.stringify(_selectedRows));
      setSelectedRowKeys(_selectedRowKeys);
      setSelectedRows(_selectedRows);
    },
  };

  const initRun = () => {
    setSelectedRowKeys([]);
  };
  useEffect(() => {
    if (selectedRowKeys.length === 0) {
      init.run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowKeys]);

  const ClientManageList = () => {
    return selectedRowKeys.length > 0 ? (
      <FooterToolbar
        extra={ActionBuilder(selectedRowKeys, selectedRows, initRun, init?.data?.personnel[0])}
      />
    ) : null;
  };

  const Demo = () => (
    <Tabs defaultActiveKey="1">
      <TabPane tab="导入列表" key="1">
        <Table
          rowKey="phone"
          size="small"
          rowSelection={rowSelection}
          columns={ColumnBuilder(init?.data?.columns)}
          dataSource={init?.data?.dataSource}
        />
        {ClientManageList()}
      </TabPane>
      <TabPane tab="分配记录" key="2">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  );

  return <Demo key="clientsManage" />;
};

export default Clients;
