import React from "react";

/* Warning Modal for deleting stuff */
export default function DeleteModal({ delFunc }) {
  return (
    <div className="modal fade" id="delete-modal">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-danger">Warning!</h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to proceed?. </p>
            <p>Deleting this content will permanently delete it.</p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-danger me-4" onClick={delFunc}>
                Yes, Delete
              </button>
              <button className="btn btn-primary" data-bs-dismiss="modal">
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
