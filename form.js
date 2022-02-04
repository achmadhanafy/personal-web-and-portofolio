function getMessage(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById ("message").value;

    

    
    const dataObject = {
        dataName : name,
        dataEmail : email,
        dataPhone : phone,
        dataSubject : subject,
        dataMessage : message
    
    }
    
    let emailReceiver = 'achmadhanafy@gmail.com'
    
    let a = document.createElement('a')
    a.href = `mailto:${emailReceiver}?subject=${subject}&body= Hello my name ${name} . ${message}. Please contact me on ${phone}`;
    //validation
    if (name == false){
        alert("name its cant be empety");
    } else if(email == false){
        alert("email its cant be empety")
    } else if (phone == false){
        alert ("phone its cant be empety")
    } else if (subject == false){
        alert ("subject cant be empety")
    } else if (message == false){
        alert ("Message cant be empety")
    } else if(isNaN(phone)) {
        alert ("Phone number must be number")
    } 
    else {
        a.click();
    }
    
    
    //if (phone == NaN == true){
       // alert("Phone number must ber number")
    //}
    
    
    }

    $(function() {
        $("input[name='numonly']").on('input', function(e) {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));
        });
    });