import { useEffect, useState } from 'react';
import { useModel, useRequest } from 'umi';
import { useToggle } from 'ahooks';
import {
  Tabs,
  Table,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Upload,
  message,
  Space,
  Tooltip,
  Form,
  Select,
} from 'antd';
import Modal from '../BasicList/component/Modal';
import styles from './index.less';
import ColumnBuilder from './builder/ColumnBuilder';
import SearchBuilder from './builder/SearchBuilder';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { submitFieldsAdapto } from './helper';
import { FooterToolbar } from '@ant-design/pro-layout';
import ActionBuilderModel from './builder/ActionBuilderModel';

const localUri = 'http://localhost';

const Index = () => {
  const { TabPane } = Tabs;
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setpage] = useState(1);
  const [per_page, setperPage] = useState(10);
  const [sortQuery, setSortQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modaUri, setModaUri] = useState('');
  const [searchVisible, searchAction] = useToggle(false);

  const { initialState } = useModel('@@initialState');

  const init = useRequest<{ data: BasicListApi.Data }>(
    `/api/client?id=${initialState?.currentUser?.userid}&page=${page}&per_page=${per_page}${sortQuery}`,
    {
      manual: true,
      onSuccess: () => {
        setselectedRowKeys([]);
        setSelectedRows([]);
      },
    },
  );

  const initmodel = useRequest<{ data: Admin.Data }>(`${localUri}/api/showUploadClientList`, {
    manual: true,
  });

  function callback(key: any) {
    console.log(key);
  }

  useEffect(() => {
    init.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, per_page, sortQuery]);
  const initRun = () => {
    setSortQuery('');
  };

  const paginationChangeHandler = (_page: any, _per_page: any) => {
    setpage(_page);
    setperPage(_per_page);
  };
  const tableChangeHandler = (_: any, __: any, sorter: any) => {
    if (sorter.order === undefined) {
      setSortQuery('');
    } else {
      const orderBy = sorter.order === 'ascend' ? '-1' : '1';
      setSortQuery(`&sort=${sorter.field}&order=${orderBy}`);
    }
  };
  const onFinish = (value: any) => {
    const formValue = submitFieldsAdapto(value);
    console.log(formValue);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange: (_selectedRowKeys: any, _selectedRows: any) => {
      console.log('?????????KEY:' + _selectedRowKeys, '???????????????' + JSON.stringify(_selectedRows));
      setselectedRowKeys(_selectedRowKeys);
      setSelectedRows(_selectedRows);
    },
  };

  const props = {
    maxCount: 1,
    beforeUpload: (file: any) => {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        message.error(`${file.name} ??????????????????`);
      } else {
        console.log(JSON.stringify(file));
        message.success(`??????????????????????????????????????????????????????`);
      }
      return file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ? true
        : Upload.LIST_IGNORE;
    },
    action: `${localUri}/api/uploadClientList`,
    onclick: (info: any) => {
      console.log(info);
    },
    onchange: () => {
      console.log(JSON.stringify(event));
    },
  };

  const searchLayout = () => {
    return (
      searchVisible && (
        <Card className={styles.searchForm}>
          <Form onFinish={onFinish}>
            <Row gutter={24}>
              {SearchBuilder(init.data?.layout?.tableColumn?.result2 || [])}
              <Col sm={6}>
                <Form.Item name="Trash" key="Trash" label="?????????">
                  <Select>
                    <Select.Option value="A">XXX</Select.Option>
                    <Select.Option value="B">XXX</Select.Option>
                    <Select.Option value="C">XXX</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={24} className={styles.textAlignRight}>
                <Space>
                  <Button type="primary" htmlType="submit" key="searchSubmit">
                    ??????
                  </Button>
                  <Button htmlType="reset" key="searchReset">
                    ??????
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>
      )
    );
  };

  const beforeTableLayou = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>
            <Tooltip title="search">
              <Button
                shape="circle"
                icon={<SearchOutlined />}
                type={searchVisible ? 'primary' : 'default'}
                onClick={() => {
                  searchAction.toggle();
                }}
              />
            </Tooltip>
            <Button
              type="primary"
              key="addBasicList"
              onClick={() => {
                setModaUri(`/api/getClientList?id=${initialState?.currentUser?.userid}`);
                setModalVisible(true);
              }}
            >
              ??????
            </Button>
            <Upload method="post" name={initialState?.currentUser?.access} {...props}>
              <Button icon={<UploadOutlined />} key={initialState?.currentUser?.access}>
                ??????
              </Button>
            </Upload>
            <Modal
              modalVisible={modalVisible}
              hideModal={() => {
                setModalVisible(false);
              }}
              modaUri={modaUri}
              initData={initialState?.currentUser}
            />
          </Space>
        </Col>
      </Row>
    );
  };
  const afterTableLayou = () => {};
  const tableToolbar = () => {
    return (
      <Row key="tableToolbarRow">
        <Col xs={24} sm={12} key="tableToolbarCol1">
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar} key="tableToolbarCol2">
          <Pagination
            total={init?.data?.meta?.total || 0}
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            showSizeChanger
            showQuickJumper
            showTotal={(total: any) => `?????? ${total} ?????????`}
            onChange={paginationChangeHandler}
            onShowSizeChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );
  };
  const ClientManageList = () => {
    return selectedRowKeys.length > 0 ? (
      <FooterToolbar
        extra={ActionBuilderModel(
          selectedRowKeys,
          selectedRows,
          initRun,
          initmodel?.data?.personnel[0],
        )}
      />
    ) : null;
  };

  const Demo = () => (
    <Tabs defaultActiveKey="clientList" onChange={callback}>
      <TabPane tab="??????" key="myClient">
        {searchLayout()}
        <Card>
          {beforeTableLayou()}
          <Table
            rowKey="_id"
            dataSource={init?.data?.dataSource}
            columns={ColumnBuilder(init?.data?.layout?.tableColumn?.result2, initRun)}
            pagination={false}
            loading={init.loading}
            onChange={tableChangeHandler}
            rowSelection={rowSelection}
          />
          {afterTableLayou()}
        </Card>
        {tableToolbar()}
        {ClientManageList()}
      </TabPane>
      <TabPane tab="??????" key="openClient">
        ...
      </TabPane>
    </Tabs>
  );

  return (
    <div>
      <Demo key="basicListIndex" />
    </div>
  );
};

export default Index;
