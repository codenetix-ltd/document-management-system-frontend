import cloneDeep from 'lodash/cloneDeep';

const column = {
  name: 'Enter title',
  type: {
    name: 'String',
    machineName: 'string',
    id: 1
  }
};

const columnData = {
  isLocked: false,
  type: {
    name: 'String',
    machineName: 'string',
    id: 1
  }
};

const data = {
  column,
  columnData
};

export default function getTpl(name) {
  return cloneDeep(data[name]);
}
