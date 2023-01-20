export function valueFormatter(props) {

  try {
    return <>{props.data[props.column.key]}</>
  } catch {
    return null
  }
}