const url = 'https://jsonplaceholder.typicode.com/';
const postsCntr = document.querySelector('.posts');

const requestBtn = document.querySelector("#request");
const idInput = document.querySelector('#id');

requestBtn.addEventListener('click', main);

async function main() {
    const id = idInput.value;

    if(!isNaN(id)) {
        try {
            const resPosts = await fetch(`${url}posts/${id}`);
            const fetchedPost = await resPosts.json();
            const resComments = await fetch(`${url}posts/${id}/comments`);
            const comments = await resComments.json();

            createPostWithComments(fetchedPost, comments);
        } catch(error) {
            console.log(new Error(error));
        }
    }
}

function createPostWithComments(post, comments) {
    let {title, body} = post;
    let titleElem = document.createElement('h4');
    let bodyElem = document.createElement('p');
    let commentElem = document.createElement('p');
    const divOfComments = document.createElement('div');

    titleElem.textContent = title;
    bodyElem.textContent = body;

    postsCntr.append(titleElem);
    titleElem.after(bodyElem);

    if(comments.length != 0) {
        commentElem.textContent = "Comments:";

        for(let {email, body} of comments) {
            let comment = document.createElement('p');
            comment.innerHTML = email + "</br>" + body;
            divOfComments.append(comment);
        }

        bodyElem.after(divOfComments);
        bodyElem.after(commentElem);
    }
}