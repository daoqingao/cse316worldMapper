import React, {useState} from 'react';
import TableEntry   from './TableEntry';
import MainRegionTable from "./MainRegionTable";
import Delete from "../modals/Delete";
import DeleteSubregion from "../modals/DeleteSubregion";
import MapRegionEntry from "../mapRegion/MapRegionEntry";

const TableContents = (props) => {

    // let entries = props.activeRegion ? props.activeRegion.subregionsID : null;
    // let entryCount = 0;
    // if(entries) {
    //     entries = entries.filter(entry => entry !== null);
    //     entryCount = entries.length
    // }
    //activeRegion is the data of the active region

    const [deleteID, setDeleteID] 	= useState(false);



    let subregionIDs = props.activeRegion ? props.activeRegion.subregionsID : null;

    let entries=[]

    let allRegions = props.allRegions

    let entryCount = 0;



    if(subregionIDs!== undefined){
        subregionIDs.forEach( (subregionID) => {
                allRegions.forEach( (region) => {
                    if(region._id===subregionID)
                        entries.push(region)
                    entryCount=entries.length
                })
            }
        )
    }

    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry._id} index={index} entryCount={entryCount}




                        editSubregion ={props.editSubregion}
                        deleteSubregion ={props.deleteSubregion}
                        changeRegion={(_id) => props.changeRegion(_id)}

                        showRegionViewer={(_id) =>  props.showRegionViewer(_id)}

                        toggleShowDeleteSubregion = {props.setShowDeleteSubregion}
                        setShowDeleteSubregion = {props.toggleShowDeleteSubregion}
                        showDeleteSubregion={props.showDeleteSubregion}
                        setDeleteID = {setDeleteID}

                    />
                ))
            }

                {
                    props.showDeleteSubregion && (<DeleteSubregion deleteMapRegion={(_id) => (props.deleteSubregion(_id))} activeid={deleteID} setShowDeleteSubregion={props.setShowDeleteSubregion} />)
                }
            </div>

            : <div className='container-primary' >
                {
                    props.activeRegion._id ? <h2 className="nothing-msg"> No subregions yet</h2> : <></>
                }               
                
            </div>



    );
};

export default TableContents;