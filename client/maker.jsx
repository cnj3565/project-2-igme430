const helper = require('./helper.js');

const handlePostit = (e) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector('#postitTitle').value;
    const content = e.target.querySelector("#postitContent").value;
    const _csrf = e.target.querySelector("#_csrf").value;

    if(!title || !content) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {title, content, _csrf}, loadPostitsFromServer);

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
            <textarea id="postitContent" cols="40" rows="10" type="text" name="content" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makePostitSubmit" type="submit" value="Make Postit" />
        </form>
        // the page should automatically detect username - no field necessary
    );
}

const PostitList = (props) => {
    
    if(props.postits.length === 0) {
        return (
            <div className="postitList">
                <h3 className="emptyPostit">No Posts Have Been Made Yet!</h3>
            </div>
        );
    }

    // Find a way to return postits in reverse chronological order, maybe
    const postitNodes = props.postits.map(postit => {
        return (
            <div key={postit._id} className="postit">
                <h2 className="postitTitle"> {postit.title} </h2>
                <p className="postitContent"> {postit.content} </p>
                <footer className="postitAuthor"> Written by {postit.author} </footer>
            </div>
        );
    });

    return (
        <div className="postitList">
            {postitNodes}
        </div>
    );
};

const loadPostitsFromServer = async () => {
    let response;
    if(window.location.pathname === "/dashboard"){
        response = await fetch('/getPostitsAll');
    } else {
        response = await fetch('/getPostits');
    }
    
    const data = await response.json();
    ReactDOM.render(
        <PostitList postits={data.postits} />,
        document.getElementById('postitFeed')
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
        document.getElementById('postitFeed')
    );

    loadPostitsFromServer();
};

window.onload = init;