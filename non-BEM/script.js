const commentForm = document.querySelector(".comment-form");
const list = document.querySelector(".comments");

let comments = [];

function displayComment() {
  const html = comments
    .map(
      (comment) => /* html */ `
        <li class="comments__comment flex flex-col gap-4 p-8 border border-solid border-black/60 rounded-md ">
            <h3 class="font-['Inter'] font-semibold text-[1.5rem]">${comment.name} <span class="text-[1rem] font-normal">commented:</span></h3>
            <p class="text-[1rem] font-['Inter'] italic">${comment.comment}</p>
        </li>
    `
    )
    .join("");

  list.innerHTML = html;
}

function handleSubmit(e) {
  e.preventDefault();
  console.log("submitted");

  const name = e.currentTarget.name.value;
  const comment = e.currentTarget.comment.value;

  const item = {
    name,
    comment,
  };

  comments.push(item);
  e.target.reset();

  list.dispatchEvent(new CustomEvent("commentsUpdated"));
}

function setToLocaleStorage() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function getFromLocalStorage() {
  const lsComments = JSON.parse(localStorage.getItem("comments"));

  if (lsComments.length) {
    comments.push(...lsComments);
    list.dispatchEvent(new CustomEvent("commentsUpdated"));
  }
}

commentForm.addEventListener("submit", handleSubmit);
list.addEventListener("commentsUpdated", displayComment);
list.addEventListener("commentsUpdated", setToLocaleStorage);

getFromLocalStorage();
