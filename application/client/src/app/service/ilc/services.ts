import { popup, Service as UIPopupService } from '@ui/service/pupup';
import { notifications, Service as UINotificationsService } from '@ui/service/notifications';
import { contextmenu, Service as UIContextmenuService } from '@ui/service/contextmenu';
import { layout, Service as UILayoutService } from '@ui/service/layout';
import { toolbar, Service as UIToolbarService } from '@ui/service/toolbar';
import { sidebar, Service as UISidebarService } from '@ui/service/sidebar';
import { styles, Service as UIStylesService } from '@ui/service/styles';
import { bottomsheet, Service as UIBottomSheetService } from '@ui/service/bottomsheet';
import { session, Service as SessionService } from '@service/session';
import { jobs, Service as JobsService } from '@service/jobs';
import { state, Service as StateService } from '@service/state';
import { bridge, Service as BridgeService } from '@service/bridge';
import { recent, Service as RecentService } from '@service/recent';
import { opener, Service as OpenerService } from '@service/opener';
import { hotkeys, Service as HotkeysService } from '@service/hotkeys';
import { listener, Service as ListenerService } from '@ui/service/listener';

import { Instance as Logger } from '@platform/env/logger';

export class Services {
    public readonly system: {
        session: SessionService;
        state: StateService;
        jobs: JobsService;
        bridge: BridgeService;
        recent: RecentService;
        opener: OpenerService;
        hotkeys: HotkeysService;
    };
    public readonly ui: {
        popup: UIPopupService;
        notifications: UINotificationsService;
        contextmenu: UIContextmenuService;
        layout: UILayoutService;
        toolbar: UIToolbarService;
        sidebar: UISidebarService;
        styles: UIStylesService;
        bottomsheet: UIBottomSheetService;
        listener: ListenerService;
    };

    private readonly _owner: string;
    private readonly _logger: Logger;

    constructor(owner: string, logger: Logger) {
        this._owner = owner;
        this._logger = logger;
        this.system = {
            session,
            state,
            jobs,
            bridge,
            recent,
            opener,
            hotkeys,
        };
        this.ui = {
            popup,
            notifications,
            contextmenu,
            layout,
            toolbar,
            sidebar,
            styles,
            bottomsheet,
            listener,
        };
    }
}