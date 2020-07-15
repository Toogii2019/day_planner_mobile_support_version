function goToCalendar() {
    console.log("Mobile:Going to Calendar")
    $(".container").empty();

    let calendarAppDiv = $("<div>");
    calendarAppDiv.attr("id", "calendar-app");


    $(".container").append(calendarAppDiv);
    $("#currentDay").text(moment($("#currentDay").text()).format("MMM YYYY"));
    var signal = buildCalendar();
    if (signal == "Escape") {
        return;
    }
    changeMonthBackground();

    function buildCalendar() {
        console.log("Mobile:Building the Calendar")

        let firstDay = moment($("#currentDay").text()).startOf('month');
        let closestWeekend = moment($("#currentDay").text()).startOf('month').day(-1);
        let lastDay = moment($("#currentDay").text()).endOf('month');
        let gap = firstDay.diff(closestWeekend, 'days');

        if (firstDay === "Invalid date" || lastDay === "Invalid date") {
            console.log("Mobile:Invalid date found")
            return "Escape";
        }
        if (gap < 7) {
            for (i=0;i<gap;i++) {
                calendarAppDiv.append(`<div class='day past-month' data-date='past-month'>${closestWeekend.format("ddd DD")}</div>`);
                closestWeekend.add(1, 'day');
            }
        }
        let activity;
        while (!firstDay.isAfter(lastDay)) {
            let day = firstDay.format("D");
            let month = firstDay.format("MMMM");
            let year = firstDay.format("YYYY");
            let dateChosen = month + " " + day + "," + " " + year;
            // console.log(dateChosen);
            for (index=0;index<10;index++) {
                if (localStorage.getItem(dateChosen + "-" + index)) {
                    activity = "<br><strong style='color: red;'>Note Exist</strong>";
                    // console.log(dateChosen + "-" + index);
                    // console.log(localStorage.getItem(dateChosen + "-" + index));
                    break;
                }
                else {
                    activity = "";
                }
            }
            if (isWeekend(dateChosen)) {
                calendarAppDiv.append(`<div class="day weekend">${firstDay.format("ddd DD")} ${activity}</div>`);
            }
            else if (isFutureDay(dateChosen)) {
                calendarAppDiv.append(`<div class="day future">${firstDay.format("ddd DD")} ${activity}</div>`);
            }
            else if (isPresentDay(dateChosen)) {
                calendarAppDiv.append(`<div class="day present">${firstDay.format("ddd DD")} ${activity}</div>`);
            }
            else if (isPastDay(dateChosen)) {
                calendarAppDiv.append(`<div class="day past">${firstDay.format("ddd DD")} ${activity}</div>`);
            }
            else {
                calendarAppDiv.append(`<div class="day">${firstDay.format("ddd DD")} ${activity}</div>`);
            }
            firstDay.add(1, 'day');
            
        }
    }
    function jumpToDate(event) {
        // console.log(event.target.getAttribute("data-date"));
        if (event.target.getAttribute("data-date") == "past-month") {
            return;
        }
        let day = event.target.textContent.split(" ")[1];
        let month = $("#currentDay").text().split(" ")[0];
        let year = $("#currentDay").text().split(" ")[1];
        let dateChosen = month + " " + day + "," + " " + year;
        let date = moment(dateChosen);
        showDates(date.format("LL"));

    }
    $(".day").on("click", jumpToDate)

    function changeMonthBackground() {
        if (isPresentMonth()) {
            $("#currentDay").attr("class", "present");
        }
        else if (isPastMonth()) {
            $("#currentDay").attr("class", "past");
        }
        else {
            $("#currentDay").attr("class", "future");
        }
    }

}

