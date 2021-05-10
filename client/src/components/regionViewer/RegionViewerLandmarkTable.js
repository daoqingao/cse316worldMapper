import React, {useState} from 'react';
import {WLayout, WLHeader, WLMain, WLSide, WRow, WCol, WMMain, WLFooter, WButton, WInput} from 'wt-frontend';

const RegionViewerLandmarkTable = (props) => {

    const handleDeleteLandmark = () => {

        props.addRegionLandmark("",props.regionViewerID,-1,props.indexCounter)
    }

    const [editing, toggleEditing] = useState(false);

    const handleEditing = (e) => {
        e.stopPropagation();
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;

        console.log(name)
        console.log(value)
        props.addRegionLandmark(value,props.regionViewerID,2,props.indexCounter)

    };





    return (
        <WRow className ='table-entry'>
            <WCol size="10">
                {
                    editing ?   <WInput className="list-item-edit" inputClass="list-item-edit-input"
                                        onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                        name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.entry}
                        />
                        :
                        <div className='list-text'>
                            {props.entry}

                        </div>
                }
            </WCol>





            <WCol size={"1"}>
                {
                    !props.child && (                <WButton
                        className='mapDeleteButton'
                        shape="pill"
                        hoverAnimation="darken"
                        clickAnimation="ripple-light"
                        onClick={handleDeleteLandmark}
                    >
                        <i className="material-icons">delete</i>
                    </WButton>)
                }
            </WCol>


            <WCol size={"1"}>
                {
                    !props.child && (                <WButton
                        className='mapDeleteButton'
                        shape="pill"
                        hoverAnimation="darken"
                        clickAnimation="ripple-light"
                        onClick={handleEditing}
                    >
                        <i className="material-icons">edit</i>
                    </WButton>)
                }
            </WCol>

        </WRow>

    );
};

export default RegionViewerLandmarkTable;