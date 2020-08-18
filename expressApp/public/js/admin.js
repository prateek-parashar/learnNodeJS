const deleteProduct = (button) => {
    const id = button.parentNode.querySelector("[name=id]").value;
    const csrfToken = button.parentNode.querySelector("[name=_csrf]").value;

    const productElement = button.closest("article");

    fetch(`/admin/product/${id}`, {
        method: "DELETE",
        headers: {
            "csrf-token": csrfToken,
        },
    })
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            console.log(data);
            productElement.remove();
        })
        .catch((err) => {
            console.log(err);
        });
};
