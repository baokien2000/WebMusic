let XIcon = $(".auth-form__header i.fa-xmark"),
    cancelSongForm = $(".auth-form__controls-back"),
    search = $(".RankPage .container__header-with-search-input"),
    target_id, TableBody, current_tablePage = 1,
    Suggestions;

$(document).ready(function () {
    // Add active cho sidebar
    $(".header__item:nth-child(5)").addClass("header__item--active");
    // Lấy dữ liệu bài hát
    getData();
});

XIcon.click(function () {
    $(".modal").css("display", "none");

});
cancelSongForm.click(function () {
    $(".modal").css("display", "none");
});

function getData() {
    $.get(
        "http://localhost:" + location.port + "/admin/rank-api/get-song.php",
        function (data, status) {
            TableBody = [];
            let searchValue = '',
                top = 1;
            data["data"].forEach((e) => {
                TableBody.push(
                    "<tr><td>" + top + "</td><td>"
                    + e["name"] + "</td><td>"
                    + e["singer"] + "</td><td>"
                    + e["listens"] + "</td><td>"
                    + e["downloads"] + "</td><td> " +
                    '<i class="fa-solid fa-eye" onclick="Open_Dialog_View(' + e["id"] + ", '" + e["name"] + "'" + ", '"
                    + e["singer"] + "'" + ", '" + e["date"] + "'" + ", '" + e["category"] + "'" + ", `" + e["lyric"] + "`" + ", '"
                    + e["listens"] + "'" + ", '" + e["comments"] + "'" + ", '" + e["downloads"] + "'" + ", '" + e["file"] + "')\"></i>" +
                    '</td><td style="display: none">' +
                    e["category"] +
                    '</td><td style="display: none">' +
                    e["lyric"] +
                    '</td><td style="display: none">' +
                    e["file"] +
                    "</td></tr>"
                );
                top += 1;
                searchValue += e["name"] + ",";

                e["singer"].split(",").forEach(element => {
                    if (!searchValue.includes(element)) {
                        searchValue += element + ",";
                    }
                });
            });
            let endNum = current_tablePage * 8,
                beginNum = endNum - 8,
                tableDisplay = "",
                Table_NumHtml = "",
                active;
            pageAmount = Math.ceil(data["data"].length / 8);
            current_tablePage = parseInt(current_tablePage)

            switch (pageAmount) {
                case 1:
                    First = 1
                    Last = 1
                    break;
                case 2:
                    First = 1
                    Last = 2
                    break;
                default:
                    isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
                    First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
                    tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
                    Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
            }


            Table_NumHtml +=
                '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`Main`)">' +
                '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
            for (let j = First; j <= Last; j++) {
                active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
                Table_NumHtml +=
                    '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`Main`)">' +
                    '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
            }
            Table_NumHtml +=
                '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`Main`)">' +
                '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';


            $("#Table_pagination").html(Table_NumHtml); // các trang của table
            for (let i = beginNum; i < endNum; i++) {
                tableDisplay += TableBody[i];
            }
            $("#table-body").html(tableDisplay);
            // $("#Categories_value").html(categoriesValue);
            $("#Search_value").html(searchValue);
        },
        "json"
    );
}

function Open_Dialog_View(id, name, singer, date, category, lyric, listens, comments, downloads, file) {
    $("#viewRank_id").html(id);
    $("#viewRank_name").html(name);
    $("#viewRank_singer").html(singer);
    $("#viewRank_date").html(date);
    $("#viewRank_category").html(category);
    $("#viewRank_listens").html(listens);
    $("#viewRank_comments").html(comments);
    $("#viewRank_downloads").html(downloads);
    $("#viewRank_file").html(file);
    $("#viewRank_lyric").html(lyric);
    $("#myModal_ViewRank").css("display", "flex")
}

// sự kiện click vào btn "Đầu" của table pagination
function FirstPagination_click(e, table) {
    let tableDisplay = "",
        First = 1,
        Last,
        Table_NumHtml = "",
        active,
        pageAmount;
    current_tablePage = 1
    if (table == "Main") {
        pageAmount = Math.ceil(TableBody.length / 8);
        for (let i = 0; i < 8; i++) {
            tableDisplay += TableBody[i];
        }
    } else {
        pageAmount = Math.ceil(SearchTable.length / 8);
        for (let i = 0; i < 8; i++) {
            tableDisplay += SearchTable[i];
        }
    }
    Last = pageAmount < 3 ? pageAmount : 3;

    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';
    $("#Table_pagination").html(Table_NumHtml);
    $("#table-body").html(tableDisplay);
}
// sự kiện click vào btn "Cuối" của table pagination
function LastPagination_click(e, table) {

    let endNum,
        beginNum,
        tableDisplay = "", First, Last;

    if (table == "Main") {
        current_tablePage = Math.ceil(TableBody.length / 8);
        endNum = current_tablePage * 8;
        beginNum = endNum - 8;
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += TableBody[i];
        }
    } else {
        current_tablePage = Math.ceil(SearchTable.length / 8);
        endNum = current_tablePage * 8;
        beginNum = endNum - 8;
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
    }
    current_tablePage = parseInt(current_tablePage)

    First = current_tablePage < 3 ? 1 : current_tablePage - 2
    Last = current_tablePage;

    let Table_NumHtml = "",
        active;

    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';

    $("#Table_pagination").html(Table_NumHtml);
    $("#table-body").html(tableDisplay);
}
function Pagination_click(e, table) {

    current_tablePage = $(e).text();
    let endNum = current_tablePage * 8,
        beginNum = endNum - 8,
        tableDisplay = "",
        isFirst, First, tablePageDisplay, Last;
    if (table == "Main") {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += TableBody[i];
        }
        pageAmount = Math.ceil(TableBody.length / 8)

    } else {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
        pageAmount = Math.ceil(SearchTable.length / 8)

    }
    current_tablePage = parseInt(current_tablePage)
    switch (pageAmount) {
        case 1:
            First = 1
            Last = 1
            break;
        case 2:
            First = 1
            Last = 2
            break;
        default:
            isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
            First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
            tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
            Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
    }


    let Table_NumHtml = "",
        active;

    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';
    $("#Table_pagination").html(Table_NumHtml);
    $("#table-body").html(tableDisplay);
}

