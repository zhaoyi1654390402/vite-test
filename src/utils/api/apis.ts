const baseUrl = './api';

class SystemApi {
    // 登录
	login() {
		return `${baseUrl}/login`;
	}
}
export const systemApi = new SystemApi();
