import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Category } from "./types";

type TablePropsTable = {
  columns: ColumnsType<Category>;
  data: Category[];
  pagination: false | TablePaginationConfig | undefined;
  onChange: (pagination: TablePaginationConfig) => void;
};

const GlobalTable = ({
  columns,
  data,
  pagination,
  onChange,
}: TablePropsTable) => {
  return (
    <Table
    columns={columns}
    dataSource={data?.map(item => ({ ...item, key: item.id }))} 
    pagination={pagination}
    onChange={(pagination) => onChange(pagination)}
  />
  );
};

export default GlobalTable;
