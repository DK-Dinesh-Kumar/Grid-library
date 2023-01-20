import DataGrid from '../components/datagrid/DataGrid';



const rows= [...Array(100).keys()];

function cellFormatter(props) {
  return (
    <>
      {props.column.key}&times;{props.row}
    </>
  );
}

const columns= [];

for (let i = 0; i < 50; i++) {
  const key = String(i);
  columns.push({
    key,
    headerName: key,
    formatter: cellFormatter
  });
}

export default function ResizableGrid({ direction }) {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      className="fill-grid"
      style={{ resize: 'both' }}
      direction={direction}
    />
  );
}
