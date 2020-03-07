export enum E_SORT_TYPE {
  UP,
  DOWN,
  NONE,
}

interface ISort {
  type: E_SORT_TYPE;
  key?: string; // keyof T;
}

export class TableModel<T = { [key: string]: any }> {
  public sortState: ISort = { type: E_SORT_TYPE.NONE };
  public keys: string[];

  constructor(
    public items: T[],
    public names: Partial<Record<keyof T, string>>,
  ) {
    this.keys = Object.keys(names);
  }

  public sort(key: string & keyof T): void {
    if (key === this.sortState.key) {
      switch (this.sortState.type) {
        case E_SORT_TYPE.DOWN:
          this.sortState.type = E_SORT_TYPE.NONE;
          break;
        case E_SORT_TYPE.NONE:
          this.sortState.type = E_SORT_TYPE.UP;
          break;
        case E_SORT_TYPE.UP:
          this.sortState.type = E_SORT_TYPE.DOWN;
          break;
      }
    } else {
      this.sortState.key = key;
    }
    this.sortItems();
  }

  private sortItems(): void {
    const { type, key } = this.sortState;
    if (type !== E_SORT_TYPE.NONE) {
      const colType = typeof this.items[0][this.sortState.key];
      switch (colType) {
        case 'number':
          this.items.sort((item, next) => {
            const a = item[key];
            const b = next[key];
            if (type === E_SORT_TYPE.UP) {
              return a - b;
            }
            if (type === E_SORT_TYPE.DOWN) {
              return b - a;
            }
          });
          break;
        case 'string':
          this.items.sort((item, next) => {
            const a = (item[key] as string).toLowerCase();
            const b = (next[key] as string).toLowerCase();
            if (type === E_SORT_TYPE.UP) {
              if (a < b) {
                return -1;
              }
              if (a > b) {
                return 1;
              }
              return 0;
            }
            if (type === E_SORT_TYPE.DOWN) {
              if (b < a) {
                return -1;
              }
              if (b > a) {
                return 1;
              }
              return 0;
            }
          });
          break;
        case 'boolean':
          this.items.sort((item, next) => {
            const a = item[key] as boolean;
            const b = next[key] as boolean;
            if (type === E_SORT_TYPE.UP) {
              return a ? 1 : -1;
            }
            if (type === E_SORT_TYPE.DOWN) {
              return !b ? 1 : -1;
            }
          });
          break;
      }
    }
  }
}
