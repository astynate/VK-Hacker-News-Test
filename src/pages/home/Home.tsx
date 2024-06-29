import React, { useEffect, useRef, useState } from "react";
import styles from './main.module.css';
import { StoryModel } from "../../models/StoryModel";
import News from "../../features/news/News";
import { SoringType } from "../../layout/Layout";
import Loader from "../../elements/loader/Loader";

const types: String[] = ['topstories', 'newstories', 'beststories'];

interface HomePorps {
    sortingType: SoringType
}

const Home: React.FC<HomePorps> = ({ sortingType }) => {
    const [page, setPage] = useState(0);
    const [news, setNews] = useState<StoryModel[]>([]);
    const [isLoading, setLoadingState] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timer>();

    const fetchNews = async () => {
        try {
            setLoadingState(true);

            const response = await fetch(`https://hacker-news.firebaseio.com/v0/${types[sortingType]}.json`);
            const storyIds: number[] = await response.json();

            const newsPromises = storyIds.slice(page, page + 15).map(async (id) => {
                const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                return await storyResponse.json();
            });

            const newsData = await Promise.all(newsPromises);

            setNews(newsData);
            setLoadingState(false);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const startTimer = () => {
        clearInterval(timer);
        fetchNews();
        
        const timerId = setInterval(() => {
            fetchNews();
        }, 30000);

        setTimer(timerId);
    };

    useEffect(() => {
        startTimer();
    }, [page, sortingType]);

    return (
        <div className={styles.home}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <button 
                        className={styles.refresh}
                        onClick={() => startTimer()}
                    >Refresh</button>
                    {news.map((story: StoryModel) => (
                        <News key={story.id} story={story} />
                    ))}
                    <div className={styles.pagination}>
                        {Array.from({ length: page }).map((_, index) => (
                            <span key={index} onClick={() => setPage(index)}>{index}</span>
                        ))}
                        <span id="current">{page}</span>
                        {Array.from({ length: 15 }).map((_, index) => (
                            <span key={index} onClick={() => setPage(page + index + 1)}>{page + index + 1}</span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;