import { useState } from "react";
import { css } from "@linaria/core";
import { faker } from "@faker-js/faker";

import { SelectColumn } from "../components/datagrid/Columns";

import DataGrid from "../components/datagrid/DataGrid";
import {
  dropDownEditor,
  buttonEditor,
  dateEditor,
  dateTimeEditor,
  timeEditor,
  radioButtonEditor,
  textEditor,
  imageEditor,
} from "../components/datagrid/editors";

import ImageFormatter from "./ImageFormatter";

const highlightClassname = css`
  .rdg-cell {
    background-color: #9370db;
    color: white;
  }

  &:hover .rdg-cell {
    background-color: #800080;
  }
`;

function rowKeyGetter(row) {
  return row.id;
}

const columns = [
  {
    key: "id",
    headerName: "ID",
    width: 80,
    resizable: true,
    frozen: true,
    alignment: { type: "Number", align: "center" },
  },
  {
    key: "avatar",
    headerName: "Avatar",
    width: 40,
    resizable: true,
    headerRenderer: () => <ImageFormatter value={faker.image.cats()} />,
    formatter: ({ row }) => <ImageFormatter value={row.avatar} />,
  },
  {
    headerName: "Image",
    key: "avatar",
    width: 40,
    inputProps: { style: { height: 25, width: 25 } },
    formatter: (props) => {
      return imageEditor(props);
    },
  },
  {
    key: "title",
    headerName: "Title",
    width: 200,
    resizable: true,
    cellRenderer: (props) => {
      return dropDownEditor(props);
    },
    option: [
      { listname: "Dr.", value: "Dr." },
      { listname: "Mr.", value: "Mr." },
      { listname: "Mrs.", value: "Mrs." },
      { listname: "Miss", value: "Miss" },
      { listname: "Ms.", value: "Ms." },
    ],
  },
  {
    key: "firstName",
    headerName: "First Name",
    width: 200,
    resizable: true,
    frozen: true,
    cellRenderer: textEditor,
    // editorOptions: {
    //   editOnClick: true,
    // },
  },
  {
    key: "lastName",
    headerName: "Last Name",
    width: 200,
    resizable: true,
    frozen: true,
    cellRenderer: textEditor,
  },
  {
    key: "email",
    headerName: "Email",
    width: "max-content",
    resizable: true,
    cellRenderer: textEditor,
  },
  // {
  //   key: "street",
  //   headerName: "Street",
  //   width: 200,
  //   resizable: true,
  //   cellRenderer: textEditor,
  // },
  // {
  //   key: "zipCode",
  //   headerName: "ZipCode",
  //   width: 200,
  //   resizable: true,
  //   cellRenderer: textEditor,
  // },
  // {
  //   key: "date",
  //   headerName: "Date",
  //   width: 200,
  //   resizable: true,
  //   formatter: (props) => {
  //     return dateEditor(props);
  //   },
  // },
  // {
  //   key: "bs",
  //   headerName: "bs",
  //   width: 200,
  //   resizable: true,
  //   cellRenderer: textEditor,
  // },
  // {
  //   key: "catchPhrase",
  //   headerName: "Catch Phrase",
  //   width: "max-content",
  //   resizable: true,
  //   cellRenderer: textEditor,
  // },
  // {
  //   key: "companyName",
  //   headerName: "Company Name",
  //   width: 200,
  //   resizable: true,
  //   cellRenderer: textEditor,
  // },
  // {
  //   key: "sentence",
  //   headerName: "Sentence",
  //   width: "max-content",
  //   resizable: true,
  //   cellRenderer: textEditor,
  // },
  // {
  //   key: "Save++",
  //   headerName: "Save",
  //   // formatter: (props) => {
  //   //   console.log("props", props);
  //   //   return buttonEditor(props);
  //   // },
  // },
  // {
  //   key: "Date",
  //   headerName: "Date",
  //   width: 200,
  //   inputProps: {
  //     style: { marginTop: 10 },
  //   },
  //   formatter: (props) => {
  //     return dateTimeEditor(props);
  //   },
  // },
  {
    key: "Time",
    headerName: "Time",
    width: 100,
    formatter: (props) => {
      return timeEditor(props);
    },
  },
  // {
  //   key: "type",
  //   headerName: "Person-type",
  //   width: 400,
  //   options: [
  //     { label: "Dr.", value: "Dr." },
  //     { label: "Mr.", value: "Mr." },
  //     { label: "Mrs.", value: "Mrs." },
  //     { label: "Miss", value: "Miss" },
  //     { label: "Ms.", value: "Ms." },
  //   ],
  //   cellRenderer: (props) => {
  //     return radioButtonEditor(props);
  //   },
  // },
];
function createRows() {
  var rows = [];

  for (let i = 0; i < 2000; i++) {
    rows.push({
      id: `id_${i}`,
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      title: faker.name.prefix(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.street(),
      zipCode: faker.address.zipCode(),
      date: faker.date.past().toLocaleDateString(),
      bs: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.name(),
      words: faker.lorem.words(),
      sentence: faker.lorem.sentence(),
      type: "Mrs.",
    });
  }

  return rows;
}

export default function AllFeatures({ direction }) {
  const [rows, setRows] = useState(createRows);
  const [selectedRows, setSelectedRows] = useState(() => new Set());

  function handlePaste({
    sourceColumnKey,
    sourceRow,
    targetColumnKey,
    targetRow,
  }) {
    const incompatibleColumns = ["email", "zipCode", "date"];
    if (
      sourceColumnKey === "avatar" ||
      ["id", "avatar"].includes(targetColumnKey) ||
      ((incompatibleColumns.includes(targetColumnKey) ||
        incompatibleColumns.includes(sourceColumnKey)) &&
        sourceColumnKey !== targetColumnKey)
    ) {
      return targetRow;
    }

    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey] };
  }

  function handleCopy(e) {
   
    e.preventDefault();
    // if (window.isSecureContext) {
    //   navigator.clipboard.writeText(sourceRow[sourceColumnKey]);
    // }
  }
  // console.log("rows", rows);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      onRowsChange={setRows}
      onFill={true}
      onCopy={handleCopy}
      onPaste={handlePaste}
      rowHeight={24}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      className="fill-grid"
      rowClass={(row) =>
        row.id.includes("7") ? highlightClassname : undefined
      }
      direction={direction}
    />
  );
}
