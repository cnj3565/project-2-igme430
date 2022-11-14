const helper = require('./helper.js');

const handlePremium = (e) => {
    e.preventDefault();
    helper.hideError();

    const premium = e.target.querySelector('#premiumRadio').value;
    const _csrf = e.target.querySelector("#_csrf").value;

    helper.sendPost(e.target.action, {premium, _csrf});

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
            <label htmlFor="name">Toggle Premium: </label>
            <input id="premiumRadio" type="radio" name="premium" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
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
}