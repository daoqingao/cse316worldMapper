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
    linkListPath.pop()







    const handleGoLeft = () => {

        let parentRegion = allRegion.find(region => region._id===props.activeRegion.parentRegionID)
        if(!parentRegion)
            return
        let subArr = parentRegion.subregionsID

        for(let i=0;i<subArr.length;i++){
            if (subArr[i]===props.activeRegion._id){

                if(subArr[i-1]!==undefined)
                {

                    props.changeRegion(subArr[i-1])
                    props.showThisRegionViewer(subArr[i-1])

                    return
                }
            }
        }


    }

    const handleGoRight = () => {
        let parentRegion = allRegion.find(region => region._id===props.activeRegion.parentRegionID)
        if(!parentRegion)
            return
        let subArr = parentRegion.subregionsID

        for(let i=0;i<subArr.length;i++){
            if (subArr[i]===props.activeRegion._id){

                if(subArr[i+1]!==undefined)
                {

                    props.changeRegion(subArr[i+1])
                    props.showThisRegionViewer(subArr[i+1])

                    return
                }
            }
        }

    }
    if(!props.showRegionTable && !props.showRegionViewer)
        return (            <></>        )

    return (

        <WRow                                    >



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





                {
                    props.showRegionViewer && (
                        <WCol size={"3"}>

                            <WButton onClick={handleGoLeft} >
                                <i className="material-icons">arrow_back</i>
                            </WButton>

                            <WButton onClick={handleGoRight}>
                                <i className="material-icons">arrow_forward</i>
                            </WButton>
                        </WCol>

                    )
                }



        </WRow>
    );
};

export default RegionNavigator;