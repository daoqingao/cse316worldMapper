import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';
import TableEntry from "./TableEntry";

const MainRegionTable = (props) => {
    return (
        <div className='table ' >
            <TableHeader
                disabled={!props.activeRegion._id}        addItem={props.addItem}
                undo={props.undo} redo={props.redo}     canUndo={props.canUndo} 
                canRedo={props.canRedo}                 setShowDelete={props.setShowDelete}
                setActiveList={props.setActiveList}     sort={props.sort}

                addSubregion = {props.addSubregion}
            />
            <TableContents
                key={props.activeRegion._id}
                activeRegion={props.activeRegion}



                allRegionIDs = {props.allRegionIDs}
                allRegions =   {props.allRegions}

                editSubregion ={props.editSubregion}

            />
        </div>
    );
};

export default MainRegionTable;