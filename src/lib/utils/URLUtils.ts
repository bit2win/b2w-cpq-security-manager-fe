class URLUtils {
  private constructor() {}

  public static getProtocol() {
    return window.location.protocol;
  }

  public static getHostname() {
    return window.location.hostname;
  }

  public static getBaseURL() {
    let protocol = this.getProtocol();
    let hostname = this.getHostname();
    let port = this.getPort() ? ":" + this.getPort() : "";
    return `${protocol}//${hostname}${port}`;
  }

  public static getPort() {
    return window.location.port;
  }
}

export default URLUtils;
