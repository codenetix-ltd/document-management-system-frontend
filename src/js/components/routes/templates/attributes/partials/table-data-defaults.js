import cloneDeep from 'lodash/cloneDeep';

const column = {
  name: 'Enter column title',
  typeId: 1
};

const columnData = {
  isLocked: false,
  typeId: 1
};

const data = {
  column,
  columnData
};

export default function getTpl(name) {
  return cloneDeep(data[name]);
}
