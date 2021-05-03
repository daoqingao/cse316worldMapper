import React from 'react';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WRow, WCol, WButton} from 'wt-frontend';
import RegionNavigatorEntry from './RegionNavigatorEntry'
import MainRegionTable from "../regionTable/MainRegionTable";
import RegionViewerMain from "../regionViewer/RegionViewerMain";

const RegionNavigator = (props) => {




    let linkListPath=[props.activeRegion];


    let allRegion = props.regions
    let cursorRegion = props.activeRegion
    let cursorRegionParentID = props.activeRegion.parentRegionID

    while(cursorRegion.isRoot===false){
        allRegion.forEach(
            x => {
                if(x._id === cursorRegionParentID ){
                    linkListPath.push(x)
                    cursorRegion=x
                    cursorRegionParentID=x.parentRegionID
                }
            }
        )
    }

    linkListPath.reverse()





    if(!props.showRegionTable && !props.showRegionViewer)
        return (            <></>        )

    return (

        <div>


            {
            linkListPath.map(entry => (
                <RegionNavigatorEntry
                entry = {entry}
                changeRegion={(_id) => props.changeRegion(_id)}

                setShowRegionViewer = {props.setShowRegionViewer}
                setShowRegionTable=   {props.setShowRegionTable}
                />
            ))
            }
        </div>
    );
};

export default RegionNavigator;