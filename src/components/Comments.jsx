import "./Comments.scss";
import { useEffect, useState } from "react";
import { getCommentsByRecipe, postComment } from "../api/api";
import SingleComment from "./SingleComment";

export default function Comments({ userId, recipeId }) {
  const [comments, setComments] = useState();
  const [comment, setComment] = useState("");

  const commentId = crypto.randomUUID();

  useEffect(() => {
    getCommentsByRecipe(recipeId).then((comments) =>
      setComments(
        comments.sort((a, b) => {
          return a.date > b.date ? 1 : -1;
        })
      )
    );
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    postComment(comment, userId, commentId, "AziBazi94", recipeId)
      .then(
        getCommentsByRecipe(recipeId).then((comments) =>
          setComments(
            comments.sort((a, b) => {
              return a.date > b.date ? 1 : -1;
            })
          )
        )
      )
      .finally(() => setComment(""));
  }

  function handleCancel(e) {
    e.preventDefault();
    setComment("");
  }

  return (
    <div className="comments">
      <div className="comments__previous">
        {comments &&
          comments.map((comment) => (
            <SingleComment comment={comment} key={comment.id} />
          ))}
      </div>
      <div className="comments__add-comment">
        <form onSubmit={handleSubmit} method="post">
          <div className="input-group">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              name="comment"
              id="comment"
              cols="30"
            ></textarea>
          </div>
          <div className="comments__add-comment--buttons">
            <button onClick={handleCancel}>Cancel</button>
            <button>Comment</button>
          </div>
        </form>
      </div>
    </div>
  );
}
