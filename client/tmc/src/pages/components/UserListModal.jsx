import React from "react";

export default function UserListModal({ heading, type, userList = [] }) {
  return (
    <div className="modal fade" id={`userlist-modal-${type}`}>
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{heading}</h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">{userList.map(() => {})}</div>
        </div>
      </div>
    </div>
  );
}
