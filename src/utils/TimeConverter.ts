export const ConvertTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const formattedDate = date.toLocaleDateString(
        'en-US', 
        { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }
    );

    return formattedDate;
}