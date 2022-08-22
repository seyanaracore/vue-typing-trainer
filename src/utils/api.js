class Api {
  // eslint-disable-next-line class-methods-use-this
  #request(url, method) {
    return fetch(url, { method })
  }

  async get(url) {
    const response = await this.#request(url, 'GET')

    return response.json()

    // try {
    //   const response = await this.#request(url, 'GET')
    //   return response.json()
    // } catch (e) {
    //   console.log('ошибка' + e)
    //   console.error(e)
    //   return e
    // }
  }
}

export default new Api()
