import moment from 'moment';


const ColumnBuilder = (tableColumn: Admin.Column[] | undefined) => {
  const newColumns: Admin.Column[] = [];



  (tableColumn || []).forEach((column) => {
    switch (column.dataIndex) {
      case 'create_time':
        column.render = (value: any) => {
          return moment(value).fromNow();
        };
        break;
    }
    newColumns.push(column);
  });
  return newColumns;
};

export default ColumnBuilder;
