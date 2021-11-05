import {Select,} from 'antd';

const { Option, OptGroup } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
const SelectBuilder=(userInfo: Admin.UserInfo[] | undefined)=>{


<Select style={{ marginLeft: 24 }} defaultValue={userInfo} onChange={handleChange}>
              (init?.data?.userInfo|[]).map(){
            return(<OptGroup label="Manager">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </OptGroup>
            <OptGroup label="Engineer">
              <Option value="Yiminghe">yiminghe</Option>
            </OptGroup>
          </Select>)}

        }
export default SelectBuilder;
