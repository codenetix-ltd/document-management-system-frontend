import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataLink } from 'Components/common/dataControls';

/**
 * Component for react-table's actions column with edit and delete buttons
 * @param props
 * @returns {*}
 * @constructor
 */
export default function ActionsCell(props) {
  const { editLink, rowData, onDelete } = props;
  return (
    <div>
      <Link to={editLink} className="btn-success btn btn-xs">
        <i className="fa fa-edit" />
      </Link>
      &nbsp;
      <DataLink cls="btn-danger btn btn-xs" data={rowData} onClick={onDelete}>
        <i className="fa fa-trash" />
      </DataLink>
    </div>
  );
}

ActionsCell.propTypes = {
  editLink: PropTypes.string.isRequired,
  rowData: PropTypes.any.isRequired,
  onDelete: PropTypes.func.isRequired
};
