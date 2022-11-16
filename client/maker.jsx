const helper = require('./helper.js');

const handlePostit = (e) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector('#postitTitle').value;
    const content = e.target.querySelector("#postitContent").value;
    // Make this the username of the account currently in use
    const author = e.target.querySelector("#postitAuthor").value;
    const _csrf = e.target.querySelector("#_csrf").value;

    if(!title || !content) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {title, content, author, _csrf}, loadDomosFromServer);

    return false;
}

const PostitForm = (props) => {
    return (
        <form id="postitForm"
            onSubmit={handlePostit}
            name="postitForm"
            action="/maker"
            method="POST"
            className="postitForm"
        >
            <label htmlFor="title">Your Post's Title: </label>
            <input id="postitTitle" type="text" name="title" placeholder="My Title" />
            <label htmlFor="content">Write Your Post Here: </label>
            <input id="postitContent" type="text" name="content" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makePostitSubmit" type="submit" value="Make Postit" />
        </form>
        // the page should automatically detect username - no field necessary
    )
}

const PostitList = (props) => {
    if(props.postit.length === 0) {
        return (
            <div className="postitList">
                <h3 className="emptyPostit">No Posts Have Been Made Yet!</h3>
            </div>
        );
    }

    const postitNodes = props.postits.map(postit => {
        return (
            // likely will remove the img line
            <div key={postit._id} className="postit">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h2 className="postitTitle"> {postit.title} </h2>
                <p className="postitContent"> {postit.content} </p>
                <footer className="postitAuthor"> Written by {postit.author} </footer>
            </div>
        );
    });

    return (
        <div classname="postitList">
            {postitNodes}
        </div>
    );
};

const loadPostitsFromServer = async () => {
    const response = await fetch('/getPostits');
    const data = await response.json();
    ReactDOM.render(
        <PostitList postit={data.postits} />,
        document.getElementById('postits')
    );
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <PostitForm csrf={data.csrfToken} />,
        document.getElementById('makePostit')
    );

    ReactDOM.render(
        <PostitList postits={[]} />,
        document.getElementById('postits')
    );

    loadPostitsFromServer();
}