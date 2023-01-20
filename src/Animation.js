import { useState } from 'react';
import { css } from '@linaria/core';

import DataGrid from './components/datagrid/DataGrid';


const rangeClassname = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const transitionClassname = css`
  transition: grid-template-rows 0.5s ease;

  > :is(.rdg-header-row, .rdg-row) {
    transition: line-height 0.5s ease;
  }
`;


function createRows() {
  const rows= [];

  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.round(Math.random() * 3)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.round(Math.random() * 3)]
    });
  }

  return rows;
}

const columns = [
  {
    field: 'id',
    name: 'ID',
    width: 80
  },
  {
    field: 'task',
    name: 'Title',
    resizable: true
  },
  {
    field: 'priority',
    name: 'Priority',
    resizable: true
  },
  {
    field: 'issueType',
    name: 'Issue Type',
    resizable: true
  },
  {
    field: 'complete',
    name: '% Complete',
    resizable: true
  }
];

const rows = createRows();

export default function ColumnsReordering({ direction }) {
  const [rowHeight, setRowHeight] = useState(30);

  return (
    <>
      <div className={rangeClassname}>
        Row Height
        <button onClick={() => setRowHeight(30)}>Small</button>
        <button onClick={() => setRowHeight(60)}>Medium</button>
        <button onClick={() => setRowHeight(90)}>Large</button>
      </div>
      <DataGrid
        className={`${transitionClassname} fill-grid`}
        columns={columns}
        rows={rows}
        direction={direction}
        rowHeight={rowHeight}
      />
    </>
  );
}
