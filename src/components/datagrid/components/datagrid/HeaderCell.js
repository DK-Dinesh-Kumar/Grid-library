import React from "react";
import { css } from "@linaria/core";

import defaultHeaderRenderer from "./headerRenderer";
import { getCellStyle, getCellClassname } from "./utils";
import { useRovingCellRef } from "./hooks";

const cellResizable = css`
  @layer rdg.HeaderCell {
    touch-action: none;

    &::after {
      content: "";
      cursor: col-resize;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 10px;
    }
  }
`;

const cellResizableClassname = `rdg-cell-resizable ${cellResizable}`;

export default function HeaderCell({
  column,
  colSpan,
  cellHeight,
  isCellSelected,
  onColumnResize,
  allRowsSelected,
  onAllRowsSelectionChange,
  sortColumns,
  onSortColumnsChange,
  selectCell,
  shouldFocusGrid,
  direction,
}) {
  const isRtl = direction === "rtl";
  const { ref, tabIndex, onFocus } = useRovingCellRef(isCellSelected);
  const sortIndex = sortColumns?.findIndex(
    (sort) => sort.columnKey === column.key
  );
  const sortColumn =
    sortIndex !== undefined && sortIndex > -1
      ? sortColumns[sortIndex]
      : undefined;
  const sortDirection = sortColumn?.direction;
  const priority =
    sortColumn !== undefined && sortColumns.length > 1
      ? sortIndex + 1
      : undefined;
  const ariaSort =
    sortDirection && !priority
      ? sortDirection === "ASC"
        ? "ascending"
        : "descending"
      : undefined;

  const className = getCellClassname(
    column,
    column.headerCellClass,
    {
      [cellResizableClassname]: column.resizable,
    },
    `rdg-header-column-${column.idx % 2 === 0 ? "even" : "odd"}`
  );
  console.log("classss", column, column.headerCellClass);

  const headerRenderer = column.headerRenderer ?? defaultHeaderRenderer;

  function onPointerDown(event) {
    if (event.pointerType === "mouse" && event.buttons !== 1) {
      return;
    }

    const { currentTarget, pointerId } = event;
    const { right, left } = currentTarget.getBoundingClientRect();
    const offset = isRtl ? event.clientX - left : right - event.clientX;

    if (offset > 11) {
      // +1px to account for the border size
      return;
    }

    function onPointerMove(event) {
      // prevents text selection in Chrome, which fixes scrolling the grid while dragging, and fixes re-size on an autosized column
      event.preventDefault();
      const { right, left } = currentTarget.getBoundingClientRect();
      const width = isRtl
        ? right + offset - event.clientX
        : event.clientX + offset - left;
      if (width > 0) {
        onColumnResize(column, width);
      }
    }

    function onLostPointerCapture() {
      currentTarget.removeEventListener("pointermove", onPointerMove);
      currentTarget.removeEventListener(
        "lostpointercapture",
        onLostPointerCapture
      );
    }

    currentTarget.setPointerCapture(pointerId);
    currentTarget.addEventListener("pointermove", onPointerMove);
    currentTarget.addEventListener("lostpointercapture", onLostPointerCapture);
  }

  function onSort(ctrlClick) {
    if (onSortColumnsChange == null) return;
    const { sortDescendingFirst } = column;
    if (sortColumn === undefined) {
      // not currently sorted
      const nextSort = {
        columnKey: column.key,
        direction: sortDescendingFirst ? "DESC" : "ASC",
      };
      onSortColumnsChange(
        sortColumns && ctrlClick ? [...sortColumns, nextSort] : [nextSort]
      );
    } else {
      let nextSortColumn;
      if (
        (sortDescendingFirst === true && sortDirection === "DESC") ||
        (sortDescendingFirst !== true && sortDirection === "ASC")
      ) {
        nextSortColumn = {
          columnKey: column.key,
          direction: sortDirection === "ASC" ? "DESC" : "ASC",
        };
      }
      if (ctrlClick) {
        const nextSortColumns = [...sortColumns];
        if (nextSortColumn) {
          // swap direction
          nextSortColumns[sortIndex] = nextSortColumn;
        } else {
          // remove sort
          nextSortColumns.splice(sortIndex, 1);
        }
        onSortColumnsChange(nextSortColumns);
      } else {
        onSortColumnsChange(nextSortColumn ? [nextSortColumn] : []);
      }
    }
  }

  function onClick() {
    selectCell(column.idx);
  }

  function onDoubleClick(event) {
    const { right, left } = event.currentTarget.getBoundingClientRect();
    const offset = isRtl ? event.clientX - left : right - event.clientX;

    if (offset > 11) {
      // +1px to account for the border size
      return;
    }

    onColumnResize(column, "max-content");
  }

  function handleFocus(event) {
    onFocus?.(event);
    if (shouldFocusGrid) {
      // Select the first header cell if there is no selected cell
      selectCell(0);
    }
  }

  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      role="columnheader"
      aria-colindex={column.idx + 1}
      aria-selected={isCellSelected}
      aria-sort={ariaSort}
      aria-colspan={colSpan}
      ref={ref}
      // // set the tabIndex to 0 when there is no selected cell so grid can receive focus
      tabIndex={shouldFocusGrid ? 0 : tabIndex}
      className={className}
      style={getCellStyle(column, colSpan, 2)}
      onFocus={handleFocus}
      onClick={onClick}
      onDoubleClick={column.resizable ? onDoubleClick : undefined}
      onPointerDown={column.resizable ? onPointerDown : undefined}
    >
      {headerRenderer({
        column,
        cellHeight,
        sortDirection,
        priority,
        onSort,
        allRowsSelected,
        onAllRowsSelectionChange,
        isCellSelected,
      })}
    </div>
  );
}
