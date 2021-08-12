//  Selecting required elements
const ulTag = document.querySelector("ul");
const prevPage = document.querySelector(".btn-prev")
const nextPage = document.querySelector(".btn-next")
const currPage = document.querySelector(".active")
let totalPages = 20;

function element(totalPages, page) {
    let liTag = "";
    let activeLi;
    let prevPage = page - 1;
    let nextPage = page + 1;
    if (page > 1) {
        liTag += ` <li class="btn btn-prev" onclick="element(totalPages,${page - 1})"> <i class="fa fa-angle-left"></i> <span>Prev</span></li>`;
    }
    if (page > 2) {
        liTag += ` <li class="num" onclick="element(totalPages,1)"><span>1</span></li>`
        if (page > 3) {
            liTag += `<li class="dots"><span>...</span></li>`
        }
    }

    for (let pageLength = prevPage; pageLength <= nextPage; pageLength++) {
        if (pageLength > totalPages) {
            continue;
        }
        if (pageLength == 0) {
            pageLength = pageLength + 1;
        }
        if (page == pageLength) {
            activeLi = "active";
        } else {
            activeLi = "";
        }
        liTag += `<li class="num ${activeLi}" onclick="element(totalPages, ${pageLength})" ><span>${pageLength}</span></li>`;
    }

    if (page < totalPages - 1) {
        if (page < totalPages - 2) {
            liTag += `<li class="dots"><span>...</span></li>`
        }
        liTag += ` <li class="num" onclick="element(totalPages, ${totalPages})"><span>${totalPages}</span></li>`
    }

    if (page < totalPages) {
        liTag += `<li class="btn btn-next" onclick="element(totalPages,${page + 1})"> <span>Next</span> <i class="fa fa-angle-right"></i></li>`;
    }

    ulTag.innerHTML = liTag;
}
element(totalPages, 5);




