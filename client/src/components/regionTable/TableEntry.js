import React, {useEffect, useRef, useState} from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';


const TableEntry = (props) => {
    const { data } = props;


    const name = data.name;
    const capital = data.capital;
    const leader= data.leader;
    const flag = data.flag;
    const landmarks = data.landmark
    const regionLandmark=data.regionLandmark;
    let hasLandmark = false
    if(regionLandmark[0]!==undefined)
        hasLandmark=true




    const [editingRegionName, toggleRegionNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    useEffect(() => {

        if(props.editType==="name")
            if(editingRegionName===false)
                toggleRegionNameEdit( props.index===props.activeIndex)
        if(props.editType==="capital")
                if(editingCapital===false)
                    toggleCapitalEdit( props.index===props.activeIndex)
        if(props.editType==="leader")
            if(editingLeader===false)
                toggleLeaderEdit( props.index===props.activeIndex)
    });








    const disabledButton = () => {}

    const handleRegionNameEdit = (e) => {
        toggleRegionNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No RegionName';
        const prevName = name;
        if(newName !== prevName) {
            props.editSubregion(data._id, 'name', newName, prevName);
        }
        props.setActiveIndex(-1)
    };


    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newF = e.target.value ? e.target.value : 'No Capital';
        const prev = capital;
        if(newF  !== prev) {
            props.editSubregion(data._id, 'capital', newF, prev);
        }
        props.setActiveIndex(-1)
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newF = e.target.value ? e.target.value : 'No Leader';
        const prev = leader;
        if(newF  !== prev) {
            props.editSubregion(data._id, 'leader', newF, prev);
        }
        props.setActiveIndex(-1)
    };

    const handleDeleteSubregion = (e) => {
        console.log("called")
        props.setShowDeleteSubregion(true)
        props.setDeleteID(data._id)
        // props.deleteSubregion(data, props.index)
    }


    const handleToggleDownEdit = (type) => {

        props.setActiveIndex(props.index+1)
        props.setTypeEdit(type)
    }

    const handleToggleUpEdit = (type) => {
        props.setActiveIndex(props.index-1)
        props.setTypeEdit(type)
    }

    var path = process.env.PUBLIC_URL;
    var image = "/"+name +" Flag.png";




    return (
        <WRow className='table-entry'>
            <WCol size="2">
                {
                    editingRegionName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleRegionNameEdit}
                            onKeyDown={(e) => {
                                if(e.keyCode === 13) handleRegionNameEdit(e)
                                if(e.keyCode === 39) {
                                    toggleCapitalEdit(!editingCapital)
                                    toggleRegionNameEdit(!editingRegionName)
                                    props.setActiveIndex(-1)
                                }
                                if(e.keyCode === 40) {

                                    if(props.entrySize-1!==props.index){
                                        toggleRegionNameEdit(!editingRegionName)
                                        handleToggleDownEdit("name")
                                    }

                                }
                                if(e.keyCode === 38) {
                                    if(0!==props.index)
                                    {
                                        toggleRegionNameEdit(!editingRegionName)
                                        handleToggleUpEdit("name")
                                    }
                                }
                                }
                            }
                            autoFocus={true} defaultValue={name} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleRegionNameEdit(!editingRegionName)}
                        >{name}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingCapital || capital === ''
                        ? <WInput
                            className='table-input' onBlur={handleCapitalEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleCapitalEdit(e)
                                if(e.keyCode === 39) {
                                toggleCapitalEdit(!editingCapital)
                                toggleLeaderEdit(!editingLeader)
                                    props.setActiveIndex(-1)
                                }
                                if(e.keyCode === 37) {

                                    toggleCapitalEdit(!editingCapital)
                                    toggleRegionNameEdit(!editingRegionName)
                                    props.setActiveIndex(-1)
                                }

                                if(e.keyCode === 40) {
                                    if(props.entrySize-1!==props.index)
                                    {
                                        toggleCapitalEdit(!editingCapital)
                                        handleToggleDownEdit("capital")
                                    }
                                }
                                if(e.keyCode === 38) {
                                    if(0!==props.index){
                                        toggleCapitalEdit(!editingCapital)
                                        handleToggleUpEdit("capital")
                                    }

                                }

                            }}
                            autoFocus={true} defaultValue={capital} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                               onClick={() => toggleCapitalEdit(!editingCapital)}
                        >{capital}
                        </div>
                }
            </WCol>


            <WCol size="2">
                {
                    editingLeader|| leader === ''
                        ? <WInput
                            className='table-input' onBlur={handleLeaderEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleLeaderEdit(e)
                                if(e.keyCode === 37) {
                                    toggleCapitalEdit(!editingCapital)
                                    toggleLeaderEdit(!editingLeader)
                                    props.setActiveIndex(-1)
                                }

                                if(e.keyCode === 40) {
                                    if(props.entrySize-1!==props.index){
                                        toggleLeaderEdit(!editingLeader)
                                        handleToggleDownEdit("leader")
                                    }

                                }
                                if(e.keyCode === 38) {
                                    if(0!==props.index){
                                        toggleLeaderEdit(!editingLeader)
                                        handleToggleUpEdit("leader")
                                    }
                                }


                            }}
                            autoFocus={true} defaultValue={leader} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                               onClick={() => toggleLeaderEdit(!editingLeader)}
                        >{leader}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    <div className="table-text" onClick = {() => {
                        props.changeRegion(data._id)
                        props.showRegionViewer(data._id)

                    }}>
                        <img width="35"
                             src={path+image} ></img>
                    </div>

                }
            </WCol>

            <WCol size="2">
                {
                    <div className="table-text" onClick = {() => {
                        props.changeRegion(data._id)
                        props.showRegionViewer(data._id)

                    }}>
                        {hasLandmark?regionLandmark[0]+",...":"none"}
                    </div>

                }
            </WCol>

            <WCol size="1">
                {
                    <div className="table-text" onClick = {() => props.changeRegion(data._id)}>
                        Navigate To Subregion
                    </div>

                }
            </WCol>


            <WCol size="1">
                <div className='button-group'>
                    {/*<WButton className={canMoveUp ? "table-entry-buttons" : "table-entry-buttons-disabled"} onClick={canMoveUp ? () => props.reorderItem(data._id, -1) : disabledButton } wType="texted">*/}
                    {/*    <i className="material-icons">expand_less</i>*/}
                    {/*</WButton>*/}
                    {/*<WButton className={canMoveDown ? "table-entry-buttons" : "table-entry-buttons-disabled"} onClick={canMoveDown ? () => props.reorderItem(data._id, 1) : disabledButton } wType="texted">*/}
                    {/*    <i className="material-icons">expand_more</i>*/}
                    {/*</WButton>*/}
                    <WButton className="table-entry-buttons" onClick={handleDeleteSubregion} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>
        </WRow>
    );
};

export default TableEntry;