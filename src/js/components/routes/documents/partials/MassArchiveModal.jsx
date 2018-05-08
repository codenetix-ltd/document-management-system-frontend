import React from 'react';

const MassArchiveModal = () => (
  <div>
    <p>Do you really want to archive selected documents?</p>
    <hr />
    <form className="form-horizontal">
      <div className="form-group">
        <label className="col-md-4 control-label">New actual document</label>
        <div className="col-md-8">
          <select>
            <option>test</option>
          </select>
        </div>
      </div>
    </form>
  </div>
);

export default MassArchiveModal;
