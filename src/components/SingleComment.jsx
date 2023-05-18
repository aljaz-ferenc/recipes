import { getDaysDifference } from "../functions/utils";
import "./SingleComment.scss";
import Avatar from "boring-avatars";

export default function SingleComment({ comment }) {
  console.log(comment);

  return (
    <div className="single-comment">
      <div className="single-comment__profile-pic">
        <Avatar variant="beam" name={comment.authorUsername} />
      </div>
      <div className="single-commnet__content">
        <div>
          <span className="single-comment__content--name">
            {comment.authorUsername}
          </span>
          <span className="single-comment__content--date">
            {getDaysDifference(comment.date)}
          </span>
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
