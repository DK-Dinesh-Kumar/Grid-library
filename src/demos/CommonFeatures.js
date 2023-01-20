import { useState, useMemo } from "react";
import { css } from "@linaria/core";
import { faker } from "@faker-js/faker";
import { SelectColumn } from "../components/datagrid/Columns";
import DataGrid from "../components/datagrid/DataGrid";
import { exportToCsv, exportToXlsx, exportToPdf } from "./UtilityExport";
import moment from "moment";
import {
  sliderEditor,
  linkEditor,
  checkboxEditor,
  dropDownEditor,
  textEditor,
  progressBarEditor,
} from "../components/datagrid/editors";

const toolbarClassname = css`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-block-end: 8px;
`;

const dialogContainerClassname = css`
  position: absolute;
  inset: 0;
  display: flex;
  place-items: center;
  background: rgba(0, 0, 0, 0.1);

  > dialog {
    width: 300px;
    text-align: end;
    > input {
      width: 100%;
    }
    > label {
      text-align: end;
    }
    > menu {
      text-align: end;
      display: flex;
      justify-content: flex-end;
      column-gap: 22px;
    }
  }
`;

const titClass = css`
  background-color: green;
`;

const dateFormatter = new Intl.DateTimeFormat(navigator.language);
const currencyFormatter = new Intl.NumberFormat(navigator.language, {
  style: "currency",
  currency: "eur",
});

function TimestampFormatter({ timestamp }) {
  return <>{dateFormatter.format(timestamp)}</>;
}

function CurrencyFormatter({ value }) {
  return <>{currencyFormatter.format(value)}</>;
}

function getColumns(countries, direction) {
  return [
    SelectColumn,
    {
      key: "id",
      headerName: "ID",
      width: 60,
      frozen: true,
      resizable: false,
      style: {
        backgroundColor: "yellow",
      },
      summaryFormatter() {
        return <strong>Total</strong>;
      },
    },
    {
      key: "title",
      headerName: "Task",
      width: 120,
      frozen: true,
      headerCellClass: "title-class",
      cellRenderer: textEditor,
      formatter: (props) => {
       
        return "Title " + props.row["title"];
      },
      cellClass(row) {
        if (row.title === "Task #1") {
          return titClass;
        }
      },
      summaryFormatter({ row }) {
        return <>{row.totalCount} records</>;
      },
    },
    {
      key: "client",
      field:"client",
      headerName: "Client",
      width: "max-content",
      cellRenderer: textEditor,
    },
    {
      key: "area",
      headerName: "Area",
      width: 120,
      alignment: { type: "String", align: "right" },
      cellRenderer: textEditor,
      type: "password",
    },
    {
      key: "country",
      headerName: "Country",
      width: 180,
      cellRenderer: (props) => {
        return dropDownEditor(props);
      },
      option: countries,
      // editorOptions: {
      //   editOnClic: true,
      // },
    },
    {
      key: "contact",
      headerName: "Contact",
      width: 160,
      cellRenderer: textEditor,
    },
    {
      key: "assignee",
      headerName: "Assignee",
      width: 150,
      cellRenderer: textEditor,
    },
    {
      key: "progress",
      headerName: "Completion",
      width: 110,
      validation: {
        // style: { backgroundColor: "none", color: "blue" },
        method: (value) => value >= 50,
      },
      formatter(props) {
        return sliderEditor(props);
      },
    },
    {
      key: "startTimestamp",
      headerName: "Start date",
      width: 200,
      alignment: true,
      // formatter(props) {
      //   return <TimestampFormatter timestamp={props.row.startTimestamp} />;
      // },
    },
    {
      key: "endTimestamp",
      headerName: "Deadline",
      width: 100,
      formatter(props) {
        return <TimestampFormatter timestamp={props.row.endTimestamp} />;
      },
    },
    {
      key: "budget",
      headerName: "Budget",
      width: 200,
      alignment: true,
      // formatter(props) {
      //   return <CurrencyFormatter value={props.row.budget} />;
      // },
    },
    {
      key: "time",
      headerName: "Time",
      width: 200,
      alignment: true,
    },
    {
      key: "transaction",
      headerName: "Transaction type",
    },
    {
      key: "account",
      headerName: "Account",
      width: 150,
      editable: true,
    },
    {
      key: "version",
      headerName: "Version",
      cellRenderer: textEditor,
    },
    {
      key: "available",
      headerName: "Available",
      width: 80,
      formatter(props) {
        console.log("ruhgtrgbrtgutrkgr", props);
        return (
          <input
            type={"checkbox"}
            checked={props.row[props.column.key]}
            onClick={(event) => {
              let sample = [];
              sample.map(data);
              // setRows({
              //   ...props.rows,
              //   rows[props.rowIndex] .[props.column.key]: event.target.checked,
              // });
            }}
          />
        );
      },
      summaryFormatter({ row: { yesCount, totalCount } }) {
        return <>{`${Math.floor((100 * yesCount) / totalCount)}% ✔️`}</>;
      },
    },
    {
      key: "dfd",
      headerName: "dfvd",
      width: 100,
      formatter: (props) => {
        return linkEditor(props);
      },
    },
  ];
}

