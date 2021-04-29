import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
    const { data } = props;


    const name = data.name;
    const capital = data.capital;
    const leader= data.leader;
    const flag = data.flag;
    const landmarks = data.landmark


    const [editingRegionName, toggleRegionNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);


    const disabledButton = () => {}

    const handleRegionNameEdit = (e) => {
        toggleRegionNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No RegionName';
        const prevName = name;
        if(newName !== prevName) {
            props.editSubregion(data._id, 'name', newName, prevName);
        }
    };


    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newF = e.target.value ? e.target.value : 'No Capital';
        const prev = capital;
        if(newF  !== prev) {
            props.editSubregion(data._id, 'capital', newF, prev);
        }
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newF = e.target.value ? e.target.value : 'No Leader';
        const prev = leader;
        if(newF  !== prev) {
            props.editSubregion(data._id, 'leader', newF, prev);
        }
    };






    return (
        <WRow className='table-entry'>
            <WCol size="2">
                {
                    editingRegionName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleRegionNameEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleRegionNameEdit(e)}}
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
                            onKeyDown={(e) => {if(e.keyCode === 13) handleCapitalEdit(e)}}
                            autoFocus={true} defaultValue={name} type='text'
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
                            onKeyDown={(e) => {if(e.keyCode === 13) handleLeaderEdit(e)}}
                            autoFocus={true} defaultValue={name} type='text'
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
                    <div className="table-text" onClick={ () => props.changeRegion(data._id)}>
                        {flag}
                    </div>

                }
            </WCol>

            <WCol size="2">
                {
                    <div className="table-text">
                        {landmarks}
                    </div>

                }
            </WCol>


            <WCol size="2">
                <div className='button-group'>
                    {/*<WButton className={canMoveUp ? "table-entry-buttons" : "table-entry-buttons-disabled"} onClick={canMoveUp ? () => props.reorderItem(data._id, -1) : disabledButton } wType="texted">*/}
                    {/*    <i className="material-icons">expand_less</i>*/}
                    {/*</WButton>*/}
                    {/*<WButton className={canMoveDown ? "table-entry-buttons" : "table-entry-buttons-disabled"} onClick={canMoveDown ? () => props.reorderItem(data._id, 1) : disabledButton } wType="texted">*/}
                    {/*    <i className="material-icons">expand_more</i>*/}
                    {/*</WButton>*/}
                    <WButton className="table-entry-buttons" onClick={() => props.deleteSubregion(data, props.index)} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>
        </WRow>
    );
};

export default TableEntry;