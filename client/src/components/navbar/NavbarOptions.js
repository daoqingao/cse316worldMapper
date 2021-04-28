import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        console.log(data.getCurrentUser.name)
        if (data) {
            let reset = await client.resetStore();
            if (reset) props.setActiveList({});
        }
    };


    // const getUser = async () => {
    //     const { data } = await props.fetchUser();
    //     return data
    // }
    //
    //
    // (async () => {
    //     const result = await getUser()
    //     const username= await result.getCurrentUser.name
    // })()

    const username=props.user.name;


    return (
        <>

            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" style={{color:"orange"}} onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary">
                    {(username)}
                </WButton>
            </WNavItem>

            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                    Logout
                </WButton>
            </WNavItem >
        </>


    );
};

const LoggedOut = (props) => {
    return (
        <>

            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" style={{color:"orange"}} onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary">
                    Create Account
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} />
                : <LoggedIn user={props.user} fetchUser={props.fetchUser} setActiveList={props.setActiveList} logout={props.logout} setShowCreate={props.setShowUpdate} />
            }
        </>

    );
};


export default NavbarOptions;