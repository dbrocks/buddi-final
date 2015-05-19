"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#petMessage").animate({width:'toggle'},350);
    }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#petMessage").animate({width:'hide'},350);
                
                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    function sendAjaxAddInfo(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#pets").append("<div class=pet><h3>Species: " + result[0].species + "</h3>");
                $("#pets").append("<div class=pet><h3>Color: " + result[0].color + "</h3>");
                $("#pets").append("<div class=pet><h3>Personality: " + result[0].personality + "</h3>");
                $("#pets").append("<div class=pet><h3>Bio: " + result[0].bio + "</h3>");
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makePetSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#petMessage").animate({width:'hide'},350);
    
        if($("#petName").val() == '' || $("#petAge").val() == '') {
            handleError("All fields are required");
            return false;
        }

        sendAjax($("#petForm").attr("action"), $("#petForm").serialize());
        
        return false;
    });
	
	$("#removePetSubmit").on("click", function(e) {
        e.preventDefault();
		console.log("CLIENT");
        sendAjax($("#removePetForm").attr("action"), $("#removePetForm").serialize());

        return false;
    });
    
    //For additional information button
    $(document).on("click", ".additionalInfo", function(e) {
        e.preventDefault();
		console.log("CLIENT");
        
        var buttonName = e.target.id;
        console.log(e.target.id);
        
        sendAjaxAddInfo("/addInfo", {petName: buttonName});

       return false;
    });
    
    //Story button
    $("#makePetPost").on("click", function(e) {
        e.preventDefault();
        
        $("#petMessage").animate({width:'hide'},350);
    
        if($("#petPost").val() == '') {
            handleError("All fields are required");
            return false;
        }

        sendAjax($("#petForm").attr("action"), $("#petForm").serialize());

        return false;
    });
	
    $("#removePetSubmit").on("click", function(e) {
        e.preventDefault();
                console.log("CLIENT");
        sendAjax($("#removePetForm").attr("action"), $("#removePetForm").serialize());

        return false;
    });
    
});