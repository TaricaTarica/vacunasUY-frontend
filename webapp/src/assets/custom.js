function toastMensaje(value) {
    var clase;
    var toastHTML;
    if(value.indexOf("Error") !== -1){
        clase = 'red lighten-1';
        toastHTML =  `<i class="tiny material-icons">do_not_disturb</i>
         <span>${value}</span>`;
    }
    else{
        clase = 'blue accent-1'
        toastHTML =  `<i class="tiny material-icons">done</i>
         <span>${value}</span>`;

    }
    
    M.toast({html: toastHTML, classes: clase});
}