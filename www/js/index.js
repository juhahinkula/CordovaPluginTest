/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $("#loc").text("Getting current position...");
        getPosition();
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        $("#camera").click(function(){
            openCamera();
        });        
    },
    
};

// Open camera and show taken picture
function openCamera() {
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.FILE_URI });

        function onSuccess(imageURI) {
            console.log(imageURI);
            $("#camimage").attr("src", imageURI);
            $("#camimage").responsiveImg();
        }

        function onFail(message) {
            app.showAlert('Error taking picture', 'Error');
        }     
}

// Get current position and show it in the footer
function getPosition() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: false});

    function onSuccess(position) {
        $("#loc").text("Lat:"  + position.coords.latitude + " Long: "  + position.coords.longitude);
    }

    function onError(err) {
        console.log('Error:' + err);
    }
}
