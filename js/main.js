$(".popup__open").click(function (e) {
    e.preventDefault();
    $(".popup-bg").fadeIn(600);
    $("html").addClass("no-scroll");
});

$(".popup__close").click(function () {
    $(".popup-bg").fadeOut(600);
    $("html").removeClass("no-scroll");
});