function rowKeyGetter(row) {
  return row.id;
}

function createRows() {
  const now = Date.now();
  const rows = [];

  for (let i = 0; i < 1000; i++) {
    rows.push({
      id: i,
      title: `Task #${i + 1}`,
      client: faker.company.name(),
      area: faker.name.jobArea(),
      country: faker.address.country(),
      contact: faker.internet.exampleEmail(),
      assignee: faker.name.fullName(),
      progress: Math.random() * 100,
      startTimestamp: moment(new Date()).format("YYYY/MM/DD"),
      endTimestamp: now + Math.round(Math.random() * 1e10),
      budget: `₹${Math.floor(Math.random() * 1000)}`,
      transaction: faker.finance.transactionType(),
      account: faker.finance.iban(),
      version: faker.system.semver(),
      available: Math.random() > 0.5,
      time: moment(new Date()).format("hh:mm:ss a"),
    });
  }

  return rows;
}

function getComparator(sortColumn) {
  switch (sortColumn) {
    case "assignee":
    case "title":
    case "client":
    case "area":
    case "country":
    case "contact":
    case "transaction":
    case "account":
    case "version":
      return (a, b) => {
        return a[sortColumn].localeCompare(b[sortColumn]);
      };
    case "available":
      return (a, b) => {
        return a[sortColumn] === b[sortColumn] ? 0 : a[sortColumn] ? 1 : -1;
      };
    case "id":
    case "progress":
    case "startTimestamp":
    case "endTimestamp":
    case "budget":
      return (a, b) => {
        return a[sortColumn] - b[sortColumn];
      };
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`);
  }
}

export default function CommonFeatures({ direction }) {
  const [rows, setRows] = useState(createRows);
  const [sortColumns, setSortColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => new Set());

  const countries = useMemo(() => {
    return [
      ...new Set(
        rows.map((r) => {
          return {
            label: r.country,
            value: r.country,
          };
        })
      ),
    ].sort(new Intl.Collator().compare);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = useMemo(
    () => getColumns(countries, direction),
    [countries, direction]
  );

  const summaryRows = useMemo(() => {
    const summaryRow = {
      id: "total_0",
      totalCount: rows.length,
      yesCount: rows.filter((r) => r.available).length,
    };
    return [summaryRow];
  }, [rows]);

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  const gridElement = (
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={columns}
      rows={sortedRows}
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      onRowsChange={setRows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      onRowClick={(e) => {
        console.log("clcik-eee", e);
      }}
      onRowDoubleClick={(e) => {
        console.log("double-clcik-eee", e);
      }}
      onFill={true}
      topSummaryRows={summaryRows}
      bottomSummaryRows={summaryRows}
      className="fill-grid"
      direction={direction}
      restriction={{ copy: true }}
    />
  );

  return (
    <>
      <div className={toolbarClassname}>
        <ExportButton
          onExport={() => exportToCsv(gridElement, "CommonFeatures.csv")}
        >
          Export to CSV
        </ExportButton>
        <ExportButton
          onExport={() => exportToXlsx(gridElement, "CommonFeatures.xlsx")}
        >
          Export to XSLX
        </ExportButton>
        <ExportButton
          onExport={() => exportToPdf(gridElement, "CommonFeatures.pdf")}
        >
          Export to PDF
        </ExportButton>
      </div>
      {gridElement}
    </>
  );
}

function ExportButton({ onExport, children }) {
  const [exporting, setExporting] = useState(false);
  return (
    <button
      disabled={exporting}
      onClick={async () => {
        setExporting(true);
        await onExport();
        setExporting(false);
      }}
    >
      {exporting ? "Exporting" : children}
    </button>
  );
}
