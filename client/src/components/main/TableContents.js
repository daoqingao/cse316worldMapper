import React        from 'react';
import TableEntry   from './TableEntry';
import MainRegionTable from "./MainRegionTable";

const TableContents = (props) => {

    //activeRegion is the data of the active region
    let entries = props.activeRegion ? props.activeRegion.subregionsID : null;
    let entryCount = 0;
    if(entries) {
        entries = entries.filter(entry => entry !== null);
        entryCount = entries.length
    }
    console.log(entries)
    
    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry._id} index={index} entryCount={entryCount}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem}
                    />
                ))
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