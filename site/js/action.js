function randomTemplate(imageSrc) {

    var colorThief = new ColorThief();
    var image = new Image();

    var templateNb = Math.ceil(Math.random() * 5);
    //templateNb = 6;

    for (var i = 1; i <= 6; i++) {
        $(".content").removeClass("template" + i);
        $(".backgroundImage").addClass("template" + i);
    }
    templateNb = Math.ceil(Math.random() * 5);

    $(".content").addClass("template" + templateNb);
    $(".backgroundImage").addClass("template" + templateNb);

    function imageLoaded() {
        //$(".backgroundImage").css("background-image", "url(" + image.src + ")")

        var palette = colorThief.getPalette(image, 9);
        var highS = 0;
        var highSPos = 0;
        for (i = 0; i < 8; i++) {
            var color = $c.rgb2hex(palette[i][0], palette[i][1], palette[i][2]);
            var colorHSV = $c.hex2hsv(color).a;
            if (colorHSV[1] > highS) {
                highSPos = i;
                highS = colorHSV[1];
            }
        }

        var highSColorHex = $c.rgb2hex(palette[highSPos][0], palette[highSPos][1], palette[highSPos][2]);
        var highSColorHSV = $c.hex2hsv(highSColorHex).a;

        if (highSColorHSV[1] < 60) {
            var dominentColor = colorThief.getColor(image);
            dominentColor = $c.rgb2hex(dominentColor[0], dominentColor[1], dominentColor[2]);
            var complementaryColor = $c.complement(dominentColor);
            colorDef = complementaryColor
        } else {
            colorDef = highSColorHex;
        }

        colorDefComp = $c.complement(colorDef);

        // Reset template

        $(".controls .background").css("background-color", "transparent");
        $(".controls .background2").css("background-color", "transparent");
        $(".content").css("color", "inherit");
        $("blockquote p").css("background-color", "transparent");
        $("blockquote").css("background-color", "transparent");
        $("cite").css("color", "inherit");
        $("cite").css("background-color", "transparent");
        $(".bloc1").css("background-color", "transparent");

        /*Application du template*/
        if (templateNb == 1) {
            $(".controls .background").css("background-color", "#000")
            $(".controls .background2").css("background-color", "#000")
            $(".content").css("color", "#FFF")
        } else if (templateNb == 2) {
            $(".controls .background").css("background-color", colorDef);
            $(".controls .background2").css("background-color", colorDef);
            $("blockquote p").css("background-color", colorDef);
            $("cite").css("color", colorDef);
        } else if (templateNb == 3) {
            $(".controls .background").css("background-color", colorDefComp);
            $(".controls .background2").css("background-color", colorDefComp);
            $(".content").css("color", colorDefComp);
        } else if (templateNb == 4) {
            $(".controls .background").css("background-color", colorDef);
            $(".controls .background2").css("background-color", colorDef);
            $(".content").css("color", colorDef);
        } else if (templateNb == 5) {
            $(".controls .background").css("background-color", colorDefComp);
            $(".controls .background2").css("background-color", colorDefComp);
            $(".bloc1").css("background-color", colorDefComp);
        }
        else if (templateNb == 6) {
            var colors = new Array("#FFE504", "#FF8200", "#F70073", "#4AFF7E");
            colorRand = Math.ceil(Math.random() * 4);
            $(".controls .background").css("background-color", colors[colorRand]);
            $(".controls .background2").css("background-color", colors[colorRand]);
            $(".content").css("color", colors[colorRand]);
        }

        $(".backgroundImage").css("background-image", "url(" + imageSrc + ")");
    }

    if (imageSrc.indexOf("http") == 0) {
        jQuery.getJSON('//image2datauri.jit.su?cb=?', {
            url: imageSrc
        }, function (data) {
            image.src = data.data;
            imageLoaded();

        })
    }
    else {
        image.onload = imageLoaded;
        image.src = imageSrc;
    }
}

$(function () {

    randomTemplate("fond6.jpg");

    /*Placement du bloc*/
    function onresize() {
        var marginTop = ($(".content").outerHeight() - $(".bloc1").outerHeight()) / 2;
        $(".content").css("padding-top", marginTop);
    }

    $(window).resize(onresize);
    onresize();

    /*Logs*/
    var controlsOpen = false;
    $(".showlist").click(function () {
        $( ".about" ).hide()
        if (controlsOpen) {
            $(".controls").animate({
                top: "100%",
                marginTop: "-26px",
                height: "26px"
            }, 400, function () {
                controlsOpen = false;
            });
        } else {
            $(".controls").animate({
                top: 0,
                marginTop: 0,
                height: "100%"
            }, 400, function () {
                controlsOpen = true;
            });
        }
    });

    /*About*/
    $(".showabout").click(function () {
        $(".about").show()
        if (controlsOpen) {
            $(".controls").animate({
                top: "100%",
                marginTop: "-26px",
                height: "26px"
            }, 400, function () {
                controlsOpen = false;
            });
            $(".controls .list").animate({
                height: "100%"
            }, 4000);
        } else {
            $(".controls").animate({
                top: 0,
                marginTop: 0,
                height: "100%"
            }, 400, function () {
                controlsOpen = true;
            });
            $(".controls .list").animate({
                height: "26px"
            }, 4000);
        }
    });

});
