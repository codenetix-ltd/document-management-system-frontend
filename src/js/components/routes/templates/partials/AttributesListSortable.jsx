import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from 'react-sortable-hoc';

import Prompt from 'Components/common/Prompt';
import ActionsCell from 'Components/partials/ActionsCell';

import axios from 'Services/request';
import { getURL } from 'Config';

import { $$attributesFetch } from 'Store/thunks/attributes';
import { $attributesList } from 'Store/actions';

import { $$messageSet } from 'Store/thunks/message';
import { $$errorSet } from 'Store/thunks/error';

const DragHandle = SortableHandle(() => (<td className="drag-handle"><i className="fa fa-arrows-v" /></td>));

const Row = SortableElement(({ value, types }) => {
  const {
    id: attrID,
    name: attrName,
    typeId,
    tableComp
  } = value;
  const { templateID } = tableComp.props;
  const editLink = `/templates/${templateID}/attributes/${attrID}`;
  const { name: typeName } = types.length ? types.find(type => type.id === typeId) : { name: '' };
  return (
    <tr>
      <DragHandle />
      <td>{ attrName }</td>
      <td>{ typeName }</td>
      <td><ActionsCell editLink={editLink} rowData={value} onDelete={tableComp.onAttributeDelete} /></td>
    </tr>
  );
});

const mapState2Props = ({ types }) => ({ types });

const mapDispatch2Props = (dispatch) => ({ dispatch });

const ConnectedRow = connect(mapState2Props, mapDispatch2Props)(Row);


const SortableTable = SortableContainer(({ items }) => {
  return (
    <table className="table table-bordered attrs-list-sortable">
      <tbody>
        <tr>
          <th />
          <th>Name</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
        {items.map((value, index) => (
          <ConnectedRow key={`item-${index}`} index={index} value={value} />
        ))}
      </tbody>
    </table>
  );
});

@autobind
export class AttributesListSortable extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    attributes: PropTypes.any.isRequired,
    templateID: PropTypes.any.isRequired
  };

  componentDidMount() {
    this.fetchAttributes();
  }

  onAttributeDelete(value) {
    const { id, name } = value;
    const { templateID, dispatch } = this.props;
    const url = getURL('attributes', templateID);
    this.prompt.show({
      body: `Do you really want to delete attribute ${name}?`,
      onConfirm: close => {
        axios.delete(`${url}/${id}`).then(() => {
          $$messageSet(dispatch, {
            type: 'success',
            text: `The attribute ${name} was successfully deleted.`
          });
          $$attributesFetch(dispatch, templateID, this, close);
        }).catch(err => {
          $$errorSet(dispatch, err);
          close();
        });
      }
    });
  }

  onSortEnd({ oldIndex, newIndex }) {
    const { attributes, dispatch } = this.props;
    const list = arrayMove(attributes.list, oldIndex, newIndex);
    const reordered = list.map((attr, i) => ({ ...attr, order: i }));
    dispatch($attributesList({ list: reordered }));
  }

  fetchAttributes() {
    const { dispatch, templateID } = this.props;
    $$attributesFetch(dispatch, templateID, this);
  }

  render() {
    const { attributes } = this.props;
    attributes.list.sort((a, b) => {
      return a.order - b.order;
    });
    return (
      <div>
        <SortableTable
          helperClass="sortableHelper"
          items={attributes.list}
          onSortEnd={this.onSortEnd}
          useDragHandle
          axis="y"
          lockAxis="y"
          lockToContainerEdges
        />
        <Prompt ref={p => { this.prompt = p; }} confirmText="Delete" />
      </div>
    );
  }
}

const mapStateToProps = ({ attributes }) => ({ attributes });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AttributesListSortable);
