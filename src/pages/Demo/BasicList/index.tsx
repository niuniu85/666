import { Button, Col, Row, Table, Card, Pagination, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import useRequest from '@ahooksjs/use-request';
const Index = () => {
  /* ---Initial Space Start--- */
    const localUrl = "http://localhost/"
    const sendUrl = `${localUrl}/gets/client`
    const init = useRequest(sendUrl,)
  /* ---Initial Space End--- */

  /* ---Variable Space Start--- */
  const columns = init?.data?.columns
  const dataSource = init?.data?.dataSource
  /* ---Variable Space End--- */

  /* ---Funtion Space Start--- */
  const seachLayout = () => {};
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>
            <Button type={'primary'}>添加</Button>
            <Button>删除</Button>
          </Space>
        </Col>
      </Row>
    );
  };
  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Pagination />
        </Col>
      </Row>
    );
  };
  const batchToolbar = () => {};
/* ---Funtion Space End--- */

/* ---Return Space Start--- */
  return (
    <PageContainer>
      {seachLayout()}
      <Card>
        {beforeTableLayout()}
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        {afterTableLayout()}
        {batchToolbar()}
      </Card>
    </PageContainer>
  );
};
/* ---Return Space End--- */
export default Index;
