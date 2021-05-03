import React, {useState} from 'react';
import MapRegionEntry from './MapRegionEntry';
import Delete from "../modals/Delete";
import {WRow} from "wt-frontend";

const MapRegionList = (props) => {
    let tempID = 0

    let isEmpty = props.listIDs[0]===undefined

    const [deleteID, setDeleteID] 	= useState(false);


    return (
        <>
            {

                props.listIDs&& !isEmpty &&
                props.listIDs.map(entry => (
                    entry.isRoot?
                    <MapRegionEntry
                        handleSetActive={props.handleSetActive} activeid={props.activeid}
                        id={tempID++} key={entry._id+props.activeid} name={entry.name} _id={entry._id}
                        updateListField={props.updateListField}

                        deleteMapRegion={(_id) => (props.deleteMapRegion(_id))}
                        setShowMapRegion=  {props.setShowMapRegion}
                        setShowRegionTable={(_id)=> props.setShowRegionTable(_id)}

                        setShowDelete = {props.setShowDelete}
                        showDelete={props.showDelete}

                        setDeleteID = {setDeleteID}

                    />:<></>
                ))
            }

            {
                props.showDelete && (<Delete deleteMapRegion={(_id) => (props.deleteMapRegion(_id))} activeid={deleteID} setShowDelete={props.setShowDelete} />)
            }
        </>
    );
};

export default MapRegionList;