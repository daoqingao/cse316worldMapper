import React            from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WRow, WCol , WMMain, WLFooter, WInput}  from 'wt-frontend';
import RegionViewerLandmarkTable from "./RegionViewerLandmarkTable";

const RegionViewerMain = (props) => {

    let regionViewerID = props.regionViewerID
    let allRegions = props.allRegions

    let currentRegionViewer;

    console.log(allRegions)
    console.log(regionViewerID)
    allRegions.forEach(
        x => {
            if (x._id===regionViewerID){
                currentRegionViewer=x;
            }
        }
    )


    console.log()
    return (
        <WLayout wLayout={"header"} className = "regionViewer">
            <WLHeader>

                <i className="material-icons">undo</i>
                <i className="material-icons">redo</i>

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
                                            landmarks={currentRegionViewer.regionLandmark}/>
                                    ))



                                }
                            </WLMain>

                            <WLFooter>

    <WRow>
        <WCol>
            {/*<i className="material-icons" >add</i>*/}
        </WCol>

        <WCol size={"3"}>
            <WInput

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