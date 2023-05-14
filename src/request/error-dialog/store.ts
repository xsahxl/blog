import { QuickShowRet } from "@alicloud/console-components/types/dialog";

class Store {
    // 记录报错弹窗的实例，用于判断是否有弹出的报错窗口
    private instance: QuickShowRet | null = null;

    setInstance(instance: QuickShowRet) {
        this.instance = instance;
    }
    getInstance() {
        return this.instance;
    }
    clearInstance() {
        this.instance?.hide();
        this.instance = null;
    }
}

export default new Store();