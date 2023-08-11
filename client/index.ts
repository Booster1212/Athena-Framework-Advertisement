import * as alt from 'alt-client';
import * as AthenaClient from '@AthenaClient/api';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';

function init() {
    const page = new AthenaClient.webview.Page({
        name: 'Advertisement',
        callbacks: {
            onReady: async () => {},
            onClose: () => {},
        },
        options: {
            onOpen: {
                focus: true,
                hideHud: true,
                hideOverlays: true,
                setIsMenuOpenToTrue: true,
                showCursor: true,
                disableControls: 'all',
                disablePauseMenu: true,
            },
            onClose: {
                hideCursor: true,
                showHud: true,
                showOverlays: true,
                unfocus: true,
                setIsMenuOpenToFalse: true,
                enableControls: true,
                enablePauseMenu: true,
            },
        },
    });

    alt.onServer('Advertisement:OpenUI', () => {
        if (typeof page !== 'undefined') {
            page.open();
        }
    });
}

onTicksStart.add(init);

alt.onServer(`Advertisement:SetMessageArray`, (messageArray: Array<{ content: string; timestamp: string }>) => {
    AthenaClient.webview.emit(`Advertisement:SetMessageArray`, messageArray);
});

alt.onServer(`Advertisement:LoadMessages`, (messagesArray: Array<{ content: string; timestamp: string }>) => {
    AthenaClient.webview.emit(`Advertisement:SetMessageArray`, messagesArray);
});
