import React        from 'react';
import MapRegionEntry from './MapRegionEntry';

const MapRegionList = (props) => {
    let tempID = 0

    let isEmpty = props.listIDs[0]===undefined

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
                    />:<></>
                ))
            }
        </>
    );
};

export default MapRegionList;