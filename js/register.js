$(document).ready(function(){
    
    $("#register").click(registerCheck);

})

function registerCheck(){
    var entry_fName, entry_lName, entry_email, entry_address, entry_pass, entry_pass_repeat;

    entry_fName = $("#fName").val();
    entry_lName = $("#lName").val();
    entry_email = $("#email").val();
    entry_address = $("#address").val();
    entry_pass = $("#pass").val();
    entry_pass_repeat = $("#pass_again").val();

    
    //Regex
    var regName = /^[A-Z][a-z]{2,24}$/;
    var regEmail = /^(([a-z\d]+\.{1}){2}\d{1,3}\.\d{2}@ict.edu.rs)|(([a-z\d]+\.*)+@(gmail|hotmail|yahoo)\.com)$/;
    var regAddress = /^([A-Z][a-z]{3,15})(\s\d{0,4})?[A-Z]?$/;
    var regPass = /^[\w\d\S]{8,25}$/;


    //Regex test
    if(!regName.test(entry_fName)){
        $("#fName").css({"border": "1px solid red"});
        //$("#fName").parent().append("<span>Ne valja ti ime</span>");
    }
    else{
        $("#fName").css({"border": "none"});
    }
    if(!regName.test(entry_lName)){
        $("#lName").css({"border": "1px solid red"});
    }
    else{
        $("#lName").css({"border": "none"});
    }


    if(!regEmail.test(entry_email)){
        $("#email").css({"border": "1px solid red"});
    }
    else{
        $("#email").css({"border": "none"});
    }
    if(!regAddress.test(entry_address)){
        $("#address").css({"border": "1px solid red"});
    }
    else{
        $("#address").css({"border": "none"});
    }


    if(!regPass.test(entry_pass)){
        $("#pass").css({"border": "1px solid red"});
    }
    else{
        $("#pass").css({"border": "none"});
    }
    if(entry_pass != entry_pass_repeat || entry_pass_repeat == ""){
        $("#pass_again").css({"border": "1px solid red"});
    }
    else{
        $("#pass_again").css({"border": "none"});
    }
}