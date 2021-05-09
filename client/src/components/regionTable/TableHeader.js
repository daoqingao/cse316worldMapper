import React from 'react';

import {WButton, WRow, WCol, WNavItem} from 'wt-frontend';

const TableHeader = (props) => {
    const clickDisabled = () => { };
    const buttonStyle = !props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    
    const undoOptions = {
        className:!props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
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

    const sortButton = props.disabled ? 'table-header-section-disable' : 'table-header-section';
    const nonSortButton = props.disabled ? 'table-header-section-disable' : 'table-header-section-flagAndLand';



    return (

        <div>
            <WRow>
                <WCol size={"3"}>
                    <div className="table-header-buttons">
                        <WButton onClick={ props.addSubregion} wType="texted" className="table-header-button" clickAnimation={props.disabled ? "" : "ripple-light" }>
                            <i className="material-icons">add_box</i>
                        </WButton>
                        <WButton {...undoOptions}>
                            <i className="material-icons">undo</i>
                        </WButton>
                        <WButton  {...redoOptions}>
                            <i className="material-icons">redo</i>
                        </WButton>



                        {/*<WButton onClick={props.disabled ? clickDisabled : props.setShowDelete} wType="texted" className={`${buttonStyle}`} clickAnimation={props.disabled ? "" : "ripple-light" }>*/}
                        {/*    <i className="material-icons">delete_outline</i>*/}
                        {/*</WButton>*/}
                        {/*<WButton onClick={props.disabled ? clickDisabled : () => props.setActiveList({})} wType="texted" className={`${buttonStyle}`} clickAnimation={props.disabled ? "" : "ripple-light" }>*/}
                        {/*    <i className="material-icons">close</i>*/}
                        {/*</WButton>*/}
                    </div>
                </WCol>
                <WCol size={"2"}>

                </WCol>
                <WCol size={"6"}>

                    <WButton className="tableName" shape="pill"
                             hoverAnimation="darken"
                             clickAnimation="ripple-light"
                             onClick = {() => props.showRegionViewer(props.activeRegion._id)}
                             >
                        Enter Region Viewer: {props.activeRegion.name}
                    </WButton>

                </WCol>

            </WRow>
            <WRow className="table-header">





                <WCol size="2">
                    <WButton onClick={props.disabled ? () => {} : () => props.sort('name') } className={`${sortButton}`}  wType="texted" >Region Name</WButton>
                </WCol>

                <WCol size="2">
                    <WButton onClick={props.disabled ? () => {} : () => props.sort('capital') } className={`${sortButton}`}wType="texted">Capital</WButton>
                </WCol>

                <WCol size="2">
                    <WButton onClick={props.disabled ? () => {} : () => props.sort('leader') }className={`${sortButton}`} wType="texted" >Leader</WButton>
                </WCol>
                <WCol size="2">
                    <WButton className={`${nonSortButton}`}wType="texted" >Flag</WButton>
                </WCol>

                <WCol size="3">
                    <WButton className={`${nonSortButton}`} wType="texted" >Landmarks</WButton>

                </WCol>


            </WRow>
        </div>

    );
};

export default TableHeader;