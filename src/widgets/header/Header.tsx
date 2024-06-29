import React from "react";
import styles from './main.module.css';
import { SoringType } from "../../layout/Layout";

interface HeaderProps {
    sortingType: SoringType,
    setSortingType: React.Dispatch<React.SetStateAction<SoringType>>
}

const Header: React.FC<HeaderProps> = ({ sortingType, setSortingType }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortingType(parseInt(event.target.value));
    };

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>Hacker News!</h1>
                <div className={styles.control}>
                    <select value={sortingType} onChange={handleChange}>
                        <option value="">Select sorting type</option>
                        <option value="0">Top stories</option>
                        <option value="1">Best stories</option>
                        <option value="2">New stories</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Header;