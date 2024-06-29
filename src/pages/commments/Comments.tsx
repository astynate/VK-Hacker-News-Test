import React, { useEffect, useState } from "react";
import styles from './main.module.css';
import { useParams } from "react-router-dom";
import { CommentModel } from "../../models/CommentModel";
import Comment from "../../features/comment/Comment";

const Comments: React.FC = () => {
    const params = useParams();
    const [newsModel, setNewsModel] = useState<CommentModel>();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json?print=pretty`);
                setNewsModel(await response.json());
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className={styles.commentsWrapper}>
            <div className={styles.comments}>
                {newsModel && newsModel.kids && newsModel.kids.length > 0 ? 
                    newsModel.kids.map((element, index) => {
                        return (
                            <Comment key={index} id={element.toString()} />
                        );
                    })
                :
                    <h1>No comments</h1>
                }
            </div>
        </div>
    )
}

export default Comments;