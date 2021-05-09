import React from 'react';
import {WButton, WNavItem} from "wt-frontend";
import MainRegionTable from "../regionTable/MainRegionTable";

const RegionNavigatorEntry = (props) => {

    let region = props.entry

    const handleChangeRegion = () =>
    {
        props.setShowRegionTable(true)
        props.setShowRegionViewer(false)
        props.changeRegion(region._id)
    }
    return (
        <WNavItem>
            <WButton className="create-map" shape="pill"
                     hoverAnimation="darken"
                     clickAnimation="ripple-light"
                     onClick = {() => handleChangeRegion()}>
                {region.name}
            </WButton>
            {
                props.isLast && (<i className="material-icons" >chevron_right</i>)
            }
        </WNavItem>
    );
};

export default RegionNavigatorEntry;