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

    const burgerTemplate = (burgerName, id, is_favorite) => {
        const burgerContainer = $("<div>").attr({
            class: "content-burger__list",
            id: id
        });
        const img = $("<img>").attr(
            "src",
            "./images/lefteris-kallergis-581884-unsplash.jpg"
        );
        const name = $("<p>");
        const button = $("<button>").attr({
            "data-id": id,
            class: "btn btn-default favorites",
            "data-state": is_favorite
        });

        name.html(burgerName);
        button.html("add to favorite");

        burgerContainer.append(img, name, button);
        return burgerContainer;
    };

    const displayAddedToWishlist = ProID => {
        console.log("ADDED!!!!");
    };

    const addToWishListFail = response => {
        alert("Add to wishlist Failed");
    };

    $(document).on("click", ".heart-icon", function() {
        const ProID = $(this).attr("data-id");
        const ProName = $(this).attr("data-name");
        const Price = $(this).attr("data-price");

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
    });
})(jQuery);