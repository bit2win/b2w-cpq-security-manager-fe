import Api from './Api';

export default class SecurityApi {
    public async getSecurityInfo() {
        return await this.api.get(`/security`).promise;
    }

    public async saveSecurityPolicies(policies) {
        return await this.api.post(`/security`, policies).promise;
    }

    private apiVersion = process.env.REACT_APP_API_VERSION;
    private apiBackEnd = process.env.PUBLIC_URL;
    private api = new Api(`${this.apiBackEnd}/${this.apiVersion}`);
}
