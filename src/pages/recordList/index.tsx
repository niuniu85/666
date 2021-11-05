
import { Calendar, Card, Col, Divider, Row, Tabs, } from 'antd';
import {useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
const { TabPane } = Tabs;
const localUri ='http://localhost';


const Index = () => {
  const [uri, setUri] = useState('followUpRecord');
  const init = useRequest<{data: Record.Datum[]}>(`${localUri}/log/${uri}`,{loadMore:true})

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  function callback(key: any) {
    setUri(key)
  }


  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="跟进记录" key="followUpRecord" >
          <Row>
            <Col sm={6} >
            <Divider>日期选择</Divider>
              <Card> <div className={styles.siteCalendarDemoCard}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              </div></Card>
            </Col>

            <Col sm={16}>
            <Divider>时间轴</Divider>
              <Card>
                {JSON.stringify(init?.data)}
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="呼叫记录" key="telephoneRecord">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="流转记录" key="circulationRecord">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>


    </div>
  )
}

export default Index
