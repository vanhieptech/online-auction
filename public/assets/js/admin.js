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


// Update Permission for User/seller
const updatePermisson = (user) => {
    const id = user.id;
    const permission = user.permission;

    var rowUser = $(`#${id}`).html();

    const buttonDown = `<i class="fas fa-arrow-down fa-lg"></i>`;
    const buttonUp = `<i class="fas fa-arrow-up fa-lg"></i>`;

    var rowToAdd =
        $(`#${id}`).remove();

    console.log($(`tbody .user`))
    if (!permission) {
        rowUser = rowUser.replace('aqua-gradient', 'peach-gradient');
        rowToAdd = `<tr id=${id}>` + rowUser.replace(buttonDown, buttonUp) + `</tr>`;
        $(`tbody.users`).append(rowToAdd);

    } else {
        rowUser = rowUser.replace('peach-gradient', 'aqua-gradient');
        rowToAdd = `<tr id=${id}>` + rowUser.replace(buttonUp, buttonDown) + `</tr>`;
        $(`tbody.sellers`).append(rowToAdd);
    }
    console.log(rowToAdd)

    console.log("update success")

};

const updatePermissonFail = () => {
    alert('Fail update Permission');
};


$(document).on('click', '.permission', function() {
    const id = $(this).attr('data-id');
    const permission = $(this).attr('data-state');

    let condition = permission === '0' ? 0 : 1;

    $.ajax({
            url: `users/${id}/${!condition}`,
            method: 'PUT'
        })
        .then(updatePermisson)
        .catch(updatePermissonFail);
});