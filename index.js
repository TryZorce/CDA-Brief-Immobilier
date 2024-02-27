document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("myForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const address = document.getElementById("address").value;
        const type = document.getElementById("type").value;

        const formData = {
            title: title,
            description: description,
            price: price,
            address: address,
            type: type
        };

        localStorage.setItem("formData", JSON.stringify(formData));
    });

    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
        document.getElementById("title").value = savedData.title;
        document.getElementById("description").value = savedData.description;
        document.getElementById("price").value = savedData.price;
        document.getElementById("address").value = savedData.address;
        document.getElementById("type").value = savedData.type;
    }
});