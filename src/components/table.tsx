import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd/es/table";

interface CommonTableProps<T> extends TableProps<T> {
  loading?: boolean; 
}

const CommonTable = <T extends object>({ loading, ...props }: CommonTableProps<T>) => {
  return <Table loading={loading} {...props}  pagination={false}/>;
};

export default CommonTable;
