import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const DeleteSubregion = (props) => {

    const handleDelete = async () => {
        props.deleteMapRegion(props.activeid);
        props.setShowDeleteSubregion(false);
    }

    return (
        <WModal className="delete-modal" cover="true" visible="true">
            <WMHeader  className="modal-header" onClose={() => props.setShowDeleteSubregion(false)}>
                Delete subregion?
            </WMHeader >

            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDeleteSubregion(false)} wType="texted">
                    Cancel
                </WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
                </WButton>
            </WMMain>

        </WModal >

    );
}

export default DeleteSubregion;