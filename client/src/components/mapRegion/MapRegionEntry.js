import React, { useState }  from 'react';
import {WNavItem, WInput, WLayout} from 'wt-frontend';
import * as ALl from 'wt-frontend';
import {WModal, WMHeader, WMMain, WMFooter, WButton, WRow, WCol} from 'wt-frontend';
import Delete from "../modals/Delete";

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

        console.log(name)
        console.log(value)
        props.updateListField(props._id, name, value, preEdit);
    };

    const handleSetActive = (e) => {
        props.handleSetActive(props._id)
        props.setShowMapRegion()
        props.setShowRegionTable(props._id)
    }


    const handleDelete = (e) => {
        props.setShowDelete(true)
        props.setDeleteID(props._id)
        // props.deleteMapRegion(props._id)
    }



    const entryStyle = props._id === props.activeid ? 'list-item-active' : 'list-item ';
    
    return (

        <WRow>
            <WCol size={9}>
                <WNavItem
                    className={entryStyle} onDoubleClick={                             handleEditing        }
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
                            <div className='list-text'>
                                {props.name}

                            </div>


                    }
                </WNavItem >
            </WCol>

            <WCol>
                <WButton className='mapDeleteButton' onClick={handleDelete}>
                    <i className="material-icons mapDeleteButton">delete</i>
                </WButton>
            </WCol>
            <WCol>
                <WButton className='mapDeleteButton' onClick={  handleEditing  }>
                    <i className="material-icons mapDeleteButton">edit</i>
                </WButton>
            </WCol>

        </WRow>


    );
};

export default MapRegionEntry;