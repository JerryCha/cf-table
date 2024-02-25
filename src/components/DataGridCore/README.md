# Data Grid Core

## Foreword

考虑到表格组件不仅仅是 PC 端的二维矩阵展示形态，原有的分层抽象结构并不合理。基本的分页、数据、行选择状态不应与表格这种展示形态相耦合。因此在原有的结构基础上，向下增加了一层核心层。原有的分页、数据、行选择状态会迁移至这一层管理，提供传入渲染函数的方式，让上层去处理 UI 事宜。

## 状态设计

状态只包括四个部分：分页、数据、行选择、查询条件。状态管理选择了较为轻量的库 Jotai，采用原子化的全局状态管理也是希望能将状态变化的颗粒度进一步细化、以及尽可能减少因为状态更新带来的重渲染性能问题。

分页

```ts
interface IPaginationState {
  index: number | null;
  size: number | null;
}
```

数据

```ts
interface IDataState {
  total: number;
  list: Array<DataItem>;
}
```

行选择

```ts
type ISelectionState = Array<DataItem>;
```

查询条件

```ts
type IQueryValues = Record<string, any>;
```

### 状态读取

Jotai 提供了`useAtom`、`useAtomValue`、`useSetAtom`三种模式，分别获取值与 updator、值、updator。基于这些 hooks，可以封装出`usePagination`、`usePaginationState`等访问 hooks，屏蔽 Jotai 的细节。
