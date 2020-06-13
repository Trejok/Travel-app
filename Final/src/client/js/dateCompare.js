function dateCompare() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
     if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }

    today = yyyy+'-'+mm+'-'+dd;
    let tomor = document.getElementById('depdate').value

    const date1 = new Date(today);
    const date2 = new Date(tomor);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if(diffDays === 0) {
      return('today')
    }
    else if(diffDays === 1) {
      return('tomorrow')
    }
    else {
    return(diffDays + " days");
    }
}

export { dateCompare }
