
const errorMessages = (errorMsg) => {
    try {
        const msg = errorMsg.data.message;
        return msg;
    } catch (error) {
        return errorMsg;
    }
}

export { errorMessages };