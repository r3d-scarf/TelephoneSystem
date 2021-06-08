function getView(id) {
    $(document).ready( function () {
            $.ajax({
                url: `/telephoneExchanges/get/${id}`
            }).then(function (data) {
                console.log(JSON.stringify(data));
                $('.view-0').html(data.id);
                $('.view-1').html(data.codeName);
                $('.view-2').html(data.address.street + ' ' + data.address.building);
                $('.view-3').html(data.stationType);
                $('.view-4').html(data.availableCables);
                $('.view-5').html(data.availableChannels);
                $('.view-6').html(data.workingStatus);
                var createdAt = new Date(data.created_at);
                $('.view-7').html(createdAt.toLocaleString('uk-UA', {timeZone : 'Europe/Kiev'}));
                var modifiedAt = new Date(data.modified_at);
                $('.view-8').html(modifiedAt.toLocaleString('uk-UA', {timeZone : 'Europe/Kiev'}));
                var description = data.description === null ? '&mdash;' : data.description;
                $('.view-9').html(description);
            }).then(function () {
                $('#ModalView').modal('show');
            })
        }
    );
}

function getUpdate(id) {
    $(document).ready( function () {
            $.ajax({
                url: `/telephoneExchanges/get/${id}`
            }).then(function (data) {
                $('#update-form').attr('action', `/telephoneExchanges/update/${data.id}`)
                $( "input[name='update-0']" ).val(data.id);
                $( "input[name='update-1']" ).val(data.codeName);
                $( "select[name='update-2']" ).val(data.address.street + ' ' + data.address.building);
                $( "select[name='update-3']" ).val(data.stationType);
                $( "input[name='update-4']" ).val(data.availableCables);
                $( "input[name='update-5]" ).val(data.availableChannels);
                $( "input[name='update-6]" ).val(data.workingStatus);
                $( "textarea[name='update-7']" ).val(data.description);
            }).then(function () {
                $('#ModalUpdateForm').modal('show');
            })
        }
    );
}

function getDelete(id) {
    $("#delete-province").attr('href', `/telephoneExchanges/delete/${id}`);
    $("#ModalDelete").modal('show');
}

function sortTable(n, type) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("main-table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if(type === 'numeric') {
                if (dir === "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if(type === 'alphabetic') {
                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {

            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

$(".alert-close").click(function() {
    $(this)
        .parent(".alert")
        .fadeOut();
});