import React from 'react';
import {WButton, WNavItem} from "wt-frontend";
import MainRegionTable from "../regionTable/MainRegionTable";

const RegionNavigatorEntry = (props) => {

    let region = props.entry

    return (
        <WNavItem>
            <WButton onClick = {() => props.changeRegion(region._id)}>
                {region.name}
            </WButton>
            <i className="material-icons" >chevron_right</i>
        </WNavItem>
    );
};

export default RegionNavigatorEntry;