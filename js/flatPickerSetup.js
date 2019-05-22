$( function() {
    $( "#formTaskDeadLine" ).flatpickr({disableMobile:'true',altInput:'true', altFormat:'j F Y', dateFormat:'Y-m-d', locale:"fr",weekNumbers: true});
    $( "#formRdvDeadLine" ).flatpickr({disableMobile:'true',altInput:'true', altFormat:'j F Y H:i', dateFormat:'Y-m-d H:i', locale:"fr",weekNumbers: true,enableTime: true,time_24hr: true});
});