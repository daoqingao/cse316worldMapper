import React        from 'react';
import MapRegionEntry from './MapRegionEntry';

const MapRegionList = (props) => {
    let tempID = 0
    return (
        <>
            {
                props.listIDs &&
                props.listIDs.map(entry => (
                    <MapRegionEntry
                        handleSetActive={props.handleSetActive} activeid={props.activeid}
                        id={tempID++} key={entry._id+props.activeid} name={entry.name} _id={entry._id}
                        updateListField={props.updateListField}

                        deleteMapRegion={(_id) => (props.deleteMapRegion(_id))}
                    />
                ))
            }
        </>
    );
};

export default MapRegionList;