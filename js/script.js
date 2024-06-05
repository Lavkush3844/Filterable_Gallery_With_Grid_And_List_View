$(document).ready(function () {

    const wrapper = $(".wrapper");
    const tagButtons = $(".tag-button");
    const loadMoreButton = $("#loadMoreButton");
    const langBox = $(".language");
    let selectedTag = "all"; // Initially, "all" tag is selected
    let currentPage = 1;
    const itemsPerPage = 6;

    function filterLangByTag(tag) {
        selectedTag = tag;
        currentPage = 1; // Reset current page when changing tags

        // Clear existing language in the wrapper
        wrapper.empty();

        const filteredLanguage = langBox.filter(function () {
            const tags = $(this).data("tags").split(",");
            return selectedTag === "all" || tags.includes(selectedTag);
        });

        showLangForPage(currentPage, filteredLanguage);
        updateLoadMoreButton(filteredLanguage);
    }

    function showLangForPage(pageNumber, langBox) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, langBox.length);

        for (let i = startIndex; i < endIndex; i++) {
            wrapper.append(langBox.eq(i).clone());
        }
    }

    function updateLoadMoreButton(filteredLanguage) {
        const visiblePostCount = filteredLanguage.length;

        if (visiblePostCount <= currentPage * itemsPerPage) {
            loadMoreButton.hide();
        } else {
            loadMoreButton.show();
        }
    }

    function loadMoreLang() {
        currentPage++;
        const filteredLanguage = langBox.filter(function () {
            const tags = $(this).data("tags").split(",");
            return selectedTag === "all" || tags.includes(selectedTag);
        });

        showLangForPage(currentPage, filteredLanguage);
        updateLoadMoreButton(filteredLanguage);
    }
    tagButtons.on("click", function () {
        tagButtons.removeClass("active");
        $(this).addClass("active");
        const tag = $(this).data("tags");
        console.log("tag", tag);
        filterLangByTag(tag);
    });
    loadMoreButton.on("click", loadMoreLang);
    // Initial setup
    filterLangByTag(selectedTag);

    const gridViewButton = $("#gridViewBtn");
    const listViewButton = $("#listViewBtn");

    function switchToGridView() {
        wrapper.removeClass("list-view").addClass("grid-view");
    }
    function switchToListView() {
        wrapper.removeClass("grid-view").addClass("list-view");
    }

    gridViewButton.on("click", switchToGridView);
    listViewButton.on("click", switchToListView);
    // grid view as default
    switchToGridView();


    $('.wrapper').on('click', '.language .lan-text .trigger', function () {
        var imgElement = $(this).closest('.language').find('.lan-img img');
        var imgSrc = imgElement.attr('src');
        console.log(imgSrc);

        $("body").css("overflow", "hidden");
        $(".modal").addClass("show-modal");
        $(".close-button").click(function () {
            $(".modal").removeClass("show-modal");
            $("body").css("overflow", "visible");
        });

        var filter = $(this).data('popup');
        console.log("popup", filter);

        $(".wordpress-popup-1, .shopify-popup-1, .php-popup-1, .react-popup-1").css("display", "none");

        if (filter == 'wordpress-popup-1') {
            $(".wordpress-popup-1").css("display", "flex");
        }
        else if (filter == 'shopify-popup-1') {
            $(".shopify-popup-1").css("display", "flex");
        }
        else if (filter == 'php-popup-1') {
            $(".php-popup-1").css("display", "flex");
        }
        else if (filter == 'react-popup-1') {
            $(".react-popup-1").css("display", "flex");
        }
        $(".main-image").attr("src", imgSrc);
    });

    $(".thumbnail").click(function () {
        var newImage = $(this).attr("data-full");
        $(".main-image").attr("src", newImage);
    });

    // readMoreLess function
    $(".readMoreLess").click(function () {
        var dots = $(".dots");
        var moreText = $(".more");
        var btnText = $(this);

        if (dots.css("display") === "none") {
            dots.css("display", "inline");
            btnText.html("Read more");
            moreText.css("display", "none");
        } else {
            dots.css("display", "none");
            btnText.html("Read less");
            moreText.css("display", "inline");
        }
    });

    $("#searchInput").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $(".language").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
