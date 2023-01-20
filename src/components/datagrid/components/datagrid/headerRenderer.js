import React from 'react';
import { css } from "@linaria/core"

import { useFocusRef } from "./hooks"
import { useDefaultComponents } from "./DataGridDefaultComponentsProvider"

const headerSortCell = css`
  @layer rdg.SortableHeaderCell {
    cursor: pointer;
    display: flex;

    &:focus {
      outline: none;
    }
  }
`

const headerSortCellClassname = `rdg-header-sort-cell ${headerSortCell}`

const headerSortName = css`
  @layer rdg.SortableHeaderCellName {
    flex-grow: 1;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis;
  }
`

const headerSortNameClassname = `rdg-header-sort-name ${headerSortName}`

export default function headerRenderer({
  column,
  sortDirection,
  priority,
  onSort,
  isCellSelected
}) {
  if (!column.sortable) return <>{column.name}</>

  return (
    <SortableHeaderCell
      onSort={onSort}
      sortDirection={sortDirection}
      priority={priority}
      isCellSelected={isCellSelected}
    >
      {column.name}
    </SortableHeaderCell>
  )
}

function SortableHeaderCell({
  onSort,
  sortDirection,
  priority,
  children,
  isCellSelected
}) {
  const sortStatus = useDefaultComponents().sortStatus
  const { ref, tabIndex } = useFocusRef(isCellSelected)

  function handleKeyDown(event) {
    if (event.key === " " || event.key === "Enter") {
      // stop propagation to prevent scrolling
      event.preventDefault()
      onSort(event.ctrlKey || event.metaKey)
    }
  }

  function handleClick(event) {
    onSort(event.ctrlKey || event.metaKey)
  }

  return (
    <span
      ref={ref}
      tabIndex={tabIndex}
      className={headerSortCellClassname}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className={headerSortNameClassname}>{children}</span>
      <span>{sortStatus({ sortDirection, priority })}</span>
    </span>
  )
}
