import { observable, action, decorate } from "mobx";

class UiStore {
    windowSize = { width: null, height: null };

    setWindowSize(width, height) {
        this.windowSize.width = width;
        this.windowSize.height = height;
    }
}

decorate(UiStore, {
    windowSize: observable,
    setWindowSize: action
});
export default UiStore;
