const deleteProduct = (button) => {
    const id = button.parentNode.querySelector("[name=id]").value;
    const csrfToken = button.parentNode.querySelector("[name=_csrf]").value;

    fetch(`/admin/product/${id}`, {
        method: "DELETE",
        headers: {
            "csrf-token": csrfToken,
        },
    })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
};
