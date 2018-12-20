// import the sub stores
import UiStore from "./stores/UiStore";

class AppStore {
    constructor() {
        this.uiStore = new UiStore();
    }
}

export default AppStore;
