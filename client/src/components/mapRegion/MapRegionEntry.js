import React, { useState }  from 'react';
import { WNavItem, WInput } from 'wt-frontend';
import * as ALl from 'wt-frontend';
import {WModal, WMHeader, WMMain, WMFooter, WButton, WRow, WCol} from 'wt-frontend';

const MapRegionEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateListField(props._id, name, value, preEdit);
    };

    const handleSetActive = (e) => {
        props.handleSetActive(props._id)
        props.setShowMapRegion()
        props.setShowRegionTable(props._id)
    }

    const entryStyle = props._id === props.activeid ? 'list-item-active' : 'list-item ';
    
    return (
        <WNavItem
            className={entryStyle} onDoubleClick={                handleEditing }
            onClick={
                handleSetActive





            }
        >
            {
                editing ?   <WInput className="list-item-edit" inputClass="list-item-edit-input"
                                onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                            />
                        :
                    <div>
                        <div className='list-text'>
                            {props.name}
                            <WButton className='mapDeleteButton' onClick={() => props.deleteMapRegion(props._id)}>
                                <i className="material-icons mapDeleteButton">delete</i>
                            </WButton>
                        </div>
                    </div>

            }
        </WNavItem >
    );
};

export default MapRegionEntry;