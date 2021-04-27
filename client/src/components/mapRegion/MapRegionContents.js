import React            from 'react';
import SidebarHeader    from './SidebarHeader';
import MapRegionList      from './MapRegionList';
import MapRegionEntry from "./MapRegionEntry";

const MapRegionContents = (props) => {
    return (
        <>
            {/*<SidebarHeader */}
            {/*    auth={props.auth} createNewList={props.createNewList} activeid={props.activeid}*/}
            {/*/>*/}
            <MapRegionList
                activeid={props.activeid} handleSetActive={props.handleSetActive}
                listIDs={props.listIDs} createNewList={props.createNewList}
                updateListField={props.updateListField}
                deleteMapRegion={(_id) => (props.deleteMapRegion(_id))}
            />
        </>
    );
};

export default MapRegionContents;