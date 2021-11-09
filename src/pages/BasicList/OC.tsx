import { useEffect, useState } from 'react';
import { useModel, useRequest } from 'umi';
import { useToggle } from 'ahooks';
import {
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
import OpenColumnBuilder from './builder/ColumnBuilder';
import SearchBuilder from './builder/SearchBuilder';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { submitFieldsAdapto } from './helper';
import { FooterToolbar } from '@ant-design/pro-layout';
import ActionBuilderModel from './builder/ActionBuilderModel';
const localUri = 'http://localhost';

const OC = () => {
  const [selectedRowKeys_, setselectedRowKeys] = useState([]);
  const [selectedRows_, setSelectedRows] = useState([]);
  const [page_, setpage] = useState(1);
  const [per_page_, setperPage] = useState(10);
  const [sortQuery_, setSortQuery] = useState('');
  const [modalVisible_, setModalVisible] = useState(false);
  const [modaUri_, setModaUri] = useState('');
  const [searchVisible_, searchAction_] = useToggle(false);

  const { initialState } = useModel('@@initialState');

  const init_ = useRequest<{ data: BasicListApi.Data }>(
    `/api/openclient?id=${initialState?.currentUser?.userid}&page=${page_}&per_page=${per_page_}${sortQuery_}`,
    {
      manual: true,
    },
  );

  const initmodel = useRequest<{ data: Admin.Data }>(`${localUri}/api/showUploadClientList`, {
    manual: true,
  });

  useEffect(() => {
    init_.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_, per_page_, sortQuery_]);
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
    selectedRowKeys: selectedRowKeys_,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange: (_selectedRowKeys: any, _selectedRows: any) => {
      console.log('选中的KEY:' + _selectedRowKeys, '选中的数据' + JSON.stringify(_selectedRows));
      setselectedRowKeys(_selectedRowKeys);
      setSelectedRows(_selectedRows);
    },
  };

  const props = {
    maxCount: 1,
    beforeUpload: (file: any) => {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        message.error(`${file.name} 不是指定文件`);
      } else {
        console.log(JSON.stringify(file));
        message.success(`文件已经上传成功，待审核通过即可显示`);
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
      searchVisible_ && (
        <Card className={styles.searchForm}>
          <Form onFinish={onFinish}>
            <Row gutter={24}>
              {SearchBuilder(init_.data?.layout?.tableColumn?.result2 || [])}
              <Col sm={6}>
                <Form.Item name="Trash_" key="Trash_" label="回收站">
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
                  <Button type="primary" htmlType="submit" key="searchSubmit_">
                    查找
                  </Button>
                  <Button htmlType="reset" key="searchReset_">
                    清空
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
            <Tooltip title="search_">
              <Button
                shape="circle"
                icon={<SearchOutlined />}
                type={searchVisible_ ? 'primary' : 'default'}
                onClick={() => {
                  searchAction_.toggle();
                }}
              />
            </Tooltip>
            <Button
              type="primary"
              key="addBasicList_"
              onClick={() => {
                setModaUri(`/api/getClientList?id=${initialState?.currentUser?.userid}`);
                setModalVisible(true);
              }}
            >
              添加
            </Button>
            <Upload method="post" name={initialState?.currentUser?.access} {...props}>
              <Button icon={<UploadOutlined />} key={initialState?.currentUser?.access}>
                导入
              </Button>
            </Upload>
            <Modal
              modalVisible={modalVisible_}
              hideModal={() => {
                setModalVisible(false);
              }}
              modaUri={modaUri_}
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
      <Row key="tableToolbarRow_">
        <Col xs={24} sm={12} key="tableToolbarCol1_">
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar} key="tableToolbarCol2_">
          <Pagination
            total={init_?.data?.meta?.total || 0}
            current={init_?.data?.meta?.page || 1}
            pageSize={init_?.data?.meta?.per_page || 10}
            showSizeChanger
            showQuickJumper
            showTotal={(total: any) => `共有 ${total} 条记录`}
            onChange={paginationChangeHandler}
            onShowSizeChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );
  };
  const ClientManageList = () => {
    return selectedRowKeys_.length > 0 ? (
      <FooterToolbar
        extra={ActionBuilderModel(
          selectedRowKeys_,
          selectedRows_,
          initRun,
          initmodel?.data?.personnel[0],
        )}
      />
    ) : null;
  };

  const Demo = () => (
    <div key="Client_">
      {searchLayout()}
      <Card>
        {beforeTableLayou()}
        <Table
          rowKey="_id_"
          dataSource={init_?.data?.dataSource}
          columns={OpenColumnBuilder(init_?.data?.layout?.tableColumn?.result2, initRun)}
          pagination={false}
          loading={init_.loading}
          onChange={tableChangeHandler}
          rowSelection={rowSelection}
        />
        {afterTableLayou()}
      </Card>
      {tableToolbar()}
      {ClientManageList()}
    </div>
  );

  return (
    <div>
      <Demo key="basicListIndex_" />
    </div>
  );
};

export default OC;
