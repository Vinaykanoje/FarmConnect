function validateMobile(input){
 const ok=/^[6-9]\d{9}$/.test(input.value.trim());
 input.setCustomValidity(ok?"":(window.fcTr?window.fcTr("Enter a valid 10-digit mobile number."):"Enter a valid 10-digit mobile number."));
}
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll('input[type="tel"]').forEach(i=>i.addEventListener("input",()=>validateMobile(i)));
});
