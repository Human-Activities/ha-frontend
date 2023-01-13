import { StateConstants } from "./Constants";

export class PathManager {
    static getCurrentStateByPath(): StateConstants {
        const index = location.pathname.indexOf('/');
        const path = location.pathname.substring(index+1);
        switch (path) {
            case 'login':
                return StateConstants.LOGIN;
            case 'panel':
                return StateConstants.PANEL;    
            default:
                return StateConstants.HOME    
        }
    }
}