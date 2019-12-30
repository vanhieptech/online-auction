//Delete product in Admin



const removeBurgerOnDelete = (product) => {
    const ProID = product.ProID;

    $(`table tbody .product[data-id=${ProID}]`).remove();
};


const removeBurgerFailed = () => {
    alert('FAIL DELETING PRODUCT');
};

$('table tbody a.btn-danger').on('click', function() {
    const ProID = $(this).attr('data-id');
    console.log("GetGET", ProID);

    $.ajax({
            url: `products/delete/${ProID}`,
            method: 'DELETE'
        })
        .then(removeBurgerOnDelete)
        .catch(removeBurgerFailed);
});