
const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    console.log(date);
    return date;
}

const convertDateToTimestamp = (range) => {
    const ddl = new Date();
    ddl.setDate(ddl.getDate() + Number(range));
    // console.log(ddl);
    const timestamp = Math.floor(ddl.getTime() / 1000);
    console.log("Timestamp is:", typeof timestamp, timestamp);
    return timestamp;
};

export { convertTimestampToDate, convertDateToTimestamp };
