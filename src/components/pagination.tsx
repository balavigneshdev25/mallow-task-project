import React from 'react';
import { Pagination } from 'antd';

type AlignType = 'start' | 'center' | 'end';

type Props = {
  align: AlignType;
  page: number;
  per_page: number;
  total: number;
  onChange: (page: number) => void;
  onShowSizeChange: (current: number, size: number) => void;
  showSizeChanger:boolean,
  pageSizeOptions?:number[]
}

const PaginationComp: React.FC<Props> = ({ align, page, per_page, total, onChange, onShowSizeChange,showSizeChanger,pageSizeOptions }) => (
  <Pagination
    style={{ textAlign: align }}
    current={page}
    pageSize={per_page}
    total={total}
    onChange={onChange}
    onShowSizeChange={onShowSizeChange}
    showSizeChanger={showSizeChanger}
    pageSizeOptions={pageSizeOptions || [10,25,50,100]}
  />
);

export default PaginationComp;