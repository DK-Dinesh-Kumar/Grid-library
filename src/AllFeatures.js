import { useState } from 'react';
import { css } from '@linaria/core';
import { faker } from '@faker-js/faker';


import { SelectColumn } from './components/datagrid/Columns';
import textEditor from './components/datagrid/editors/textEditor';

import DataGrid from './components/datagrid/DataGrid';

import dropDownEditor from './components/datagrid/editors/textEditor';
import ImageFormatter from './ImageFormatter';


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
  SelectColumn,
  {
    field: 'id',
    name: 'ID',
    width: 80,
    resizable: true,
    frozen: true
  },
  {
    field: 'avatar',
    name: 'Avatar',
    width: 40,
    resizable: true,
    headerRenderer: () => <ImageFormatter value={faker.image.cats()} />,
    formatter: ({ row }) => <ImageFormatter value={row.avatar} />
  },
  {
    field: 'title',
    name: 'Title',
    width: 200,
    resizable: true,
    formatter(props) {
      return <>{props.row.title}</>;
    },
    editor: dropDownEditor,
    editorOptions: {
      editOnClick: true
    }
  },
  {
    field: 'firstName',
    name: 'First Name',
    width: 200,
    resizable: true,
    frozen: true,
    editor: textEditor
  },
  {
    field: 'lastName',
    name: 'Last Name',
    width: 200,
    resizable: true,
    frozen: true,
    editor: textEditor
  },
  {
    field: 'email',
    name: 'Email',
    width: 'max-content',
    resizable: true,
    editor: textEditor
  },
  {
    field: 'street',
    name: 'Street',
    width: 200,
    resizable: true,
    editor: textEditor
  },
  {
    field: 'zipCode',
    name: 'ZipCode',
    width: 200,
    resizable: true,
    editor: textEditor
  },
  {
    field: 'date',
    name: 'Date',
    width: 200,
    resizable: true,
    editor: textEditor
  },
  {
    field: 'bs',
    name: 'bs',
    width: 200,
    resizable: true,
    editor: textEditor
  },
  {
    field: 'catchPhrase',
    name: 'Catch Phrase',
    width: 'max-content',
    resizable: true,
    editor: textEditor
  },
  {
    field: 'companyName',
    name: 'Company Name',
    width: 200,
    resizable: true,
    editor: textEditor
  },
  {
    field: 'sentence',
    name: 'Sentence',
    width: 'max-content',
    resizable: true,
    editor: textEditor
  }
];

function createRows() {
  const rows= [];

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
      sentence: faker.lorem.sentence()
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
    targetRow
  }) {
    const incompatibleColumns = ['email', 'zipCode', 'date'];
    if (
      sourceColumnKey === 'avatar' ||
      ['id', 'avatar'].includes(targetColumnKey) ||
      ((incompatibleColumns.includes(targetColumnKey) ||
        incompatibleColumns.includes(sourceColumnKey)) &&
        sourceColumnKey !== targetColumnKey)
    ) {
      return targetRow;
    }

    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey ] };
  }

  function handleCopy({ sourceRow, sourceColumnKey }) {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(sourceRow[sourceColumnKey ]);
    }
  }

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      onRowsChange={setRows}
      onFill={true}
      onCopy={handleCopy}
      onPaste={handlePaste}
      rowHeight={30}
      // headerRowHeight={144}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      className="fill-grid"
      rowClass={(row) => (row.id.includes('7') ? highlightClassname : undefined)}
      direction={direction}
    />
  );
}
