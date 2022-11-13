        document.getElementById("Veesel_IMO_number").onchange = function()

         {

                     $.ajax(
   {
      type:'GET',
      url:'https://script.google.com/macros/s/AKfycbzp1qMGYaS8VOiXROXResKOqYWGxpYa54pYZCDILPsOS5lTM_siH87HrBD95LZG0GN2mg/exec',
      data:"Ship="+document.getElementById("Veesel_IMO_number").value,
      success: function(data){
        console.log(data);
        var ty = document.getElementById("deficiency_report_number");
        ty.value = data;

// function initPage() {
//  document.getElementById("member_type_academic_4").onchange = function(){
//   alert("It's Working");
//  };
// }
      }
   }
);