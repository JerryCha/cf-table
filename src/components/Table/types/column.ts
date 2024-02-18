export interface IColumn {
  name: string;
  title?: string;
  width?: number;
  fixed?: "left" | "right";
  isGroup?: boolean;
  columns?: IColumn[];
  primaryKey?: boolean;
  visible?: boolean;
}
