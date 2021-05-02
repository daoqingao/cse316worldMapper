import React, {useState} from 'react';

import {WModal, WMHeader, WMMain, WButton, WMFooter, WInput} from 'wt-frontend';

const CreateMap = (props) => {

    const [input, setInput] = useState("");


    const updateInput = (e) => {
        let name=e.target.value
        setInput(name);
    };
    const handleCreateMap  = async (e) => {
        props.createNewMapRegionWithName(input)
        props.setShowCreateMap(false)
    }

    return (
        <WModal visible={props.showCreateMap}>
            <WMHeader  className="modal-header" onClose={() => props.setShowCreateMap(false)}>
                Create new Map Region?
            </WMHeader>

            <WMMain>
                <WInput
                    className="modal-input" onBlur={updateInput} name="name" labelAnimation="up"
                    barAnimation="solid" labelText="name" wType="outlined" inputType="text"
                />
            </WMMain>


            <WMFooter>
                <WButton className="modal-button" onClick={handleCreateMap} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
                    Create Map
                </WButton>
            </WMFooter>

        </WModal >
    );
}

export default CreateMap;