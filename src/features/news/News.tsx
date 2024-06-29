import React from "react";
import { StoryModel } from "../../models/StoryModel";
import styles from './main.module.css';
import { ConvertTime } from "../../utils/TimeConverter";
import { Link } from "react-router-dom";

interface NewsProps {
    story: StoryModel;
}

const News: React.FC<NewsProps> = ({ story }) => {
    return (
        <div className={styles.news}>
            <Link to={story.url}>
                <h2 className={styles.title}>{story.title}</h2>
            </Link>
            <p className={styles.time}>Date: {ConvertTime(story.time)}</p>
            <p className={styles.time}>Score: {story.score}</p>
            <p className={styles.time}>Author: {story.by}</p>
            <Link to={`/comments/${story.id}`}>Show comments</Link>
        </div>
    );
}

export default News;