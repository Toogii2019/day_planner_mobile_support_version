function isWeekend(dateObj) {

    if (moment(dateObj).days() === 0 || moment(dateObj).days() === 6) {
        return true;
    }
    return false;
}

function isFutureDay(dateObj) {
    if (moment().isBefore(moment(dateObj), 'day')) {
        return true;
    }
    return false;
}

function isPresentDay(dateObj) {
    if (moment().isSame(moment(dateObj), 'day')) {
        return true;
    }
    return false;
}

function isPresentHour(index) {
    if (moment().isSame(moment($("#currentDay").text()).hour(9+index), 'hour')) {
        return true;
    }
    return false;
}

function isFutureHour(index) {
    if (moment().isBefore(moment($("#currentDay").text()).hour(9+index), 'hour')) {
        return true;
    }
    return false;
}

function isPastHour(index) {
    if (moment().isAfter(moment($("#currentDay").text()).hour(9+index), 'hour')) {
        return true;
    }
    return false;
}

function isPastDay(dateObj) {
    if (moment().isAfter(moment(dateObj), 'day')) {
        return true;
    }
    return false;
}

function isPresentMonth() {
    if (moment().isSame(moment($("#currentDay").text()), 'month')) {
        return true;
    }
    return false;
}

function isPastMonth() {
    if (moment().isAfter(moment($("#currentDay").text()), 'month')) {
        return true;
    }
    return false;
}
