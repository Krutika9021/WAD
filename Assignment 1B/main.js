let fetchData = () => {
    let httprequest = new XMLHttpRequest();
    httprequest.open("GET", "https://jsonplaceholder.typicode.com/users");
    httprequest.send();
    httprequest.onload = () => {
      let res = JSON.parse(httprequest.responseText);
      console.log(res);
  
      if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(res));
      }
      displayData();
    };
  };
  
  let displayData = () => {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    let storedUser = JSON.parse(localStorage.getItem("users")) || [];
  
    if (storedUser.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center">No records found</td></tr>`;
      return;
    }
  
    storedUser.forEach((user, index) => {
      tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.address.city}</td>
        </tr>`;
    });
  };

  fetchData();
  
  let btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const city = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;
  
    if (!email || !username || !password || !name || !city || !phone) {
      alert("Please fill all fields before submitting.");
      return;
    }
  
    let postObject = {
      email,
      password,
      name,
      phone,
      username,
      address: { city: city },
    };
  
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/users/");
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify(postObject));
  
    xhr.onload = () => {
      if (xhr.status == 201) {
        let storedUser = JSON.parse(localStorage.getItem("users")) || [];
        
        storedUser.push(postObject);
      
        localStorage.setItem("users", JSON.stringify(storedUser));
  
        displayData();
  
        document.getElementById("email").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("name").value = "";
        document.getElementById("city").value = "";
        document.getElementById("phone").value = "";
  
        $("#addNewUser").modal("hide");
      }
    };
  });
  