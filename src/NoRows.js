import { createContext, useContext, useMemo, useState } from "react";

import { SelectColumn } from "./components/datagrid/Columns";

import DataGrid from "./components/datagrid/DataGrid";
import { useFocusRef } from "./components/datagrid/hooks";
import { css } from "@linaria/core";

function EmptyRowsRenderer() {
  return (
    <div style={{ textAlign: "center", gridColumn: "1/-1" }}>
      Nothing to show{" "}
      <span lang="ja" title="ショボーン">
        (´・ω・`)
      </span>
    </div>
  );
}

const FilterContext = createContext(undefined);

function rowKeyGetter(row) {
  return row.id;
}

export default function NoRows({ direction }) {
  const [selectedRows, onSelectedRowsChange] = useState(() => new Set());
  const [filters, setFilters] = useState({
    title: "",
    count: "",
    enabled: true,
  });

  const columns = useMemo(() => {
    return [
      SelectColumn,
      {
        field: "id",
        name: "ID",
        width: 50,
        haveChildren: false,
        topHeader: "id",
        cellWidth: 60,
        frozen: true,
      },
      {
        field: "rdrd",
        name: "AASS",
        haveChildren: false,
        topHeader: "rdrd",
        cellWidth: 60,
      },

      {
        field: "title",
        name: "Title",
        haveChildren: true,
        // frozen: true,

        children: [
          // SelectColumn,
          {
            field: "aaaa",
            name: "AAAA",

            haveChildren: true,
            children: [
              {
                field: "vvvv",
                name: "VVVV",
                haveChildren: false,
                cellWidth: 100,
                topHeader: "title",
              },

              {
                field: "rrrr",
                name: "RRRR",
                haveChildren: false,
                cellWidth: 100,
                topHeader: "title",
              },
              {
                field: "uuuu",
                name: "UUUU",
                haveChildren: false,
                cellWidth: 100,
                topHeader: "title",
              },
            ],
          },
          {
            field: "bbbb",
            name: "BBBB",
            haveChildren: true,
            children: [
              {
                field: "wsdc",
                name: "HGTF",
                haveChildren: false,
                cellWidth: 100,
                topHeader: "title",
              },
              {
                field: "yugd",
                name: "HGFBGV",
                haveChildren: false,
                cellWidth: 100,
                topHeader: "title",
              },
            ],
          },
          {
            field: "cccc",
            name: "CCCC",
            cellWidth: 100,
            haveChildren: true,
            children: [
              {
                field: "yugd",
                name: "HGFBGV",
                haveChildren: false,
                cellWidth: 100,
                topHeader: "title",
              },
              {
                field: "yugd",
                name: "HGFBGV",
                haveChildren: true,
                topHeader: "title",
                cellWidth: 100,
                children:[
                  {
                    field: "cvdcv",
                    name: "FGHT",
                    haveChildren: false,
                    topHeader: "title",
                    cellWidth: 60,
                  },  {
                    field: "cvacv",
                    name: "FGHT",
                    haveChildren: false,
                    topHeader: "title",
                    cellWidth: 60,
                  },
                ]
              },
            ],
          },
        ],
      },
      {
        field: "cvcv",
        name: "FGHT",
        haveChildren: false,
        topHeader: "cvcv",
        cellWidth: 60,
      },
      {
        field: "erer",
        name: "FGHT",
        haveChildren: false,
        topHeader: "erer",
        cellWidth: 60,
      },
      {
        field: "count",
        name: "Count",
        haveChildren: true,
        children: [
          // SelectColumn,
          {
            field: "nnnn",
            name: "NNNN",
            haveChildren: true,
            children: [
              {
                field: "xxxx",
                name: "XXXX",
                haveChildren: false,
                cellWidth: 100,
                topHeader: "count",
              },
              {
                field: "jjjj",
                name: "JJJJ",
                haveChildren: true,
                children: [
                  {
                    field: "ffff",
                    name: "FFFF",
                    haveChildren: false,
                    cellWidth: 100,
                    topHeader: "count",
                  },
                  {
                    field: "vvvv",
                    name: "VVVV",
                    haveChildren: true,
                    children: [
                      {
                        field: "llll",
                        name: "LLLL",
                        haveChildren: false,
                        cellWidth: 100,
                        topHeader: "count",
                      },
                      {
                        field: "pppp",
                        name: "PPPP",
                        haveChildren: true,
                        children: [
                          {
                            field: "eeee",
                            name: "EEEE",
                            haveChildren: false,
                            cellWidth: 100,
                            topHeader: "count",
                          },
                          {
                            field: "pppp",
                            name: "PPPP",
                            haveChildren: true,
                            cellWidth: 100,
                            topHeader: "count",
                            children: [
                              {
                                field: "eeee",
                                name: "EEEE",
                                haveChildren: false,
                                cellWidth: 100,
                                topHeader: "count",
                              },
                              {
                                field: "pppp",
                                name: "PPPP",
                                haveChildren: false,
                                cellWidth: 100,
                                topHeader: "count",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            field: "oooo",
            name: "OOOO",
            cellWidth: 100,
            haveChildren: false,
            topHeader: "count",
          },
          {
            field: "qqqq",
            name: "QQQQ",
            cellWidth: 100,
            haveChildren: false,
            topHeader: "count",
          },
        ],
      },
    ];
  }, []);

  const rows = [
    {
      id: 3,
      oooo: "JGRF",
      aaaa: "wsws",
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 4,
      vvvv: "assdd",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 5,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 6,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrr: "wrerer",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 7,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 8,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 9,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 10,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 11,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 12,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 13,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 14,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 15,
      vvvv: "Ssss",
      nnnn: "gege",
      ccrcc: "dfhhgh",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 16,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 17,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 18,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 19,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 20,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 21,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 22,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 23,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 24,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 25,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 26,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 27,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 28,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 29,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 30,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 31,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 32,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 33,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 34,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 35,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
    {
      id: 36,
      vvvv: "Ssss",
      nnnn: "gege",
      qqqq: "kjkj",
      llll: "llll",
      rrrrr: "thgf",
      uuuu: "iugy",
      bbbb: "vfvf",
      cccc: "sdsd",
      xxxx: "sdsa",
      ffff: "aqaq",
      eeee: "tyty",
      pppp: "frfr",
    },
  ];

  return (
    <FilterContext.Provider value={filters}>
      <DataGrid
        columns={columns}
        rows={rows}
        renderers={{ noRowsFallback: <EmptyRowsRenderer /> }}
        selectedRows={selectedRows}
        onSelectedRowsChange={onSelectedRowsChange}
        headerRowHeight={24}
        rowKeyGetter={rowKeyGetter}
        className="fill-grid"
        // direction={direction}
      />
    </FilterContext.Provider>
  );
}
