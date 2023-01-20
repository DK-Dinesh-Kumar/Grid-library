import { useState } from "react";
import { css } from "@linaria/core";

import DataGrid from "../components/datagrid/DataGrid";
import { textEditor } from "../components/datagrid/editors";

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
  const rows = [];

  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ["Critical", "High", "Medium", "Low"][
        Math.round(Math.random() * 3)
      ],
      issueType: ["Bug", "Improvement", "Epic", "Story"][
        Math.round(Math.random() * 3)
      ],
    });
  }

  return rows;
}

const columns = [
  {
    key: "id",
   headerName: "ID",
    width: 80,
  },
  {
    key: "task",
   headerName: "Title",
    resizable: true,
  },
  {
    key: "priority",
   headerName: "Priority",
    resizable: true,
  },
  {
    key: "issueType",
   headerName: "Issue Type",
    resizable: true,
  },
  {
    key: "complete",
   headerName: "% Complete",
    resizable: true,
    type: "number",
    editor: textEditor,
  },
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
