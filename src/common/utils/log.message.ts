// 删除数据格式化
export const logMessage = (request) => {
  /**当前请求方式 */
  const method = request.method;
  /**当前请求路径 */
  const url = request.url;
  /**当前请求参数 */
  const body = request.body;
  /**当前params参数 */
  const params = request.params;
  /**当前query参数 */
  const query = request.query;
  /**当前用户信息 */
  const user = request.user;
  const errMessage = {
    url,
    method,
    user,
    body,
    params,
    query,
  };

  return errMessage;
};
