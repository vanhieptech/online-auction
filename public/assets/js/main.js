(function($) {
    // Preloader
    $(window).on("load", function() {
        if ($("#preloader").length) {
            $("#preloader")
                .delay(100)
                .fadeOut("slow", function() {
                    $(this).remove();
                });
        }
    });

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
        return false;
    });
    /*--/ Property owl owl /--*/
    $("#property-single-carousel").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        navText: [
            '<i class="ion-ios-arrow-back" aria-hidden="true"></i>',
            '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            }
        }
    });

    //Thêm sản phẩm vào danh sách ưa thích

    const displayAddedToWishlist = Pro => {
        const ProID = Pro.ProID;

        $(`.heart-icon[data-id=${ProID}]`).addClass("active");
        $(`.heart-icon[data-id=${ProID}]`).attr("disabled", "disabled");
    };

    const addToWishListFail = response => {
        alert("Add to wishlist just for BIDDER!!!");
    };

    $(document).on("click", ".heart-icon", function() {
        const ProID = $(this).attr("data-id");
        const ProName = $(this).attr("data-name");
        const Price = $(this).attr("data-price");

        // console.log($(this).attr("disabled"));

        if ($(this).attr("disabled") === "disabled") {
            console.log("just tesing");
        } else {
            console.log("clicked!!");
            $.ajax({
                    url: "bd/wishlist/add",
                    method: "POST",
                    data: {
                        ProID: ProID,
                        ProName: ProName,
                        Price: Price
                    }
                })
                .then(displayAddedToWishlist)
                .catch(addToWishListFail);
        }
    });

    //Gửi yêu cầu nâng cấp tài khoản

    const displayRequested = check => {
        $(`.request-upgrade`).text(`Đã yêu cầu`);
        $(`.request-upgrade`).prepend(`<i
        class="fas fa-wrench pr-2">`);
        $(`.request-upgrade`).attr("disabled", "disabled");
    };

    const requestFail = response => {
        alert("Can't Request Update!");
    };

    $(document).on("click", ".request-upgrade", function() {
        // console.log($(this).attr("disabled"));

        if ($(this).attr("disabled") === "disabled") {
            console.log("just tesing");
        } else {
            console.log("clicked!!");
            $.ajax({
                    url: "account/request",
                    method: "POST"
                })
                .then(displayRequested)
                .catch(requestFail);
        }
    });
})(jQuery);