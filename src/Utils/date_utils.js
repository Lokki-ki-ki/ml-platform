
const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    console.log(date);
    return date;
}

const convertDateToTimestamp = (range) => {
    const ddl = new Date();
    const timestamp = ddl.getTime() + range * 24 * 60 * 60 * 1000;
    return Math.floor(timestamp / 1000);
};

export { convertTimestampToDate, convertDateToTimestamp };
