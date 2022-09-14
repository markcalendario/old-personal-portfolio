function isUserAlreadySubmittedRequest() {

    let projectRequestExpire = localStorage.getItem("project_requested_time_limit");

    let momentNowInSeconds = Date.now() / 1000;

    if (projectRequestExpire === null || projectRequestExpire < momentNowInSeconds) {
        return true
    } else {
        return false
    }
}

module.exports = { isUserAlreadySubmittedRequest }