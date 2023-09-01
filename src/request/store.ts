import { QuickShowRet } from '@alicloud/console-components/types/dialog';
import { isEmpty } from 'lodash';

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
  // 用户可能会在公共地方修改请求参数，通过该字段去收集，用于报错弹窗的展示
  private requestData: Record<string, any> = {};
  setRequestData(data?: Record<string, any>) {
    if (isEmpty(data)) return;
    this.requestData = data;
  }
  getRequestData() {
    return this.requestData;
  }
}

export default new Store();
