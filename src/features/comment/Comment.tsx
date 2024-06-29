import React, { useEffect, useState } from "react";
import styles from './main.module.css';
import { CommentModel } from "../../models/CommentModel";
import Reply from "../reply/Reply";

export interface CommentProps {
    id: String
}

const Comment: React.FC<CommentProps> = ({ id }) => {
    const [commentModel, setCommentModelState] = useState<CommentModel>();

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
                setCommentModelState(await response.json());
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchComment();
    }, []);

    return (
        <div className={styles.comment}>
            <span className={styles.commentBy}>{commentModel?.by}</span>
            <div 
                className={styles.commentText} 
                dangerouslySetInnerHTML={{ __html: commentModel?.text || '' }} 
            />
            {commentModel && commentModel.kids && commentModel.kids.length > 0 ? 
                <>
                    <span className={styles.commentBy}>Reply</span>
                    {commentModel.kids.map(element => 
                        (<Reply key={element.toString()} id={element.toString()} />)
                    )}
                </>
            
            :
                null}
        </div>
    )
}

export default Comment;