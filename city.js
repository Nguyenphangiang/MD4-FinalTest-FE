function showCityList(){
    $.ajax({

        type:"GET",
        url:"http://localhost:8080/city",
        success: function (city){
            let content = '';
            for (let i = 0; i < city.length; i++) {
                content += `<tr>
        <th scope="row">${i+1}</th>
        <td>${city[i].name}</td>
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
        }
    })
}
showCountryList();

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
function showEditForm(id){
    let content = `
              <form>

                       <div class="mb-3">
                            <label for="name" class="form-label">Tên thành phố</label>
                            <input type="text" class="form-control" id="name" aria-describedby="emailHelp">

                        </div>
                        <div class="mb-3">
                            <label for="acreage" class="form-label">Diện Tích</label>
                            <input type="text" class="form-control" id="acreage">
                        </div>
                        <div class="mb-3">
                            <label for="population" class="form-label">Dân Số</label>
                            <input type="text" class="form-control" id="population">
                        </div>
                        <div class="mb-3">
                            <label for="gdp" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="gdp">
                        </div>
                        <div class="mb-3">
                            <label for="list-country">Quốc Gia</label>
                            <select  id="list-country">

                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Mô Tả</label>
                            <textarea  id="description" cols="30" rows="10"></textarea>
                        </div>
                        <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="editCity(${id})">Thay Đổi</button>
            </div>
                </div>


            </form>`;

}
