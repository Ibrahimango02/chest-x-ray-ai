//cite: https://www.bekk.christmas/post/2020/22/create-a-generic-table-with-react-and-typescript
type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number | string;
};

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const Tstyle = {
  width: '100%',
  height: '50%',
} as const;

const SingleTable = <T, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>): JSX.Element => {
  return (
    <table style={Tstyle}>
      {/* <TableHeader columns={columns} /> */}
      <TableRows data={data} columns={columns} />
    </table>
  );
};

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const Sstyle = {
  borderTop: '1px solid gray',
  borderBottom: '1px solid gray',
  backgroundColor: 'white',
  height: '4vh',
  paddingLeft: '3%',
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns.map((column, index2) => {
          return (
            <td key={`cell-${index2}`} style={Sstyle}>
              {row[column.key]}
            </td>
          );
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default SingleTable;
