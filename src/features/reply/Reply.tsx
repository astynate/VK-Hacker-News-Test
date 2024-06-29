import React from "react";
import styles from './main.module.css';
import Comment, { CommentProps } from "../comment/Comment";

const Reply: React.FC<CommentProps> = ({ id }) => {
    return (
        <div className={styles.reply}>
            <Comment id={id} />
        </div>
    )
}

export default Reply;