/**
 * JS Utilities
 * by Damber Prasad Gautam
 */
 
 
//@brief set setp wizard
$(document).ready(function () {
    //focus organization dropdown  
    $("#organization").focus();
     
    //Button click id
    var btn_id;
    $("button").click(function() {
        btn_id =this.id; // or alert($(this).attr('id'));
    });
    
    var navListItems = $('div.setup-panel div a'),
    allWells = $('.setup-content'),
    allNextBtn = $('.nextBtn'),
    allPrevBtn = $('.prevBtn');
    
    allWells.hide();
    
    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
        $item = $(this);
        
        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
    
    allPrevBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
        
        prevStepWizard.trigger('click');
    });
    
    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url'],input[type='file'],select,textarea"),
        isValid = true;
        
        
        
        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }
        
        if (isValid){
            var act_res = ajxProcessApplication(btn_id);
            //alert(act_res); return false;
            if(act_res ==="success"){
                nextStepWizard.removeAttr('disabled').trigger('click');
            }
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            
            //last button action
            if(btn_id === 'next_btn_step5' && act_res ==="success" ){ 
                var URL = "dashboard_admin.php?page=manage-events";
                var delay = 1000; //Your delay in milliseconds
                setTimeout(function(){ window.location = URL; }, delay);
            } //custom
        }
    });
    
    $('div.setup-panel div a.btn-primary').trigger('click');
}); 




/**
 * @brief Ajax function Call
 * @param {int} btn_id
 * @returns {String|result.msg_type}
 */

function ajxProcessApplication(btn_id){
    
    // get input field variable
    var $inputs;        
    if(btn_id === "next_btn_step1"){        $inputs = $('#step-1 :input');
    }else if(btn_id === "next_btn_step2"){  $inputs = $('#step-2 :input');
    }else if(btn_id === "next_btn_step3"){  $inputs = $('#step-3 :input');
    }else if(btn_id === "next_btn_step4"){  $inputs = $('#step-4 :input');
    }else if(btn_id === "next_btn_step5"){  $inputs = $('#step-5 :input');
    }else{                                  setErrorSuccessMsg("Unable to process your request. Please refresh your page and try again.","error"); }
    
    
    //base url of website
    var base_url = $('#hdn_base_url').val();
        
    
    /**
     * Append Files, other input fields and action_id to form data
     */
    
    //Form data object
    var fd = new FormData();
    
    //Get files
    $inputs.each(function() {
        if( $(this).attr('type') ==="file"){
            var file_data = $('input[type="file"]')[0].files;
            for(var i = 0;i<file_data.length;i++){  fd.append("file_"+i, file_data[i]); }
        }
    });
    
    
    //may be useful later 
    //var a = input.name.replace(/[^-\d\.]/g, '');
    //input.name.match(/questions[^-\d\.]/g)
    
    
    //Event Questions dynamic field values
    if(btn_id === "next_btn_step5"){
        var other_data = $inputs.serialize();
        $.each($inputs, function(key, input){     
            if(input.name.match(/questions[^-\d\.]/g)){ fd.append('inputData'+input.name+'', (input.value)); }
            else{ fd.append('inputData['+input.name+']', (input.value)); }
        });
     
     //Rating dynamic field values
     }else if(btn_id === "next_btn_step3" ){
        var other_data = $inputs.serialize();
        $.each($inputs, function(key, input){     
            if(input.name.match(/ratingQ[^-\d\.]/g)){ fd.append('inputData'+input.name+'', (input.value)); }
            else{ fd.append('inputData['+input.name+']', (input.value)); }
        });
        
     //Workshop dynamic field values
     }else if(btn_id === "next_btn_step4" ){
         //alert($("#hdn_committee_name").val());
        var other_data = $inputs.serialize();
        $.each($inputs, function(key, input){     
            if(input.name.match(/workshop[^-\d\.]/g)){ fd.append('inputData'+input.name+'', (input.value)); }
            else{ fd.append('inputData['+input.name+']', (input.value)); }
        });
        
     //Get Other static input fileds
     }else{
        var other_data = $inputs.serializeArray();
        $.each(other_data,function(key,input){ fd.append('inputData['+input.name+']', (input.value)); });        
     }
     
    //append buttion id
    fd.append('inputData[action_id]', btn_id);
     
     
    /**
     * Ajax call
     * @type array
     */
    var getData={};
    getData = $.getValues(base_url+'/inc_controller/ajax_request_handler.php',fd);
    
    var resMsg = getData.msg;
    var msgType = getData.type;
    
    
    // Test all input And Output
    // setErrorSuccessMsg(getData.toSource(), "error"); 
    
    //Print message
    setErrorSuccessMsg(resMsg, msgType);
    
    //Set input field null for next update
    if(msgType === "success" && btn_id === "next_btn_step1" ){
        $('#eventlogo-btn').val('');
        $('#eventlogo-label').html('<i class="fa fa-check"></i> Image Provided');
    }
    
    //retun
    return msgType;
}