// sự kiện onchange search input
$(".RankPage .container__header-with-search-input").on("input", function (e) {
    setTimeout(function () {
        let rowSuggestions = $("#myInputsuggestions_search-list>div").length;
        if (search.val() != "" && rowSuggestions != 0) {
            $(".container__header-with-search-result").css("visibility", "visible");
        } else {
            $(".container__header-with-search-result").css("visibility", "hidden");
        }
    }, 20);

    SearchTable = [];
    TableBody.forEach((i) => {
        if (i.toLowerCase().indexOf(search.val().toLowerCase()) > -1) {
            SearchTable.push(i);
        }
    });
});

//search input click
$(".RankPage .container__header-with-search-input").click(function () {
    Suggestions = $("#Search_value").html().split(",");
    Suggestions.pop();
    suggestions_search(Suggestions);
});
$("body").click(function (e) {
    if (e.target.className != "container__header-with-search-result" &&
        e.target.className != "container__header-with-search-input") {
        $(".container__header-with-search-result").css("visibility", "hidden");
    }
});
// nút search icon click
$(".RankPage .fa-magnifying-glass").click(function () {
    $(".NullValue").css("display", "none")
    SearchTable = [];
    TableBody.forEach((i) => {
        if (i.toLowerCase().indexOf(search.val().toLowerCase()) > -1) {
            SearchTable.push(i);
        }
    });
    searchClick();
});


function searchClick() {
    current_tablePage = 1;
    let pageAmount,
        Table_NumHtml = "",
        endNum = current_tablePage * 8,
        beginNum = endNum - 8,
        tableDisplay = "",
        currentTable = "",
        active, isFirst, First, tablePageDisplay, Last;
    if (search.val() != "") {
        pageAmount = Math.ceil(SearchTable.length / 8);
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
        currentTable = `Search`;
    } else {
        pageAmount = Math.ceil(TableBody.length / 8);
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += TableBody[i];
        }
        currentTable = `Main`;
    }
    current_tablePage = parseInt(current_tablePage)

    switch (pageAmount) {
        case 1:
            First = 1
            Last = 1
            break;
        case 2:
            First = 1
            Last = 2
            break;
        default:
            isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
            First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
            tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
            Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
    }

    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + currentTable + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + currentTable + '`)">' +
            '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + currentTable + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';
    $("#Table_pagination").html(Table_NumHtml);

    if (tableDisplay.indexOf("undefined") != 0) {
        $("#table-body").html(tableDisplay);
    } else {
        $("#table-body").html("");
        $(".NullValue").css("display", "block")

    }
}
function SearchItemClick(e) {
    $("#myInput").val(e)
    SearchTable = [];
    TableBody.forEach((i) => {
        if (i.toLowerCase().indexOf(e.toLowerCase()) > -1) {
            SearchTable.push(i);
        }
    });
    $(".NullValue").css("display", "none")
    searchClick();
};
// Gợi ý cho input search
function suggestions_search(arr) {
    var suggestionsItem, suggestionsList;
    $("#myInput").on('input', function () {
        let n = 0, SearchValue = this.value;

        if (SearchValue == "") {
            return false;
        }
        $(".container__header-with-search-result").html(`<h4>Đề xuất cho bạn</h4>`)
        suggestionsList = `<div id="` + this.id + `suggestions_search-list" class="suggestions_search-items">`
        suggestionsItem = ''

        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, SearchValue.length).toUpperCase() == SearchValue.toUpperCase() && n < 5) {
                suggestionsItem += `<div onclick="SearchItemClick('` + arr[i] + `')"><strong>` +
                    arr[i].substr(0, SearchValue.length) + `</strong>` + arr[i].substr(SearchValue.length) +
                    `<input type='hidden' value='` + arr[i] + `'></div>`;
                n += 1;
            }
        }
        suggestionsList += suggestionsItem + `</div>`
        $(".container__header-with-search-result").append(suggestionsList)
    })
}