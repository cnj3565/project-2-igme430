const helper = require('./helper.js');

const handlePremium = (e) => {
    e.preventDefault();
    helper.hideError();

    const premiumBool = e.target.querySelector('#premiumCheck').checked;
    const _csrf = e.target.querySelector("#_csrf").value;

    helper.sendPost(e.target.action, {premiumBool, _csrf});

    return false;
}

const PremiumForm = (props) => {
    return (
        <form id="premiumForm"
            onSubmit={handlePremium}
            name="premiumForm"
            action="/premium"
            method="POST"
            className="premiumForm"
        >
            <div className="formHolder">
                <p>Purchase a subscription for the Premium service to enjoy a cooler site experience!</p>
                <label id="premLabel" htmlFor="name">Toggle Premium: </label>
                <input id="premiumCheck" type="checkbox" name="premium" defaultChecked={false} />
                <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                <input className="formSubmit" type="submit" value="Change Effect" />
            </div>
        </form>
    )
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <PremiumForm csrf={data.csrfToken} />,
        document.getElementById('content')
    );

    const account = await fetch('/getAccount');
    const accData = await account.json();

    let checkbox = document.querySelector('#premiumCheck');
    if(accData.account.premium) {
        checkbox.defaultChecked = true;
    }
}

window.onload = init;