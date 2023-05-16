import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

type Props = XLSX.SheetAOAOpts &
  PropsWithChildren & {
    filename?: string;
    head: string[];
    body: string[][];
  };

const BackToTop: FC<Props> = (props) => {
  const { children, filename = 'demo', head, body, ...rest } = props;
  const onClick = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    // 创建excel工作簿对象
    const workbook = XLSX.utils.book_new();
    // 根据头部数据创建 excel sheet
    const worksheet = XLSX.utils.aoa_to_sheet([head]);
    // 将工作表添加到工作簿中
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.utils.sheet_add_aoa(worksheet, body, {
      origin: -1,
      ...rest,
    });
    // 保存工作簿到文件
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  return (
    <Wrapper onClick={onClick} {...rest}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
`;
export default BackToTop;
