/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.fourdea.vCallingMobile;

import android.os.Bundle;
import org.apache.cordova.*;
import io.ably.lib.realtime.*;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
		
		try{
			temp();
		}catch(Exception e){
			
		}
    }
	
	public void temp() throws Exception{
		AblyRealtime ably = new AblyRealtime("WIIeoQ.TekHcA:jsBD7ePEu3mcQCjc");
		ably.connection.on(new ConnectionStateListener() {
			@Override
			public void onConnectionStateChanged(ConnectionStateChange state) {
				System.out.println("New state is " + state.current.name());
				switch (state.current) {
					case connected: {
						// Successful connection
						break;
					}
					case failed: {
						// Failed connection
						break;
					}
				}
			}
		});
	}
}
