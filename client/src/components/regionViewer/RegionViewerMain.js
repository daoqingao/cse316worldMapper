import React, {useState} from 'react';
import {WLayout, WLHeader, WLMain, WLSide, WRow, WCol, WMMain, WLFooter, WInput, WButton} from 'wt-frontend';
import RegionViewerLandmarkTable from "./RegionViewerLandmarkTable";

const RegionViewerMain = (props) => {

    let regionViewerID = props.regionViewerID
    let allRegions = props.allRegions

    let currentRegionViewer;

    // console.log(allRegions)
    // console.log(regionViewerID)
    allRegions.forEach(
        x => {
            if (x._id===regionViewerID){
                currentRegionViewer=x;
            }
        }
    )

    const [input,setInput]= useState("")
    const updateInput = (e) => {

        setInput(e.target.value)

    };

    const handleAddLandmark = () => {
        if(input==="")
            return
        props.addRegionLandmark(input,regionViewerID,1,-1)
    }
    let indexCounter=0;


    const clickDisabled = () => { };

    const undoOptions = {
        className:!props.canUndo ? ' navButtonDisable ' : 'navButton',
        onClick: !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted",
        clickAnimation: !props.canUndo ? "" : "ripple-light",
        shape: "rounded"
    }

    const redoOptions = {
        className:!props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick:  !props.canRedo   ? clickDisabled : props.redo,
        wType: "texted",
        clickAnimation: !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

    return (
        <WLayout wLayout={"header"} className = "regionViewer">
            <WLHeader>

                <WButton {...undoOptions}>
                    <i className="material-icons">undo</i>
                </WButton>
                <WButton  {...redoOptions}>
                    <i className="material-icons">redo</i>
                </WButton>



            </WLHeader>
            <WLMain>
                <WRow>
                    <WCol size={"1"}>
                    </WCol>

                    <WCol size="5">

                            <WCol size={"6"}>
                                <i className="material-icons another" >public</i>
                            </WCol>


                        <WRow>
                            <WCol size={"3"}>
                                RegionName:
                            </WCol>
                            <WCol size={"3"}>
                                {currentRegionViewer.name}
                            </WCol>

                        </WRow>


                        <WRow>
                            <WCol size={"3"}>
                                Parent Region:
                            </WCol>
                            <WCol size={"1"}>
                                {currentRegionViewer.parentRegion}
                            </WCol>
                            <WCol size={"1"}>
                                <i className="material-icons" >edit</i>
                            </WCol>

                        </WRow>


                        <WRow>
                            <WCol size={"3"}>
                                Region Capital
                            </WCol>
                            <WCol size={"3"}>
                                {currentRegionViewer.capital}
                            </WCol>

                        </WRow>

                        <WRow>
                            <WCol size={"3"}>
                                Region Leader:
                            </WCol>
                            <WCol size={"3"}>
                                {currentRegionViewer.leader}
                            </WCol>

                        </WRow>

                        <WRow>
                            <WCol size={"3"}>
                                # Of Subregions:
                            </WCol>
                            <WCol size={"3"}>
                                {currentRegionViewer.subregionsID.length}
                            </WCol>

                        </WRow>

                    </WCol>
                    <WCol size={"4"}>
                        Region Landmarks:
                        <WLayout wLayout={"footer"}>

                            <WLMain>


                                {
                                    currentRegionViewer.regionLandmark.length!==0 &&
                                    currentRegionViewer.regionLandmark.map(entry => (
                                        <RegionViewerLandmarkTable
                                            entry ={entry}
                                            landmarks={currentRegionViewer.regionLandmark}
                                            addRegionLandmark={props.addRegionLandmark}
                                            regionViewerID={regionViewerID}
                                            indexCounter={indexCounter++}

                                        />



                                            ))



                                }
                            </WLMain>

                            <WLFooter>

    <WRow>
        <WCol>
            <WButton                shape="pill"
                                    hoverAnimation="darken"
                                    clickAnimation="ripple-light"
                                    onClick={handleAddLandmark}
            >
                <i className="material-icons">add</i>
            </WButton>

        </WCol>

        <WCol size={"3"}>
            <WInput onBlur = {updateInput}

            />
        </WCol>
    </WRow>



                            </WLFooter>
                        </WLayout>


                    </WCol>
                </WRow>
            </WLMain>



        </WLayout>
    );
};

export default RegionViewerMain;