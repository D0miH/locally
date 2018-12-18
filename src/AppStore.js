import { observable, decorate } from "mobx";
// import the sub stores
import UiStore from "./components/UiStore";

class AppStore {
    constructor() {
        this.uiStore = new UiStore();
    }
}

export default AppStore;
