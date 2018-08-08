$(document).ready(function () {
    $(".custom-select").each(function () {
        var classes = $(this).attr("class"),
            id = $(this).attr("id"),
            name = $(this).attr("name"),
            click = $(this).attr("onclick"),
            placeholder= $(this).attr("placeholder");
        var template = '<div class="' + classes + '" onclick="'+click+'" id="'+id+'">';
        template += '<span class="custom-select-trigger">' + placeholder + '</span>';
        template += '<div class="custom-options">';

        $(this).find("option").each(function () {
            template += '<a href="#" class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</a>';
    });
        template += '</div></div>';
      //
        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-option:first-of-type").addClass("hide_option");

    $(".custom-option:first-of-type").hover(function () {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function () {
        $(this).parents(".custom-options").removeClass("option-hover");
    });

    $(".custom-select-trigger").on("click", function () {
        $('html').one('click', function () {
            $(".custom-select").removeClass("opened");
        });
        $(this).parents(".custom-select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".custom-option").on("click", function () {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
        $(this).parents(".custom-options").find(".custom-option").removeClass("hide_option");
        $(this).addClass("hide_option");

    });

});