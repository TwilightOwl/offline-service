const request = (url: string, data: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(Math.random()), 2000);
    })
}

export default request;