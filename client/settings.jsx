const helper = require('./helper.js');

const handleChange = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const newPass = e.target.querySelector('#newPass').value;
    const newPass2 = e.target.querySelector('#newPass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!username || !pass || !newPass) {
        helper.handleError('All fields are required!');
        return false;
    }

    if(newPass !== newPass2) {
        helper.handleError('New passwords do not match!');
        return false;
    }

    if(pass === newPass) {
        return res.status(400).json({ error: 'New password is the same as the old password!' });
    }

    helper.sendPost(e.target.action, {username, pass, _csrf});

    return false;
}

const SettingsWindow = (props) => {
    return (
        <form id="pwChangeForm"
            name="pwChangeForm"
            onSubmit={handleChange}
            action="/pwChange"
            method="POST"
            className="mainForm"
        >
            <div className="formHolder">
                <label htmlFor="username">Username: </label>
                <input id="user" type="text" name="username" placeholder="username" /><br></br>
                <label htmlFor="pass">Current Password: </label>
                <input id="pass" type="password" name="pass" placeholder="current password" /><br></br>
                <label htmlFor="newPass">New Password: </label>
                <input id="newPass" type="password" name="newPass" placeholder="new password" /><br></br>
                <label htmlFor="newPass2">Retype New Password: </label>
                <input id="newPass2" type="password" name="newPass2" placeholder="retype new password" />
                <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                <input className="formSubmit" type="submit" value="Change Password" />
            </div>
        </form>
    );
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <SettingsWindow csrf={data.csrfToken} />,
        document.getElementById('content')
    );
};

window.onload = init;