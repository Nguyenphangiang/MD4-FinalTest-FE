function showCityList(){
    $.ajax({

        type:"GET",
        url:"http://localhost:8080/city",
        success: function (city){
            let content = '';
            for (let i = 0; i < city.length; i++) {
                content += `<tr>
        <th scope="row">${i+1}</th>
        <td><a href="view.html" onclick="viewInformation(${city[i].id}), setId(${city[i].id})">${city[i].name}</a></td>
        <td>${city[i].country.name}</td>
        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showEditForm(${city[i].id})">
    Chỉnh Sửa
</button></td>
        <td><button onclick="deleteCity(${city[i].id})">Xóa</button></td>
    </tr>`
            }
            $('#city-list').html(content);
        }
    })
}
showCityList();
function showCountryList() {
    $.ajax({

        type: "GET",
        url: "http://localhost:8080/city/country",
        success:function (country){
            let content = '';
            for (let i = 0; i < country.length; i++) {
                content += `<option value="${country[i].id}">${country[i].name}</option>`
            }
            $('#list-country').html(content);
            $('#u-list-country').html(content);
        }
    })
}
showCountryList();
function showEditForm(id){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/city/${id}`,
        success: function (city){
            showCountryList()
            let content = `
              <form>
                       <div class="mb-3">
                            <label for="name" class="form-label">Tên thành phố</label>
                            <input type="text" class="form-control" id="u-name" aria-describedby="emailHelp" value="${city.name}">

                        </div>
                        <div class="mb-3">
                            <label for="acreage" class="form-label">Diện Tích</label>
                            <input type="text" class="form-control" id="u-acreage" value="${city.acreage}">
                        </div>
                        <div class="mb-3">
                            <label for="population" class="form-label">Dân Số</label>
                            <input type="text" class="form-control" id="u-population" value="${city.population}">
                        </div>
                        <div class="mb-3">
                            <label for="gdp" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="u-gdp" value="${city.gdp}">
                        </div>
                        <div class="mb-3">
                            <label for="list-country">Quốc Gia</label>
                            <select  id="u-list-country">

                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Mô Tả</label>
                            <textarea  id="u-description" cols="30" rows="10" value="${city.description}"></textarea>
                        </div>
                        <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="editCity(${id})">Thay Đổi</button>
            </div>
                </div>

            </form>`;
            $('#edit-form').html(content);
        }

    })

}

function addCity(){
    let name = $('#name').val();
    let acreage = $('#acreage').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let country = $('#list-country').val();
    let description = $('#description').val();
    let newCity = {
        "name": name,
        "acreage": acreage,
        "population": population,
        "gdp": gdp,
        "country" : {
            "id": country
        },
        "description": description
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        type:"POST",
        url:"http://localhost:8080/city",
        data: JSON.stringify(newCity),
        success: function (){
            alert("Thêm thành công !!!")
            showCountryList()
            showCityList()
        }
    })
}
function editCity(id){

    let name = $('#u-name').val();
    let acreage = $('#u-acreage').val();
    let population = $('#u-population').val();
    let gdp = $('#u-gdp').val();
    let country = $('#u-list-country').val();
    let description = $('#u-description').val();
    let newCity = {
        "id": id,
        "name": name,
        "acreage": acreage,
        "population": population,
        "gdp": gdp,
        "country" : {
            "id": country
        },
        "description": description
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        type:"PUT",
        url:`http://localhost:8080/city/${id}`,
        data: JSON.stringify(newCity),
        success: function (){
            alert("Sửa thành công !!!")
            showCountryList()
            showCityList()
        }
    })
}
function deleteCity(id){
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/city/${id}`,
        success:function (){
            alert("Xóa thành công !!!")
            showCityList()
            showCityList()
        }
    })
}
function setId(id){
    sessionStorage.setItem("city-id",id)
}
function viewInformation(id){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/city/${id}`,
        success: function (city){
            let content = `<th scope="row">${city.id}</th>
        <td>${city.name}</td>
        <td>${city.acreage}</td>
        <td>${city.population}</td>
        <td>${city.gdp}</td>
        <td>${city.country.name}</td>
        <td>${city.description}</td>`
            $('#view-list').html(content);
        }
    })
}

