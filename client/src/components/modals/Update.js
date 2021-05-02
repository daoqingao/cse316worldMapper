import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const Update = (props) => {
    const [input, setInput] = useState({ email: '', password: '', name: '',_id: props.user._id});
    const [loading, toggleLoading] = useState(false);
    const [Update] = useMutation(UPDATE);


    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value };
        setInput(updated);
    };

    const handleUpdateAccount = async (e) => {
        for (let field in input) {
            if (!input[field]) {
                alert('All fields must be filled out to update');
                return;
            }
        }


        console.log(input)
        const { loading, error, data } = await Update({ variables: { ...input } });
        if (loading) { toggleLoading(true) };
        if (error) { return `Error: ${error.message}` };
        if (data) {
            console.log(data)
            toggleLoading(false);
            if(data.update.email === 'already exists') {
                alert('User with that email already update');
            }
            else {
                props.fetchUser();
            }
            props.setShowUpdate(false);

        };
    };

    return (
        <WModal className="signup-modal"  cover="true" visible={props.setShowUpdate}>
            <WMHeader  className="modal-header" onClose={() => props.setShowUpdate(false)}>
                Update
            </WMHeader>

            {
                loading ? <div />
                    : <WMMain>
                        <WInput
                            className="modal-input" onBlur={updateInput} name="name" labelAnimation="up"
                            barAnimation="solid" labelText="name" wType="outlined" inputType="text"
                        />

                        <div className="modal-spacer">&nbsp;</div>
                        <WInput
                            className="modal-input" onBlur={updateInput} name="email" labelAnimation="up"
                            barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text"
                        />
                        <div className="modal-spacer">&nbsp;</div>
                        <WInput
                            className="modal-input" onBlur={updateInput} name="password" labelAnimation="up"
                            barAnimation="solid" labelText="Password" wType="outlined" inputType="password"
                        />
                    </WMMain>
            }
            <WMFooter>
                <WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
                    Update Account
                </WButton>
            </WMFooter>

        </WModal>
    );
}

export default Update;

// import React, { useState } 	from 'react';
// import { REGISTER }			from '../../cache/mutations';
// import { useMutation }    	from '@apollo/client';
//
// import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
//
// const CreateAccount = (props) => {
// 	const [input, setInput] = useState({ email: '', password: '', name: '' });
// 	const [loading, toggleLoading] = useState(false);
// 	const [Register] = useMutation(REGISTER);
//
//
// 	const updateInput = (e) => {
// 		const { name, value } = e.target;
// 		const updated = { ...input, [name]: value };
// 		setInput(updated);
// 	};
//
// 	const handleCreateAccount = async (e) => {
// 		for (let field in input) {
// 			if (!input[field]) {
// 				alert('All fields must be filled out to register');
// 				return;
// 			}
// 		}
// 		const { loading, error, data } = await Register({ variables: { ...input } });
// 		if (loading) { toggleLoading(true) };
// 		if (error) { return `Error: ${error.message}` };
// 		if (data) {
// 			console.log(data)
// 			toggleLoading(false);
// 			if(data.register.email === 'already exists') {
// 				alert('User with that email already registered');
// 			}
// 			else {
// 				props.fetchUser();
// 			}
// 			props.setShowCreate(false);
//
// 		};
// 	};
//
// 	return (
// 		<WModal className="signup-modal"  cover="true" visible={props.setShowCreate}>
// 			<WMHeader  className="modal-header" style={{background:"red"}} onClose={() => props.setShowCreate(false)}>
// 				Sign Up
// 			</WMHeader>
//
// 			{
// 				loading ? <div />
// 					: <WMMain style={{color:"white"}}>
// 						<WRow className="modal-col-gap signup-modal">
// 							<WCol size="3">
// 								Name:
// 							</WCol>
// 							<WCol size="8">
// 								<WInput
// 									className="" onBlur={updateInput} name="name" labelAnimation="up"
// 									barAnimation="solid" labelText="Enter Your Name Here" wType="outlined" inputType="text"
// 								/>
// 							</WCol>
// 						</WRow>
//
// 						<WRow className="modal-col-gap signup-modal">
// 							<WCol size="3">
// 								Email:
// 							</WCol>
// 							<WCol size="8">
// 								<WInput
// 									className="modal-input" onBlur={updateInput} name="email" labelAnimation="up"
// 									barAnimation="solid" labelText="Enter Email Address Here" wType="outlined" inputType="text"
// 								/>
// 							</WCol>
// 						</WRow>
// 						<WRow className="modal-col-gap signup-modal">
// 							<WCol size="3">
// 								Password:
// 							</WCol>
// 							<WCol size="8">
// 								<WInput
// 									className="modal-input" onBlur={updateInput} name="password" labelAnimation="up"
// 									barAnimation="solid" labelText="Enter Password Address Here" wType="outlined" inputType="password"
// 								/>
// 							</WCol>
// 						</WRow>
//
// 						{/*<div className="modal-spacer">&nbsp;</div>*/}
// 						{/*<WInput */}
// 						{/*	className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" */}
// 						{/*	barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" */}
// 						{/*/>*/}
// 						{/*<div className="modal-spacer">&nbsp;</div>*/}
// 						{/*<WInput */}
// 						{/*	className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" */}
// 						{/*	barAnimation="solid" labelText="Password" wType="outlined" inputType="password" */}
// 						{/*/>*/}
// 					</WMMain>
// 			}
// 			<WMFooter>
// 				<WButton className="modal-button" onClick={handleCreateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
// 					Submit
// 				</WButton>
// 			</WMFooter>
//
// 		</WModal>
// 	);
// }
//
// export default CreateAccount;

