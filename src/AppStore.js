import { observable, decorate } from "mobx";
// import the sub stores
import UiStore from "./stores/UiStore";

class AppStore {
    constructor() {
        this.uiStore = new UiStore();
    }

    messageHistory = [];
}

decorate(AppStore, {
    messageHistory: observable
});

export default AppStore;
