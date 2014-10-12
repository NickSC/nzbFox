/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 
		nzbFox (c) 2014 Nick Cooper - https://github.com/NickSC
		
*/

function log(msg) {self.port.emit('log',msg);}
log('Download prompt detected, MIME = "'+dialog.mLauncher.MIMEInfo.MIMEType+'" primExt = "'+dialog.mLauncher.MIMEInfo.primaryExtension.toLowerCase()+'"');
if (self.options.prefs.dev) console.log(dialog.mLauncher);
if (dialog.mLauncher.MIMEInfo.MIMEType == 'application/x-nzb' || dialog.mLauncher.MIMEInfo.primaryExtension.toLowerCase() == 'nzb') {
	var modeGroup = document.getElementById('mode');
	var fileName = dialog.mLauncher.suggestedFileName;
	var send_nzbg, send_sab;

	if (self.options.prefs.nzbg_enabled) {
		send_nzbg = modeGroup.appendItem('Send to NZBGet','nzbg');
		send_nzbg.setAttribute('src',self.options.dataURL+'nzbget.png');
	}
	if (self.options.prefs.sab_enabled) {
		send_sab = modeGroup.appendItem('Send to SABnzbd+','sab');
		send_sab.setAttribute('src',self.options.dataURL+'sab.png');
	}

	dialog.onOK_orig = dialog.onOK;
	dialog.onOK = function() {	
		if (modeGroup.selectedItem == send_nzbg || modeGroup.selectedItem == send_sab) {	
			var data = {'url':dialog.mLauncher.source.spec,'target':modeGroup.selectedItem.value,'fileName':fileName};
			self.port.emit('nzb-download', data);
			modeGroup.selectedItem = document.getElementById('save');
		}
		return dialog.onOK_orig();
	}
}