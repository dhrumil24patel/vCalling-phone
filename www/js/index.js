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
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady: function() {
    app.receivedEvent('deviceready');
    console.log('calling setup push');
    app.setupPush();
    
    var plugin    = cordova.plugins.backgroundMode;
    plugin.overrideBackButton();
    cordova.plugins.backgroundMode.enable();
},
    // Update DOM on a Received Event
receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');
    
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
    
    console.log('Received Event: ' + id);
},
setupPush: function() {
    console.log('calling push init');
    var push = PushNotification.init({
                                     "android": {
                                     "senderID": "XXXXXXXX"
                                     },
                                     "browser": {},
                                     "ios": {
                                     "sound": true,
                                     "vibration": true,
                                     "badge": true,
                                     "categories": {
                                     "invite": {
                                     "yes": {
                                     "callback": "accept", "title": "Accept", "foreground": true, "destructive": false
                                     },
                                     "no": {
                                     "callback": "reject", "title": "Reject", "foreground": true, "destructive": false
                                     },
                                     "maybe": {
                                     "callback": "maybe", "title": "Maybe", "foreground": true, "destructive": false
                                     }
                                     },
                                     "delete": {
                                     "yes": {
                                     "callback": "doDelete", "title": "Delete", "foreground": true, "destructive": true
                                     },
                                     "no": {
                                     "callback": "cancel", "title": "Cancel", "foreground": true, "destructive": false
                                     }
                                     }
                                     }
                                     },
                                     "windows": {}
                                     });
    console.log('after init');
    
    push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);
            
            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
            // Save new registration ID
            localStorage.setItem('registrationId', data.registrationId);
            // Post registrationId to your app server as the value has changed
            }
            
            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');
            
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            });
    
    push.on('error', function(e) {
            console.log("push error = " + e.message);
            });
    
    push.on('notification', function(data) {
            console.log('notification event');
            //            navigator.notification.alert(
            //                data.message,         // message
            //                null,                 // callback
            //                data.title,           // title
            //                'Ok'                  // buttonName
            //            );
            //            data.additionalData = {
            //            "aps": {
            //            "alert": "This is a notification that will be displayed ASAP.",
            //            "category": "invite"
            //            },
            //            "notId": "1"
            //            };
            push.finish(()=>{
                        console.log("processing of push data is finished!");
                        },()=>{
                        console.log("something went wrong with push.finish for ID =", data.additionalData.notId)
                        }, 1);
            });
    var pushV = VoIPPushNotification.init(
                                          {
                                          "android": {
                                          "senderID": "XXXXXXXX"
                                          },
                                          "browser": {},
                                          "ios": {
                                          "sound": true,
                                          "vibration": true,
                                          "badge": true,
                                          "categories": {
                                          "invite": {
                                          "yes": {
                                          "callback": "accept", "title": "Accept", "foreground": true, "destructive": false
                                          },
                                          "no": {
                                          "callback": "reject", "title": "Reject", "foreground": true, "destructive": false
                                          },
                                          "maybe": {
                                          "callback": "maybe", "title": "Maybe", "foreground": true, "destructive": false
                                          }
                                          },
                                          "delete": {
                                          "yes": {
                                          "callback": "doDelete", "title": "Delete", "foreground": true, "destructive": true
                                          },
                                          "no": {
                                          "callback": "cancel", "title": "Cancel", "foreground": true, "destructive": false
                                          }
                                          }
                                          }
                                          },
                                          "windows": {}
                                          });
    pushV.on('registration', function(data) {
             console.log("[Ionic] registration callback called");
             console.log(data);
             
             //data.deviceToken;
             //do something with the device token (probably save it to your backend service)
             });
    //    pushV.on('notification', function(data) {
    //            console.log("[Ionic] notification callback called");
    //            console.log(data);
    //                         navigator.notification.alert(
    //                             data.message,         // message
    //                             null,                 // callback
    //                             data.title,           // title
    //                             'Ok'                  // buttonName
    //                         );
    //             push.finish(()=>{
    //                         console.log("processing of voip push data is finished!");
    //                         },()=>{
    //                         console.log("something went wrong with push.finish for ID =", data.additionalData.notId)
    //                         }, 1);
    //
    //            // do something based on received data
    //        });
    //    pushV.on('notification').subscribe(function(data) {
    //            console.log("Push on subscribe notification", data);
    //
    //            // might have to change this if you want to handle voip and non-voip notifications
    //            if (this.platform.is('ios')) {
    //            cordova.plugins.notification.local.schedule({
    //                title: data.title,
    //                text: data.body,
    //                foreground: true,
    //                data
    //                });
    //            }
    //        });
    pushV.on('error', function(e) {
             console.log(e);
             });
}
};


