$(document).ready(function () {
    obtenerTareas();
    let modificar = false;

    function obtenerTareas() {
        $.ajax({
            url: "listar.php",
            type: "GET",
            success: function (tareas) {
                let persons = JSON.parse(tareas);
                let template = '';
                persons.forEach(person => {
                    template += `
                    <tr personId="${person.id}">
                        <td>${person.firstName}</td>
                        <td>${person.lastName}</td>
                        <td>
                            <button class="personEdit btn btn-primary">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" data-toggle="modal" data-target="#eliminar">Delete</button>
                        </td>
                    </tr>
                    `
                });
                $('#tableCont').html(template);
            }
        });
    }

    $('#confirm').submit(e => {
        const datos = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            id: $('#personId').val(),
        }
        console.log(datos);
        const url = modificar === false ? 'insertar.php' : 'modificar.php';
        $.post(url, datos, (response) => {
            obtenerTareas();
        });
    });

    $(document).on('click', '.personEdit', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('personId');
        console.log(id);
        $.post('getTarea.php', { id }, (response) => {
            const person = JSON.parse(response);
            $('#firstName').val(person.firstName);
            $('#lastName').val(person.lastName);
            $('#personId').val(person.id);
            modificar = true;
        });
        $('#agregar').modal({show:true});
    });

    $(document).on('click', '.personDelete', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('personId');
        console.log(id);
        $.post('eliminar.php', { id }, (response) => {
            obtenerTareas();
        });
    });

    $(document).on('click', '.add', (e) =>{
        $('#firstName').val("");
        $('#lastName').val("");
        $('#personId').val(0);
        modificar = false;
    });

    $('#search').keyup(function () {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'buscar.php',
                type: 'POST',
                data: { search },
                success: function (response) {
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>${task.name}</li>`;
                    });
                    $('#container').html(template);
                },
            });
        }
    });

});
