import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';
import TableEntry from "./TableEntry";

const MainRegionTable = (props) => {
    return (
        <div className='table ' >

            <TableHeader

                activeRegion = {props.activeRegion}
                disabled={!props.activeRegion._id}        addItem={props.addItem}
                undo={props.undo} redo={props.redo}     canUndo={props.canUndo} 
                canRedo={props.canRedo}                 setShowDelete={props.setShowDelete}
                setActiveList={props.setActiveList}     sort={props.sort}

                addSubregion = {props.addSubregion}
                showRegionViewer={(_id) =>  props.showRegionViewer(_id)}
            />
            <TableContents
                key={props.activeRegion._id}
                activeRegion={props.activeRegion}



                allRegionIDs = {props.allRegionIDs}
                allRegions =   {props.allRegions}

                editSubregion ={props.editSubregion}
                deleteSubregion ={props.deleteSubregion}
                changeRegion={(_id) => props.changeRegion(_id)}
                showRegionViewer={(_id) =>  props.showRegionViewer(_id)}

                toggleShowDeleteSubregion = {props.setShowDeleteSubregion}
                setShowDeleteSubregion = {props.toggleShowDeleteSubregion}
                showDeleteSubregion={props.showDeleteSubregion}

            />
        </div>
    );
};

export default MainRegionTable;