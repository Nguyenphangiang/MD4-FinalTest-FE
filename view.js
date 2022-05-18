let cityId = sessionStorage.getItem('city-id');
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
viewInformation(cityId);