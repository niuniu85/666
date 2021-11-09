import { Tabs } from 'antd';

const Users = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const Demo = () => (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="员工列表" key="1">
        ...
      </TabPane>
      <TabPane tab="员工记录" key="2">
        ...
      </TabPane>
    </Tabs>
  );

  return <Demo key="usersManage" />;
};

export default Users;
