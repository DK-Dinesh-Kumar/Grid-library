import { useMemo, useState } from "react";
import { css } from "@linaria/core";
import { faker } from "@faker-js/faker";
import DataGrid from "../components/datagrid/DataGrid";

const rootClassname = css`
  display: flex;
  flex-direction: column;
  block-size: 100%;
  gap: 10px;

  > .rdg {
    flex: 1;
  }
`;

// Context is needed to read filter values otherwise columns are
// re-created when filters are changed and filter loses focus

export default function HeaderFilters({ direction }) {
  const [rows] = useState(createRows);

  const columns = useMemo(() => {
    return [
      {
        key: "id",
      headerName: "ID",
        width: 50,
        filter: true,
        // headerRenderer: headerRenderer,
      },
      {
        key: "task",
      headerName: "Title",
        // sortable: true,
        filter: true,
      },
      {
        key: "priority",
      headerName: "Priority",
        filter: true,
      },
      {
        key: "issueType",
      headerName: "Issue Type",
        filter: true,
      },
      {
        key: "complete",
      headerName: "% Complete",
      },
    ];
  }, []);

  return (
    <div className={rootClassname}>
      <DataGrid columns={columns} rows={rows} direction={direction} />
    </div>
  );
}

function createRows() {
  const rows = [];
  for (let i = 1; i < 50; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ["Critical", "High", "Medium", "Low"][
        Math.floor(Math.random() * 4)
      ],
      issueType: ["Bug", "Improvement", "Epic", "Story"][
        Math.floor(Math.random() * 4)
      ],
      developer: faker.name.fullName(),
    });
  }
  return rows;
}
