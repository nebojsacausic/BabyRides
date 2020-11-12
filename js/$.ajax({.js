$.ajax({
    url : "/PHP1/BabyRides/views/obrada.php",
    method : "post",
    dataType: "json",
    data : {
        fName : fName,
        lName : lName,
        email : email,
        address : address,
        pass : pass,
        pass_repeat : entry_pass_repeat,
        sent : true
    },
    success : function(data){
        console.log("Sve ok sa serverom");
        //console.log(data);
    },
    error : function(xhr, status, errorMsg){
        console.log("Nesto nije ok sa serverom");
    }
})