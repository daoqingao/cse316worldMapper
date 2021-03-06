import React from 'react';
import { WNavItem} from "wt-frontend";
import { WLayout, WLHeader, WLMain, WLSide, WRow, WCol, WButton} from 'wt-frontend';
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
        <div>
            <WNavItem className={"navEntryBox"} >


        <WButton
            className={"navEntry"}
            shape="pill"
                   hoverAnimation="darken"
                   clickAnimation="ripple-light"
                   onClick = {() => handleChangeRegion()}>
            {region.name}

        </WButton>

        {
            props.isLast && (<i className="material-icons chevRight" >chevron_right</i>)
        }



            </WNavItem>



        </div>



    );
};

export default RegionNavigatorEntry;