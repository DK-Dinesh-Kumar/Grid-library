import { useState } from 'react';

import { SelectColumn } from '../components/datagrid/Columns';


import DataGrid from '../components/datagrid/DataGrid';

function EmptyRowsRenderer() {
  return (
    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
      Nothing to show{' '}
      <span lang="ja" title="ショボーン">
        (´・ω・`)
      </span>
    </div>
  );
}



const columns = [
  SelectColumn,
  { key: 'id', headerName: 'ID' },
  { key: 'title', headerName: 'Title' },
  { key: 'count', headerName: 'Count' }
];

const rows = [{ id: 3, title: 'Ssss', count: 33 }];

function rowKeyGetter(row) {
  return row.id;
}

export default function NoRows({ direction }) {
  const [selectedRows, onSelectedRowsChange] = useState(()=> new Set());

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      renderers={{ noRowsFallback: <EmptyRowsRenderer /> }}
      selectedRows={selectedRows}
      onSelectedRowsChange={onSelectedRowsChange}
      rowKeyGetter={rowKeyGetter}
      className="small-grid"
      direction={direction}
    />
  );
}
