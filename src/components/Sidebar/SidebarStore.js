import { observable, decorate } from "mobx";
import React from "react";

class SidebarStore {
    ipList = [];
}

decorate(SidebarStore, {
    ipList: observable
});

export default SidebarStore;
