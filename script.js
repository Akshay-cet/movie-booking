function searchMovie() {
    let input = document.getElementById("search").value.toLowerCase();
    let movies = document.getElementsByClassName("movie");

    for (let i = 0; i < movies.length; i++) {
        let title = movies[i].getElementsByTagName("p")[0].innerText.toLowerCase();
        movies[i].style.display = title.includes(input) ? "block" : "none";
    }
}

function selectMovie(name, price, poster) {
    localStorage.setItem("movieName", name);
    localStorage.setItem("poster", poster);
    window.location.href = "seats.html";
}

/* SEATS */
if (document.getElementById("platinum")) {

    document.getElementById("movieTitle").innerText = localStorage.getItem("movieName");
    document.getElementById("poster").src = localStorage.getItem("poster");

    let booked = ["A2","B3","C5","D8","E4","F6"];
    let selectedSeats = [];

    function create(container, rows, price) {
        let div = document.getElementById(container);

        rows.forEach(r => {
            let row = document.createElement("div");
            row.classList.add("row");

            for (let i=1;i<=8;i++) {
                let seat = document.createElement("div");
                seat.classList.add("seat");

                let id = r + i;
                seat.innerText = id;

                if(booked.includes(id)) seat.classList.add("booked");

                seat.onclick = function(){
                    if(!seat.classList.contains("booked")){
                        seat.classList.toggle("selected");

                        if(seat.classList.contains("selected")){
                            selectedSeats.push({id,price});
                        } else {
                            selectedSeats = selectedSeats.filter(s => s.id!==id);
                        }
                        update();
                    }
                };

                row.appendChild(seat);
            }
            div.appendChild(row);
        });
    }

    create("platinum",["A","B"],200);
    create("gold",["C","D"],160);
    create("economy",["E","F"],100);

    function update(){
        document.getElementById("count").innerText = selectedSeats.length;
        let total = selectedSeats.reduce((sum,s)=>sum+s.price,0);
        localStorage.setItem("total", total);
        localStorage.setItem("seatList", JSON.stringify(selectedSeats));
    }
}

function goToBooking(){
    if(!localStorage.getItem("seatList")){
        alert("Select seats");
        return;
    }
    window.location.href="booking.html";
}

function confirmBooking(){

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let card = document.getElementById("card").value;
    let expiry = document.getElementById("expiry").value;
    let cvv = document.getElementById("cvv").value;

    let total = localStorage.getItem("total");
    let seats = JSON.parse(localStorage.getItem("seatList"));

    if(name=="" || phone=="" || card=="" || expiry=="" || cvv==""){
        alert("Fill all details!");
        return;
    }

    document.getElementById("result").innerHTML =
        "🎉 Payment Successful<br>" +
        "Seats: " + seats.map(s=>s.id).join(", ") +
        "<br>Total: ₹" + total;
}