/**
 * Ajax function 
 * @param {type} param
 */
jQuery.extend({
        getValues: function(url, inputData) {
            
            var result = {};
            $.ajax({
                url: url,
                data: inputData,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function(data){   
                    //result = $.parseJSON(data);
                    
                    
                    var parsed = $.parseJSON(data);
                    result["msg"] = parsed[0];
                    result["type"] = parsed[1];
                },
                async: false
            });
            
            return result;
        }
});






/**
 * @brief Set Errors in div
 * @param {string} msg
 * @param {string} type
 */
function setErrorSuccessMsg(msg,type){
    if(msg !== "" && type === "error"){
        $("#ajxMsgDiv").removeClass("alert, alert-success");
        $("#ajxMsgDiv").addClass("alert alert-danger");
        $("#ajxMsgDiv").slideDown(500);
        $("#ajxMsgDiv").text(msg);

    }else if(msg !== "" && type === "success"){
        $("#ajxMsgDiv").removeClass("alert, alert-danger");
        $("#ajxMsgDiv").addClass("alert alert-success");
        $("#ajxMsgDiv").slideDown(500);
        $("#ajxMsgDiv").text(msg);
    }else{
        $("#ajxMsgDiv").removeClass("alert, alert-success");
        $("#ajxMsgDiv").addClass("alert, alert-danger");
        $("#ajxMsgDiv").slideDown(500);
        $("#ajxMsgDiv").text("Something went wrong. Please refresh the page and try again.");
    }
}





/**
 * @brief Public functions 
 */

// Load image name in textfiled 
document.getElementById("eventlogo-btn").onchange = function () {    
    document.getElementById("eventlogo-label").innerHTML = " <span class='imgcancel fa fa-times' data-toggle='tooltip' title='Remove Image' onclick='return imgcancel();'></span> " + this.value;
    
};



// Only Google Chrome -Reason. box get 0 height if no file selected 
$("input[type=file]").bind("change", function() {
    var selected_file_name = $(this).val();
    if ( selected_file_name.length < 1 ) {
        document.getElementById("eventlogo-label").innerHTML = '<i class="fa fa-image"></i> Click here to choose image file ( JPG, JPEG, PNG ).  ';
    }
});



// cancel image upload
function imgcancel(){                
    $('#eventlogo-btn').val('');
    $('#eventlogo-label').html('<i class="fa fa-image"></i> Click here to choose image file ( JPG, JPEG, PNG ).  ');
    
    //display current image
    $('#event_logo_img').css('display','block');
    
    //hidne preview
    $('#previewImg').css('display','none');
    return false;
}



// Event: Preview Image
$("#eventlogo-btn").bind("change", function() {
    previewImg(this);
});



// Function : Preview image
function previewImg(input){
            
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#event_logo_img').css('display','none');
            $('#previewImg').css('display','block');
            $('#previewImg').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }        
}



/**
 * Add HTML element
 */
function addHTMLElement(){
    //Count questions
    var count = $('.event_workshop').length + 1;
    if((count-1) > 1 ){
        var last_id = $("#workshop_builder_event .event_workshop:last-child").attr('id');
        var str = last_id.split("_");
        count = parseInt(str[str.length-1]) + 1;        
    }
    
    //build next workshop id
    var divId = "row_event_workshop_"+count;

    //where to append
    var div = $('#workshop_builder_event');
    
    //append
    var html = '<div class="form-group required event_workshop" id ="' + divId + '"><br />\n\
                    <label class="col-md-6 control-label">Workshop '+ count +': <br /><span class="fa fa-trash-o small removehtml" onclick="return removeHtml('+"'"+divId+"'"+');"> Remove</span></label>\n\
                    <div class="col-md-6">\n\
                        <input type="text" name="workshop['+ count +']" class="form-control" required="required" placeholder="Workshop title.." >\n\
                    </div>\n\
                </div>';
    div.append(html);
    
    return false;
}



/**
 * @brief Remove html element
 * @param {type} divId
 * @returns {Boolean}
 */
function removeHtml(divId){
    
    var res = confirm("Are you sure you want to delete this element?");
    if(res === true){
        $("#"+divId+"").remove();
    }else{
        return false;
    }
}



//set event value as organization prefex with focus
function select_organization(org){
    
    var $orgSelect = $("#organization").select2();
    
    $("#eventname").val(org+" ");
    $("#eventname").focus();
    
    $orgSelect.select2('close');
    
    $("#hdn_committee_name").val(org);
    if(($.trim(org)).toLowerCase() === "apnic"){
        $("#other_committee").css('display','none');
        $("#apnic_committee").css('display','block');
    }else{
        $("#apnic_committee").css('display','none');
        $("#other_committee").css('display','block');
    }
}
