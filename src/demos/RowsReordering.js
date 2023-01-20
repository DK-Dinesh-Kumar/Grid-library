import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// import { DraggableRowRenderer } from './components/RowRenderers';
import{ textEditor} from '../components/datagrid/editors';
import DataGrid from '../components/datagrid/DataGrid';
import { DraggableRowRenderer } from './DraggableRowRenderer';


function createRows() {
  const rows = [];

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
    key: 'id',
   headerName: 'ID',
    width: 80
  },
  {
    key: 'task',
   headerName: 'Title',
    cellRenderer: textEditor
  },
  {
    key: 'priority',
   headerName: 'Priority'
  },
  {
    key: 'issueType',
   headerName: 'Issue Type'
  },
  {
    key: 'complete',
   headerName: '% Complete'
  }
];

export default function RowsReordering({ direction }) {
  const [rows, setRows] = useState(createRows);

  const rowRenderer = useCallback((key, props) => {
    function onRowReorder(fromIndex, toIndex) {
      setRows((rows) => {
        const newRows = [...rows];
        newRows.splice(toIndex, 0, newRows.splice(fromIndex, 1)[0]);
        return newRows;
      });
    }

    return <DraggableRowRenderer key={key} {...props} onRowReorder={onRowReorder} />;
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        renderers={{ rowRenderer }}
        direction={direction}
      />
    </DndProvider>
  );
}
