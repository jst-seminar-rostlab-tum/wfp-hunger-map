import Column from '../entities/Column';

export default interface DataTableProps<T> {
  rows: T[];
  columns: Column[];
}
